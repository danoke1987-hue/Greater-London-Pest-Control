/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import fs from 'fs';
import path from 'path';

// Load lists from the local datasets
import { 
  postcodesList, 
  locationsList, 
  boroughsList, 
  calculatePostcodeQualityScore, 
  getPostcodePublishingDetails 
} from '../src/data/locations';
import { pestsList } from '../src/data/pests';
import { servicesList } from '../src/data/services';
import { adviceArticles, caseStudiesList } from '../src/data/editorial';

interface AuditIssue {
  type: 'ERROR' | 'WARNING' | 'INFO';
  category: string;
  item: string;
  message: string;
}

/**
 * Recursively find all files with specific extensions in a directory
 */
function getFilesRecursively(dir: string, extensions: string[], fileList: string[] = []): string[] {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const name = path.join(dir, file);
    if (fs.statSync(name).isDirectory()) {
      if (
        !name.includes('node_modules') && 
        !name.includes('.git') && 
        !name.includes('dist') && 
        !name.includes('audit-logs') &&
        !name.includes('coverage')
      ) {
        getFilesRecursively(name, extensions, fileList);
      }
    } else {
      if (extensions.some(ext => name.endsWith(ext))) {
        fileList.push(name);
      }
    }
  }
  return fileList;
}

async function runSeoAudit() {
  console.log("=================================================");
  console.log("   GREATER LONDON PEST CONTROL DEEP SEO AUDIT   ");
  console.log("=================================================");
  
  const issues: AuditIssue[] = [];

  // --- 1. GATHER ALL ACTIVE/INDEXABLE URLS ---
  const activeServiceUrls = servicesList.filter(s => s.status === 'active' && s.indexability).map(s => `/services/${s.slug}`);
  const activePestUrls = pestsList.filter(p => p.status === 'active' && p.indexability).map(p => `/pests/${p.slug}`);
  const activeBoroughUrls = boroughsList.filter(b => b.isServed).map(b => `/areas/${b.slug}`);
  const activeAreaUrls = locationsList.filter(l => l.isServed && l.editorialQuality.indexable && l.editorialQuality.publicationStatus === "published").map(l => `/areas/${l.boroughSlug}/${l.slug}`);
  
  const activePostcodeUrls = postcodesList.filter(p => {
    const details = getPostcodePublishingDetails(p);
    return details.isIndexable && details.status === 'published';
  }).map(p => `/postcodes/${p.outwardCode.toLowerCase()}`);

  const activePostcodePrefixes = Array.from(new Set(postcodesList.map(p => `/postcodes/${p.postcodePrefix.toLowerCase()}`)));
  
  const activeAdviceUrls = adviceArticles.filter(a => a.status === 'active' && a.indexability).map(a => `/advice/${a.slug}`);
  const activeCaseStudyUrls = caseStudiesList.map(cs => `/case-studies/${cs.slug}`);

  const allActiveUrls = [
    '/', '/about', '/contact', '/areas', '/request-a-quote',
    ...activeServiceUrls,
    ...activePestUrls,
    ...activeBoroughUrls,
    ...activeAreaUrls,
    ...activePostcodeUrls,
    ...activePostcodePrefixes,
    ...activeAdviceUrls,
    ...activeCaseStudyUrls
  ];

  console.log(`Analyzing ${allActiveUrls.length} indexable URLs for linking, quality, and duplication...`);

  // --- 2. CODEBASE RECURSIVE SCAN (IMAGE ALTS & STATS) ---
  console.log("\nScanning codebase for image alt tags & references...");
  const srcDir = path.join(import.meta.dirname, '..', 'src');
  const codeFiles = getFilesRecursively(srcDir, ['.tsx', '.ts', '.html', '.css']);
  
  let totalImagesChecked = 0;
  let missingAltsCount = 0;
  let emptyAltsCount = 0;
  let lazyLoadedImages = 0;

  // Read all files for orphan references check
  let combinedCodeContext = "";
  const fileContentsMap = new Map<string, string>();

  codeFiles.forEach(filePath => {
    const content = fs.readFileSync(filePath, 'utf-8');
    const relativePath = path.relative(srcDir, filePath);
    
    // Skip reading data directory for internal code-linking audit to avoid self-referential matches
    if (!filePath.includes(path.join('src', 'data'))) {
      combinedCodeContext += "\n" + content;
    }
    fileContentsMap.set(relativePath, content);

    // Scan for HTML image tags
    const imgRegex = /<img\s+([^>]*)\/?>/gi;
    let match;
    while ((match = imgRegex.exec(content)) !== null) {
      totalImagesChecked++;
      const tagAttributes = match[1];
      
      // Check for alt attribute
      const altMatch = /alt=["']([^"']*)["']/i.exec(tagAttributes) || /alt=\{["']?([^"']*)["']?\}/i.exec(tagAttributes);
      
      if (!altMatch) {
        missingAltsCount++;
        issues.push({
          type: 'ERROR',
          category: 'Missing Alt Text',
          item: `File: ${relativePath}`,
          message: `The <img> tag is completely missing an 'alt' attribute: ${match[0]}`
        });
      } else {
        const altValue = altMatch[1].trim();
        if (altValue === "") {
          emptyAltsCount++;
          issues.push({
            type: 'WARNING',
            category: 'Empty Alt Text',
            item: `File: ${relativePath}`,
            message: `The <img> tag has an empty 'alt' attribute. While valid for decorative elements, consider specifying it for SEO: ${match[0]}`
          });
        } else if (['image', 'logo', 'photo', 'pest', 'pic'].includes(altValue.toLowerCase())) {
          issues.push({
            type: 'WARNING',
            category: 'Poor Alt Text',
            item: `File: ${relativePath}`,
            message: `Avoid generic/poor placeholder alt text "${altValue}": ${match[0]}`
          });
        }
      }

      // Track if using lazy loading
      if (/loading=["']lazy["']/i.test(tagAttributes)) {
        lazyLoadedImages++;
      }
    }
  });

  console.log(`- Checked ${totalImagesChecked} image tags.`);
  console.log(`- Detected ${missingAltsCount} missing alt attributes (ERRORs).`);
  console.log(`- Detected ${emptyAltsCount} empty alt attributes (WARNINGs).`);

  // --- 3. DATASET-LEVEL IMAGE & ALT AUDIT ---
  console.log("\nAuditing dataset image assets...");
  caseStudiesList.forEach(cs => {
    if (cs.imageUrl) {
      if (!cs.imageAlt || cs.imageAlt.trim() === "") {
        issues.push({
          type: 'ERROR',
          category: 'Missing Dataset Alt',
          item: `Case Study: ${cs.slug}`,
          message: `An image is specified (${cs.imageUrl}) but 'imageAlt' is missing or empty.`
        });
      } else if (cs.imageAlt.length < 10) {
        issues.push({
          type: 'WARNING',
          category: 'Thin Dataset Alt',
          item: `Case Study: ${cs.slug}`,
          message: `The imageAlt "${cs.imageAlt}" is too short (< 10 chars) to provide rich SEO value.`
        });
      }
    }
  });

  // --- 4. ORPHAN PAGES AUDIT (LITERAL & LOGICAL LINKING) ---
  console.log("\nAuditing orphan pages...");
  
  // Logical orphan check: Postcodes -> Areas -> Boroughs served chain
  postcodesList.forEach(p => {
    const details = getPostcodePublishingDetails(p);
    if (details.isIndexable && details.status === 'published') {
      // 1. Verify parent borough is served
      const parentBorough = boroughsList.find(b => b.slug === p.relevantBorough);
      if (!parentBorough) {
        issues.push({
          type: 'ERROR',
          category: 'Logical Orphan',
          item: `Postcode ${p.outwardCode}`,
          message: `The referenced relevantBorough slug "${p.relevantBorough}" does not exist in boroughsList.`
        });
      } else if (!parentBorough.isServed) {
        issues.push({
          type: 'ERROR',
          category: 'Logical Orphan',
          item: `Postcode ${p.outwardCode}`,
          message: `Postcode is published & indexable, but its parent borough "${parentBorough.name}" is marked as NOT served.`
        });
      }

      // 2. Verify there is at least one served Area (Location) covering this postcode
      const associatedServedLocations = locationsList.filter(l => 
        l.isServed && 
        l.boroughSlug === p.relevantBorough && 
        l.postcodeDistricts.map(code => code.toUpperCase()).includes(p.outwardCode.toUpperCase())
      );

      if (associatedServedLocations.length === 0) {
        issues.push({
          type: 'WARNING',
          category: 'Logical Orphan',
          item: `Postcode ${p.outwardCode}`,
          message: `No actively served Area locations (locationsList) list postcode ${p.outwardCode} in their postcodeDistricts.`
        });
      }
    }
  });

  // Codebase-level orphan check: verifying if we can find references/links in the UI
  allActiveUrls.forEach(url => {
    if (url === '/') return; // Home is always linked
    
    const slug = url.split('/').pop() || "";
    if (!slug) return;

    // Check if the URL string or the slug is referenced anywhere in the non-data codebase
    const hasLiteralUrlMatch = combinedCodeContext.includes(url) || combinedCodeContext.includes(`"${url}"`) || combinedCodeContext.includes(`'${url}'`);
    const hasSlugMatch = combinedCodeContext.includes(slug) || combinedCodeContext.includes(`"${slug}"`) || combinedCodeContext.includes(`'${slug}'`);
    
    // We also support dynamic link rendering if the dataset maps are referenced in the JSX/TSX
    let hasMappingMatch = false;
    if (url.startsWith('/services/') && combinedCodeContext.includes('servicesList')) hasMappingMatch = true;
    if (url.startsWith('/pests/') && combinedCodeContext.includes('pestsList')) hasMappingMatch = true;
    if (url.startsWith('/boroughs/') && combinedCodeContext.includes('boroughsList')) hasMappingMatch = true;
    if (url.startsWith('/areas/') && combinedCodeContext.includes('locationsList')) hasMappingMatch = true;
    if (url.startsWith('/postcodes/') && (combinedCodeContext.includes('postcodesList') || combinedCodeContext.includes('PostcodeChecker'))) hasMappingMatch = true;
    if (url.startsWith('/advice/') && combinedCodeContext.includes('adviceArticles')) hasMappingMatch = true;
    if (url.startsWith('/case-studies/') && combinedCodeContext.includes('caseStudiesList')) hasMappingMatch = true;

    if (!hasLiteralUrlMatch && !hasSlugMatch && !hasMappingMatch) {
      issues.push({
        type: 'ERROR',
        category: 'Orphan Page',
        item: `URL: ${url}`,
        message: `This active indexable page has no incoming links or dataset reference mapping in the application views.`
      });
    }
  });

  // --- 5. POSTCODE QUALITY THRESHOLDS & GATES ---
  console.log("\nAuditing postcode quality safety gates...");
  postcodesList.forEach(p => {
    const details = getPostcodePublishingDetails(p);
    const score = calculatePostcodeQualityScore(p);

    // Indexation Leak: Score < 85 but marked indexable
    if (p.indexable && score < 85) {
      issues.push({
        type: 'ERROR',
        category: 'Indexation Leak',
        item: `Postcode ${p.outwardCode}`,
        message: `Postcode is marked indexable but has a Quality Score of ${score} (below the required 85 threshold). Gate Status: ${details.status}`
      });
    }

    // Served but Draft / Noindex warning
    if (p.isActivelyServed && !details.isIndexable) {
      issues.push({
        type: 'WARNING',
        category: 'Indexation Status',
        item: `Postcode ${p.outwardCode}`,
        message: `Actively served postcode is excluded from search indexing. Quality Score: ${score}. Reason: ${details.warnings.join(', ')}`
      });
    }

    // Metadata Verification & Guidelines
    if (p.indexable && score >= 85) {
      if (!p.metaTitle || p.metaTitle.length < 20) {
        issues.push({
          type: 'ERROR',
          category: 'Metadata',
          item: `Postcode ${p.outwardCode}`,
          message: `Missing or too short Meta Title (${p.metaTitle?.length || 0} chars) for indexable page. Minimum 20.`
        });
      }
      if (!p.metaDescription || p.metaDescription.length < 50) {
        issues.push({
          type: 'ERROR',
          category: 'Metadata',
          item: `Postcode ${p.outwardCode}`,
          message: `Missing or too short Meta Description (${p.metaDescription?.length || 0} chars) for indexable page. Minimum 50.`
        });
      }
      if (!p.canonicalUrl || !p.canonicalUrl.toLowerCase().includes(p.outwardCode.toLowerCase())) {
        issues.push({
          type: 'ERROR',
          category: 'Canonical',
          item: `Postcode ${p.outwardCode}`,
          message: `Missing or incorrect self-referencing canonical tag: '${p.canonicalUrl}'`
        });
      }
    }

    // Thin Content Check
    if (p.isActivelyServed && p.publicationStatus === 'published') {
      const introWords = p.localCoverageNotes?.split(/\s+/).length || 0;
      const resWords = p.residentialPropertyContext?.split(/\s+/).length || 0;
      const commWords = p.commercialPropertyContext?.split(/\s+/).length || 0;
      const pestWords = p.localPestContext?.split(/\s+/).length || 0;
      const totalWords = introWords + resWords + commWords + pestWords;

      if (totalWords < 200) {
        issues.push({
          type: 'WARNING',
          category: 'Thin Content',
          item: `Postcode ${p.outwardCode}`,
          message: `Total words on page is ${totalWords}, which constitutes thin content (< 200 words).`
        });
      }
    }
  });

  // --- 6. DUPLICATE METADATA & KW CANNIBALIZATION CHECKS ---
  console.log("\nAuditing metadata duplication & cannibalization...");
  
  // Maps to check duplication
  const metaTitlesMap = new Map<string, string[]>();
  const metaDescMap = new Map<string, string[]>();
  const introsMap = new Map<string, string[]>();

  // Add all postcode SEO properties
  postcodesList.forEach(p => {
    if (p.metaTitle) {
      const title = p.metaTitle.trim().toLowerCase();
      if (!metaTitlesMap.has(title)) metaTitlesMap.set(title, []);
      metaTitlesMap.get(title)!.push(`Postcode ${p.outwardCode}`);
    }
    if (p.metaDescription) {
      const desc = p.metaDescription.trim().toLowerCase();
      if (!metaDescMap.has(desc)) metaDescMap.set(desc, []);
      metaDescMap.get(desc)!.push(`Postcode ${p.outwardCode}`);
    }
    if (p.localCoverageNotes) {
      const snippet = p.localCoverageNotes.slice(0, 100).trim().toLowerCase();
      if (!introsMap.has(snippet)) introsMap.set(snippet, []);
      introsMap.get(snippet)!.push(`Postcode ${p.outwardCode}`);
    }
  });

  // Add services SEO properties
  servicesList.forEach(s => {
    if (s.seoTitle) {
      const title = s.seoTitle.trim().toLowerCase();
      if (!metaTitlesMap.has(title)) metaTitlesMap.set(title, []);
      metaTitlesMap.get(title)!.push(`Service ${s.slug}`);
    }
    if (s.metaDescription) {
      const desc = s.metaDescription.trim().toLowerCase();
      if (!metaDescMap.has(desc)) metaDescMap.set(desc, []);
      metaDescMap.get(desc)!.push(`Service ${s.slug}`);
    }
  });

  // Add pests SEO properties
  pestsList.forEach(p => {
    if (p.seoTitle) {
      const title = p.seoTitle.trim().toLowerCase();
      if (!metaTitlesMap.has(title)) metaTitlesMap.set(title, []);
      metaTitlesMap.get(title)!.push(`Pest ${p.slug}`);
    }
    if (p.metaDescription) {
      const desc = p.metaDescription.trim().toLowerCase();
      if (!metaDescMap.has(desc)) metaDescMap.set(desc, []);
      metaDescMap.get(desc)!.push(`Pest ${p.slug}`);
    }
  });

  // Add advice articles SEO properties
  adviceArticles.forEach(a => {
    if (a.seoTitle) {
      const title = a.seoTitle.trim().toLowerCase();
      if (!metaTitlesMap.has(title)) metaTitlesMap.set(title, []);
      metaTitlesMap.get(title)!.push(`Advice ${a.slug}`);
    }
    if (a.metaDescription) {
      const desc = a.metaDescription.trim().toLowerCase();
      if (!metaDescMap.has(desc)) metaDescMap.set(desc, []);
      metaDescMap.get(desc)!.push(`Advice ${a.slug}`);
    }
  });

  // Analyze duplicates
  metaTitlesMap.forEach((occurrences, title) => {
    if (occurrences.length > 1) {
      const isCrossCannibalization = occurrences.some(o => !o.startsWith('Postcode')) && occurrences.some(o => o.startsWith('Postcode'));
      issues.push({
        type: isCrossCannibalization ? 'ERROR' : 'WARNING',
        category: 'Duplicate Title',
        item: `Title: "${title.slice(0, 50)}..."`,
        message: `Identical meta title shared across multiple pages: [${occurrences.join(', ')}]. ${isCrossCannibalization ? 'CRITICAL: keyword cannibalization between postcodes and core service files!' : ''}`
      });
    }
  });

  metaDescMap.forEach((occurrences, desc) => {
    if (occurrences.length > 1) {
      issues.push({
        type: 'WARNING',
        category: 'Duplicate Description',
        item: `Desc: "${desc.slice(0, 50)}..."`,
        message: `Identical meta description shared across multiple pages: [${occurrences.join(', ')}]`
      });
    }
  });

  introsMap.forEach((occurrences, snippet) => {
    if (occurrences.length > 1) {
      issues.push({
        type: 'ERROR',
        category: 'Duplicate Content Snippet',
        item: `Snippet: "${snippet.slice(0, 50)}..."`,
        message: `Identical introductory content shared across multiple postcodes: [${occurrences.join(', ')}]`
      });
    }
  });

  // --- 7. CHECK CRITICAL SECTOR & INFRASTRUCTURE LINKS ---
  console.log("Checking general link references...");
  locationsList.forEach(l => {
    if (l.isServed) {
      const boroughSlug = l.boroughSlug;
      const match = boroughsList.find(b => b.slug === boroughSlug);
      if (!match) {
        issues.push({
          type: 'ERROR',
          category: 'Broken Link Reference',
          item: `Location ${l.slug}`,
          message: `Referenced borough slug '${boroughSlug}' does not exist.`
        });
      } else if (!match.isServed) {
        issues.push({
          type: 'WARNING',
          category: 'Link Integrity',
          item: `Location ${l.slug}`,
          message: `Refers to borough '${match.name}' which is marked NOT served.`
        });
      }
    }
  });

  // --- 8. SUMMARIZE AUDIT RESULTS & COMPLIANCE ---
  console.log("\n=================================================");
  console.log("             DEEP AUDIT RESULTS SUMMARY          ");
  console.log("=================================================");
  const errors = issues.filter(i => i.type === 'ERROR');
  const warnings = issues.filter(i => i.type === 'WARNING');
  const infos = issues.filter(i => i.type === 'INFO');

  console.log(`ERRORS found:   ${errors.length}`);
  console.log(`WARNINGS found: ${warnings.length}`);
  console.log(`INFO items:     ${infos.length}`);
  console.log("=================================================");

  if (errors.length > 0) {
    console.log("\n❌ CRITICAL ERRORS DETECTED:");
    errors.forEach((err, idx) => {
      console.log(`${idx + 1}. [${err.category}] in ${err.item}: ${err.message}`);
    });
  } else {
    console.log("\n✅ NO CRITICAL ERRORS DETECTED. All Quality Gates fully respected!");
  }

  if (warnings.length > 0) {
    console.log("\n⚠️ WARNINGS DETECTED:");
    warnings.forEach((warn, idx) => {
      console.log(`${idx + 1}. [${warn.category}] in ${warn.item}: ${warn.message}`);
    });
  }

  // --- 9. PERSIST TO DISK ---
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const logDir = path.join(import.meta.dirname, '..', 'src', 'data', 'audit-logs');
  
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  const logFile = path.join(logDir, `seo-audit-${timestamp}.json`);
  const logData = {
    timestamp: new Date().toISOString(),
    summary: {
      totalIssues: issues.length,
      errors: errors.length,
      warnings: warnings.length,
      infos: infos.length,
      activeUrlsCount: allActiveUrls.length,
      totalImagesChecked,
      missingAltsCount,
      emptyAltsCount,
      lazyLoadedImages
    },
    activeUrls: allActiveUrls,
    issues: issues
  };

  fs.writeFileSync(logFile, JSON.stringify(logData, null, 2));
  console.log(`\nAudit log saved to: ${logFile}`);

  // Create or update latest log symlink/file
  const latestFile = path.join(logDir, `seo-audit-latest.json`);
  fs.writeFileSync(latestFile, JSON.stringify(logData, null, 2));
  console.log(`Latest audit updated at: ${latestFile}`);
  console.log("=================================================\n");

  // Prevent production build if there are critical errors
  if (errors.length > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runSeoAudit().catch(err => {
  console.error("Critical failure during SEO auditing process:", err);
  process.exit(1);
});

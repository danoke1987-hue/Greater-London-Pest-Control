import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

// Import datasets from the application for dynamic sitemap generation
import { 
  postcodesList, 
  locationsList, 
  boroughsList, 
  activePostcodes, 
  activeLocations, 
  activeBoroughs,
  calculatePostcodeQualityScore,
  getPostcodePublishingDetails
} from "./src/data/locations";
import { pestsList } from "./src/data/pests";
import { servicesList } from "./src/data/services";
import { adviceArticles, caseStudiesList } from "./src/data/editorial";

dotenv.config();

const DOMAIN = "greaterlondonpestcontrol.co.uk";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // 1. Dynamic 301 Redirect Engine
  const redirects = [
    { source: "/index.php", destination: "/", statusCode: 301 },
    { source: "/about-us", destination: "/about", statusCode: 301 },
    { source: "/contact-us", destination: "/contact", statusCode: 301 },
    { source: "/services", destination: "/areas", statusCode: 301 },
    { source: "/postcode-list", destination: "/areas", statusCode: 301 },
  ];

  app.use((req, res, next) => {
    const pathLower = req.path.toLowerCase();
    
    // Dynamic legacy redirects to clean /areas/ structures
    if (pathLower.startsWith('/boroughs/')) {
      const slug = req.path.substring('/boroughs/'.length);
      return res.redirect(301, `/areas/${slug}`);
    }
    if (pathLower.startsWith('/locations/')) {
      const slug = req.path.substring('/locations/'.length).toLowerCase();
      const loc = locationsList.find(l => l.slug.toLowerCase() === slug);
      if (loc) {
        return res.redirect(301, `/areas/${loc.boroughSlug}/${loc.slug}`);
      } else {
        return res.redirect(301, `/areas`);
      }
    }

    const match = redirects.find(r => r.source.toLowerCase() === req.path.toLowerCase());
    if (match) {
      console.log(`[301 Redirect] ${req.path} -> ${match.destination}`);
      return res.redirect(match.statusCode, match.destination);
    }
    next();
  });

  // 2. Dynamic Robots.txt Endpoint
  app.get("/robots.txt", (req, res) => {
    res.type("text/plain");
    res.send(`User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /private/

Sitemap: https://${DOMAIN}/sitemap-index.xml
`);
  });

  // Helper to wrap sitemap urls in standard xml
  function buildSitemapXml(urls: string[]): string {
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join("\n")}
</urlset>`;
  }

  // 3. Dynamic Sitemap Index Endpoint
  app.get("/sitemap-index.xml", (req, res) => {
    res.type("application/xml");
    res.send(`<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>https://${DOMAIN}/sitemap-core.xml</loc></sitemap>
  <sitemap><loc>https://${DOMAIN}/sitemap-services.xml</loc></sitemap>
  <sitemap><loc>https://${DOMAIN}/sitemap-pests.xml</loc></sitemap>
  <sitemap><loc>https://${DOMAIN}/sitemap-boroughs.xml</loc></sitemap>
  <sitemap><loc>https://${DOMAIN}/sitemap-areas.xml</loc></sitemap>
  <sitemap><loc>https://${DOMAIN}/sitemap-postcodes.xml</loc></sitemap>
  <sitemap><loc>https://${DOMAIN}/sitemap-advice.xml</loc></sitemap>
  <sitemap><loc>https://${DOMAIN}/sitemap-case-studies.xml</loc></sitemap>
</sitemapindex>`);
  });

  // 4. Individual Sitemap Subcategories
  app.get("/sitemap-core.xml", (req, res) => {
    const urls = [
      `https://${DOMAIN}/`,
      `https://${DOMAIN}/about`,
      `https://${DOMAIN}/contact`,
      `https://${DOMAIN}/areas`,
      `https://${DOMAIN}/request-a-quote`
    ];
    res.type("application/xml").send(buildSitemapXml(urls));
  });

  app.get("/sitemap-services.xml", (req, res) => {
    const urls = servicesList
      .filter(s => s.status === 'active' && s.indexability)
      .map(s => `https://${DOMAIN}/services/${s.slug}`);
    res.type("application/xml").send(buildSitemapXml(urls));
  });

  app.get("/sitemap-pests.xml", (req, res) => {
    const urls = pestsList
      .filter(p => p.status === 'active' && p.indexability)
      .map(p => `https://${DOMAIN}/pests/${p.slug}`);
    res.type("application/xml").send(buildSitemapXml(urls));
  });

  app.get("/sitemap-boroughs.xml", (req, res) => {
    const urls = boroughsList
      .filter(b => b.isServed)
      .map(b => `https://${DOMAIN}/areas/${b.slug}`);
    res.type("application/xml").send(buildSitemapXml(urls));
  });

  app.get("/sitemap-areas.xml", (req, res) => {
    const urls = locationsList
      .filter(l => l.isServed && l.editorialQuality.indexable && l.editorialQuality.publicationStatus === "published")
      .map(l => `https://${DOMAIN}/areas/${l.boroughSlug}/${l.slug}`);
    res.type("application/xml").send(buildSitemapXml(urls));
  });

  app.get("/sitemap-postcodes.xml", (req, res) => {
    // Quality Gate: Only include postcodes with active service, verified completed, and score >= 85
    const urls = postcodesList
      .filter(p => {
        const details = getPostcodePublishingDetails(p);
        return details.isIndexable && details.status === 'published';
      })
      .map(p => `https://${DOMAIN}/postcodes/${p.outwardCode.toLowerCase()}`);

    const prefixes = Array.from(new Set(postcodesList.map(p => p.postcodePrefix.toLowerCase())));
    const prefixUrls = prefixes.map(prefix => `https://${DOMAIN}/postcodes/${prefix}`);

    res.type("application/xml").send(buildSitemapXml([...prefixUrls, ...urls]));
  });

  app.get("/sitemap-advice.xml", (req, res) => {
    const urls = adviceArticles
      .filter(a => a.status === 'active' && a.indexability)
      .map(a => `https://${DOMAIN}/advice/${a.slug}`);
    res.type("application/xml").send(buildSitemapXml(urls));
  });

  app.get("/sitemap-case-studies.xml", (req, res) => {
    const urls = caseStudiesList
      .map(cs => `https://${DOMAIN}/case-studies/${cs.slug}`);
    res.type("application/xml").send(buildSitemapXml(urls));
  });

  // 5. Admin API endpoint for Live Quality Scoring reports and Diagnostic telemetry
  app.get("/api/seo-stats", (req, res) => {
    try {
      const stats = postcodesList.map(p => {
        const details = getPostcodePublishingDetails(p);
        const score = calculatePostcodeQualityScore(p);
        return {
          outwardCode: p.outwardCode,
          postcodeArea: p.postcodeArea,
          borough: p.relevantBorough,
          served: p.isActivelyServed,
          verified: p.verified,
          rawScore: score,
          gateStatus: details.status,
          isIndexable: details.isIndexable,
          warnings: details.warnings
        };
      });

      const total = stats.length;
      const indexableCount = stats.filter(s => s.isIndexable).length;
      const draftCount = stats.filter(s => s.gateStatus === 'draft' || s.gateStatus === 'awaiting-data').length;
      const noindexCount = stats.filter(s => s.gateStatus === 'published' && !s.isIndexable).length;
      const avgScore = Math.round(stats.reduce((acc, curr) => acc + curr.rawScore, 0) / total);

      return res.json({
        summary: {
          totalPostcodes: total,
          indexablePostcodes: indexableCount,
          noindexPostcodes: noindexCount,
          draftPostcodes: draftCount,
          averageQualityScore: avgScore,
        },
        records: stats
      });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  });

  // 6. API route for structural pest control ChatBot Q&A
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Invalid messages format. Expecting an array." });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({
          error: "GEMINI_API_KEY is not configured on the server. Please add your Gemini API key in the Settings > Secrets panel."
        });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const systemInstruction = `
You are the official certified AI Assistant of Greater London Pest Control (GLPC), a premium, BPCA-accredited structural pest eradication and physical exclusion service operating across all boroughs of Greater London inside the M25.

YOUR IDENTITY:
- You are an expert field biologist AI assistant representing GLPC.
- You provide highly professional, reassuring, scientifically accurate, and HSE-compliant structural pest control advice.
- Encourage users to book a free site survey or fill out the callback Quote Form on our website to permanently resolve their issue.

OUR COMPANION SELLING POINTS:
- BPCA (British Pest Control Association) accredited.
- RSPH Level 2 qualified technicians (Royal Society for Public Health).
- Up to 20-year structural proofing and exclusion warranties (we seal entry routes rather than just laying baits).
- Discrete services: unbranded, unmarked vans used for residential visits to preserve absolute neighbor privacy.
- 100% eradication success rate or your money back.
- 2-hour rapid emergency response within London for EHO (Environmental Health Officer) situations or severe commercial infestations.

PEST SPECIFICS (KNOWLEDGE BASE):
- Rats & Mice: Highly destructive, gnaw structural wires (fire risk), spread Weil's disease/Leptospirosis. We perform dynamic tracing, seal pipe/sewer entry paths with heavy-gauge steel plating, and execute multi-phase trapping.
- Bed Bugs: Heat treatments or targeted chemical sprays. Full room preparation guidance provided.
- Cockroaches: Spread salmonella/gastroenteritis. We use professional gel baits and sanitation audits.
- Wasps & Hornets: Same-day nest eradication.
- Pigeons & Gulls: Netting, tensioned wire systems, spikes, and visual fire-gels.
- Honey Bees (Apis mellifera): CRITICAL ENVIRONMENTAL POLICY. Honey bees are vital pollinators. GLPC does NOT destroy or exterminate honey bee nests. If a client has a honey bee swarm or active hive, advise them to contact the British Beekeepers Association (BBKA) or local registered swarm collectors for safe live swarm extraction and relocation.

PRICING & SITE VISITS:
- Standard pest treatments have clear, fixed residential rates (ranging based on property size/bedrooms).
- Real, exact treatment quotes require our standard Free Diagnostic Survey.
- Provide a compassionate, professional response, and direct them to fill out the Quote Form for a call back within 15 minutes.

TONE & CONSTRAINTS:
- Scientific, empathetic, reassuring, professional.
- Use clean formatting, bullet points, and concise text.
- Never mention internal database models, system files, or technical code.
- Always speak to customers as a direct human-friendly representative of GLPC.
`;

      const contents = messages.map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents,
        config: {
          systemInstruction,
          temperature: 0.6,
        },
      });

      const responseText = response.text || "I apologize, I didn't receive a valid reply. Please contact our support team.";
      return res.json({ text: responseText });

    } catch (err: any) {
      console.error("Error in /api/chat endpoint:", err);
      return res.status(500).json({ error: err.message || "An unexpected error occurred during chat generation." });
    }
  });

  // Serve Vite client app
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server successfully started on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});

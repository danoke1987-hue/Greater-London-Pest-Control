/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { updatePageMetadata, Link } from '../lib/router';
import { siteSettings } from '../data/business';
import { industriesList } from '../data/editorial';
import QuoteForm from '../components/QuoteForm';
import { Shield, CheckCircle2, ClipboardCheck, AlertCircle, HelpCircle } from 'lucide-react';

interface IndustryViewProps {
  industrySlug: string;
}

export default function IndustryView({ industrySlug }: IndustryViewProps) {
  
  // Find industry data in local list or dynamically construct it for complete coverage
  const getIndustryData = () => {
    const found = industriesList.find(i => i.slug === industrySlug);
    if (found) return found;

    // Dynamic fallback guides for other sectors like schools, healthcare, construction
    switch (industrySlug) {
      case 'schools':
      case 'school':
        return {
          slug: 'school',
          name: 'Schools & Education',
          title: 'Commercial Pest Control for London Schools & Nurseries',
          summary: 'COSHH compliant, low-impact preventative pest monitoring and rapid wasp swarm clearance to protect child safety in educational zones.',
          inspectionProcess: [
            'Inspecting playground boundaries, rubbish bins, and boiler rooms',
            'Full structural audit of kitchen preparation lanes'
          ],
          monitoringPrograms: [
            'Placing secure child-proof non-toxic monitoring stations inside perimeter fencing'
          ],
          documentationAndAudits: 'We supply complete risk assessments and COSHH compliance logs required for municipal school health audits.',
          pestPreventionPrograms: ['Quarterly inspections under child-safe guidelines.'],
          proofingDetails: 'Sealing plumbing entries under sinks and installing fly screens on cafeteria windows.',
          hygieneRecommendations: [
            'Maintain strict outdoor bin schedules and secure lid enclosures.',
            'Thoroughly clean lunch benches and cafeteria areas daily.'
          ],
          contractCTA: 'Enquire about school contract services.',
          relevantPests: ['wasps', 'mice', 'ants', 'hornets'],
          relevantServices: ['wasp-control', 'commercial-contracts']
        };
      case 'healthcare':
        return {
          slug: 'healthcare',
          name: 'Healthcare & Care Homes',
          title: 'Healthcare Pest Control London | Infection Control',
          summary: 'Strictly compliant infection-risk pest control, using odourless non-spray treatments across hospital wings and care home residences.',
          inspectionProcess: [
            'Inspecting laundry corridors and patient kitchen lines',
            'Sewer connection checks using endoscopic cameras'
          ],
          monitoringPrograms: [
            'Non-toxic digital multi-catch rodent tracking arrays'
          ],
          documentationAndAudits: 'Compliance directories aligning with Care Quality Commission (CQC) infection control standards.',
          pestPreventionPrograms: ['Routine preventative sweep plans.'],
          proofingDetails: 'Sealing pipework pathways with fire-rated steel mortar wool.',
          hygieneRecommendations: [
            'Maintain laundry rooms free of loose damp linen piles.',
            'Execute double-bagged clinical waste guidelines.'
          ],
          contractCTA: 'Enquire about NHS and CQC compliant healthcare contract options.',
          relevantPests: ['mice', 'bed-bugs', 'cockroaches', 'silverfish'],
          relevantServices: ['bed-bug-treatment', 'commercial-contracts']
        };
      case 'construction-site':
      case 'construction':
        return {
          slug: 'construction',
          name: 'Construction & Development',
          title: 'Pest Control for London Construction & Demolition Sites',
          summary: 'Pre-demolition rodent clearing certifications, site fencing monitoring, and sewer baiting compliance packages inside the M25.',
          inspectionProcess: [
            'Inspecting site boundaries, excavation piles, and welfare cabins',
            'Checking municipal drainage lines before demolition works begin'
          ],
          monitoringPrograms: [
            'Heavy-duty secure external bait cages placed along perimeter hoarding lines'
          ],
          documentationAndAudits: 'Official BREEAM-accredited rodent-free certificates required for planning sign-offs.',
          pestPreventionPrograms: ['Site-wide preventative rodent control schemes.'],
          proofingDetails: 'Structural wire mesh around temporary welfare cabins and sink outlets.',
          hygieneRecommendations: [
            'Ensure builder lunch wastes are disposed of in heavy metal lockable bins.',
            'Keep building excavations clear of pooled standing water.'
          ],
          contractCTA: 'Request immediate pre-demolition site clearing survey.',
          relevantPests: ['rats', 'mice', 'foxes'],
          relevantServices: ['rat-control', 'commercial-contracts']
        };
      default:
        // Generic fallback for any other requested industries (e.g. retail, offices)
        return {
          slug: 'commercial',
          name: 'Commercial Operations',
          title: 'Commercial Pest Management Solutions London',
          summary: 'Biologist-supervised preventative pest control and audit protection contracts tailored for local London businesses.',
          inspectionProcess: ['Site boundaries and structural entry checks'],
          monitoringPrograms: ['Placing discrete monitor lines inside voids'],
          documentationAndAudits: 'Full COSHH safety logs and risk assessments.',
          pestPreventionPrograms: ['Scheduled preventative monitoring contracts.'],
          proofingDetails: 'Steel mesh exclusion of common utility pathways.',
          hygieneRecommendations: ['Clean prep surfaces daily', 'Keep bin stores secure'],
          contractCTA: 'Schedule a free business survey and quote.',
          relevantPests: ['mice', 'rats', 'cockroaches'],
          relevantServices: ['commercial-contracts']
        };
    }
  };

  const data = getIndustryData();

  useEffect(() => {
    updatePageMetadata(
      `${data.title} | Certified BPCA`,
      `${data.summary} Same-day emergency response with written logs.`,
      `https://${siteSettings.domain}/${data.slug}-pest-control`
    );
  }, [industrySlug]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 text-left" id={`industry-page-${data.slug}`}>
      
      {/* 1. Header Navigation & Main Titles */}
      <div className="border-b border-gray-100 pb-8">
        <nav className="flex text-xs font-semibold text-gray-400 gap-1.5 mb-4">
          <Link href="/" className="hover:text-gray-600">Home</Link>
          <span>/</span>
          <Link href="/commercial-pest-control" className="hover:text-gray-600">Sectors</Link>
          <span>/</span>
          <span className="text-gray-600">{data.name}</span>
        </nav>
        
        <div className="flex flex-col gap-3 max-w-4xl">
          <div className="inline-flex max-w-max items-center gap-1.5 rounded bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
            <Shield className="h-3.5 w-3.5" />
            <span>Audit-Compliant Commercial Industry Scheme</span>
          </div>
          <h1 className="font-sans text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl md:text-5xl">
            {data.title}
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed mt-2">
            {data.summary}
          </p>
        </div>
      </div>

      {/* 2. Structured Sections Layout */}
      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12">
        
        {/* Left Column (8 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-10">
          
          {/* Audit Process */}
          <section className="flex flex-col gap-3">
            <h2 className="font-sans text-lg font-bold text-gray-950 uppercase tracking-wider border-b border-gray-50 pb-2">
              Our Specific Site Audit Process
            </h2>
            <ul className="list-inside list-decimal text-xs leading-relaxed text-gray-600 flex flex-col gap-3">
              {data.inspectionProcess.map((proc, idx) => (
                <li key={idx} className="text-gray-700">
                  <strong>Stage {idx + 1}:</strong> {proc}
                </li>
              ))}
            </ul>
          </section>

          {/* Monitoring and Exclusion Details */}
          <section className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="flex flex-col gap-3">
              <h3 className="font-sans text-sm font-bold text-gray-950 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600" />
                <span>Monitoring Networks</span>
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                {data.monitoringPrograms[0]}
              </p>
            </div>
            
            <div className="flex flex-col gap-3">
              <h3 className="font-sans text-sm font-bold text-gray-950 uppercase tracking-wider flex items-center gap-1.5">
                <ClipboardCheck className="h-4.5 w-4.5 text-emerald-600" />
                <span>Physical Exclusion Proofing</span>
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                {data.proofingDetails}
              </p>
            </div>
          </section>

          {/* EHO / Compliance Folder details */}
          <section className="rounded-xl border border-gray-100 bg-white p-6 flex flex-col gap-4 text-xs leading-relaxed text-gray-600">
            <h3 className="font-sans text-sm font-bold text-gray-950 uppercase tracking-wider">
              EHO Audit Compliance & Documentation Logs
            </h3>
            <p>{data.documentationAndAudits}</p>
          </section>

          {/* Housekeeping recommendations */}
          <section className="flex flex-col gap-4">
            <h2 className="font-sans text-lg font-bold text-gray-950 uppercase tracking-wider flex items-center gap-1.5">
              <AlertCircle className="h-5 w-5 text-emerald-600" />
              <span>Mandatory Housekeeping Recommendations</span>
            </h2>
            <div className="rounded-xl border border-amber-100 bg-amber-50/15 p-5 flex flex-col gap-3.5 text-xs text-amber-950">
              <p className="font-semibold text-amber-900">
                To satisfy food hygiene guidelines (Environmental Health Officer audits), site managers should implement these daily checklists:
              </p>
              <ul className="list-inside list-disc flex flex-col gap-2">
                {data.hygieneRecommendations.map((rec, idx) => (
                  <li key={idx}>{rec}</li>
                ))}
              </ul>
            </div>
          </section>

        </div>

        {/* Right Column: Quote Form (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <QuoteForm />
        </div>

      </div>
    </div>
  );
}

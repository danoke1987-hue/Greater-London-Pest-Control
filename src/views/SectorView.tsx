/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { updatePageMetadata, Link } from '../lib/router';
import { siteSettings, accreditations } from '../data/business';
import QuoteForm from '../components/QuoteForm';
import { Shield, Home, Building2, Landmark, CheckCircle2, Phone, Briefcase } from 'lucide-react';

interface SectorViewProps {
  sector: 'residential' | 'commercial' | 'landlord';
}

export default function SectorView({ sector }: SectorViewProps) {
  
  // Custom definitions based on sector
  const getSectorData = () => {
    switch (sector) {
      case 'residential':
        return {
          title: "Residential Pest Control London",
          seoTitle: "Residential Pest Control London | Extermination & Proofing",
          metaDesc: "Certified home pest control services across Greater London. Safe, pet-friendly treatments with unbranded vehicles and up to 20-year proofing guarantees.",
          canonical: `https://${siteSettings.domain}/residential-pest-control`,
          heading: "Safe, Guaranteed Residential Extermination & Proofing",
          intro: "We protect London families and homes from active infestations, applying professional structural exclusion to ensure pests cannot enter again.",
          features: [
            { title: "Unbranded Discreet Vehicles", desc: "Our technicians arrive in unbranded vehicles to protect your neighborhood privacy." },
            { title: "Pet & Family Safe Gels", desc: "We utilize advanced, targeted insecticidal gels and secure lockable stations out of reach of children and pets." },
            { title: "Up to 20-Year Warranties", desc: "All structural proofing works completed on brick margins, floor voids, and eaves are legally guaranteed." }
          ],
          procedures: [
            "Complete household safety sweep to map utility gaps and rooflines",
            "Targeted non-chemical trapping or superheated dry steam application",
            "Steel mesh and concrete-mortar sealing of all physical entry portals"
          ]
        };
      case 'commercial':
        return {
          title: "Commercial Pest Control London",
          seoTitle: "Commercial Pest Control London | BPCA Accredited Contracts",
          metaDesc: "Professional commercial pest control and audit-compliant prevention contracts in Greater London. Rapid 2-hour EHO emergency cover.",
          canonical: `https://${siteSettings.domain}/commercial-pest-control`,
          heading: "Audit-Compliant Commercial Pest Prevention Contracts",
          intro: "We safeguard London restaurants, cafes, hotels, warehouses, and corporate facilities, ensuring complete compliance with BRC, SALSA, and local council EHO food hygiene codes.",
          features: [
            { title: "GTM-Ready Logging & Folder", desc: "Every commercial contract receives a physical and digital Pest Log Folder containing RAMS, COSHH, and mapping sheets." },
            { title: "Rapid 2-Hour Call Out Response", desc: "Free, rapid emergency response to ensure active operational hazards are resolved before service hours." },
            { title: "Food Prep Area Biologists", desc: "Our teams hold advanced RSPH Level 2 qualifications, using non-toxic digital monitors in kitchen preparation lanes." }
          ],
          procedures: [
            "Confidential physical site audit mapping potential pest hazards",
            "Installation of low-profile permanent digital monitoring networks",
            "Comprehensive post-inspection reports delivered within 1 hour"
          ]
        };
      case 'landlord':
        return {
          title: "Pest Control for Landlords & Property Managers",
          seoTitle: "Pest Control for Landlords & London Property Managers",
          metaDesc: "Professional tenant dispute resolution and pest control for London landlords. Safe structural proofing and clear legal accountability reports.",
          canonical: `https://${siteSettings.domain}/landlord-pest-control`,
          heading: "Pest Control for Landlords & London Property Managers",
          intro: "We resolve pest problems in tenanted flats, terraced blocks, and portfolios. We deliver rapid tenant communication and written diagnostic reports to settle tenant/landlord disputes.",
          features: [
            { title: "Dispute Diagnostics Reports", desc: "Our certified surveyors supply written reports outlining if pests are due to structural defects or tenant housekeeping." },
            { title: "Rapid Tenant Coordination", desc: "We contact tenants directly to coordinate preparation, access, and appointments, saving you administrative burden." },
            { title: "Pre-Tenancy Proofing Warranties", desc: "12-month structural exclusion warrants for entire properties or block-wide preventative contracts." }
          ],
          procedures: [
            "Borough Council-ready reporting on structural ingress defects",
            "Isolation sealing of utility riser channels and plumbing vents shared between flats",
            "Comprehensive follow-up schedules to ensure total eradication"
          ]
        };
    }
  };

  const data = getSectorData();

  useEffect(() => {
    updatePageMetadata(data.seoTitle, data.metaDesc, data.canonical);
  }, [sector]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 text-left" id={`sector-page-${sector}`}>
      
      {/* 1. Header Navigation & Main Titles */}
      <div className="border-b border-gray-100 pb-8">
        <nav className="flex text-xs font-semibold text-gray-400 gap-1.5 mb-4">
          <Link href="/" className="hover:text-gray-600">Home</Link>
          <span>/</span>
          <span className="text-gray-600">{data.title}</span>
        </nav>
        
        <div className="flex flex-col gap-3 max-w-4xl">
          <div className="inline-flex max-w-max items-center gap-1.5 rounded bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
            {sector === 'residential' ? <Home className="h-3.5 w-3.5" /> : sector === 'commercial' ? <Building2 className="h-3.5 w-3.5" /> : <Briefcase className="h-3.5 w-3.5" />}
            <span>BPCA Accredited Sector Scheme</span>
          </div>
          <h1 className="font-sans text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl md:text-5xl">
            {data.heading}
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed mt-2">
            {data.intro}
          </p>
        </div>
      </div>

      {/* 2. Structured Content Layout */}
      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12">
        
        {/* Left Column: Extensive details (8 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-10">
          
          {/* Section: Sector Core Features */}
          <section className="flex flex-col gap-4" aria-labelledby="section-features-title">
            <h2 id="section-features-title" className="font-sans text-lg font-bold text-gray-950 uppercase tracking-wider">
              Our Specialized Sector Protocols
            </h2>
            <div className="grid grid-cols-1 gap-5">
              {data.features.map((feat, idx) => (
                <div key={idx} className="rounded-xl border border-gray-100 bg-white p-5 flex gap-4 items-start shadow-xs">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 shrink-0">
                    <Shield className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold text-gray-950">{feat.title}</span>
                    <p className="text-xs text-gray-600 leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Standard Procedures */}
          <section className="flex flex-col gap-4">
            <h2 className="font-sans text-lg font-bold text-gray-950 uppercase tracking-wider">
              Standard Service Execution Steps
            </h2>
            <div className="rounded-xl border border-gray-100 bg-white p-5 text-xs leading-relaxed text-gray-600 flex flex-col gap-3">
              <p>
                Every treatment follows a standardized, auditor-approved methodology:
              </p>
              <ul className="list-inside list-decimal mt-2 flex flex-col gap-2.5">
                {data.procedures.map((proc, idx) => (
                  <li key={idx} className="text-gray-700">
                    <strong>Step {idx + 1}:</strong> {proc}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Section: Legal obligations notice (Conditional for Landlords) */}
          {sector === 'landlord' && (
            <section className="rounded-xl border border-amber-100 bg-amber-50/20 p-5 flex flex-col gap-3 text-xs leading-relaxed text-amber-950">
              <h3 className="font-sans text-sm font-bold text-amber-900 uppercase tracking-wider">
                Tenant/Landlord Legislative Disclaimer
              </h3>
              <p>
                Under the Landlord and Tenant Act 1985 (Section 11) and the Homes (Fitness for Human Habitation) Act 2018, landlords are legally required to keep the building fabric in safe structural repair. If pests enter due to defective plumbing junctions, cracked sewer lines, or holes in external brick mortar, the landlord is responsible for resolving the issue. Our technicians supply legally-compliant written evidence folders to prevent and settle tenant housing disputes.
              </p>
              <div>
                <Link href="/advice/landlord-responsibility-pests" className="font-bold text-emerald-800 hover:underline">
                  Read Rental Guide Article &rarr;
                </Link>
              </div>
            </section>
          )}

          {/* Accreditations Trust block */}
          <section className="border-t border-gray-100 pt-8" aria-label="Approved Memberships">
            <span className="font-mono text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-4">
              Our Formally Approved Licenses
            </span>
            <div className="flex flex-wrap gap-4">
              {accreditations.map((acc) => (
                <div key={acc.id} className="bg-gray-50 border border-gray-100 px-3.5 py-2 rounded-xl text-xs font-bold text-gray-700 flex items-center gap-2">
                  <span>★ {acc.name}</span>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Right Column: Quote Form & Sidebar (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <QuoteForm />
        </div>

      </div>
    </div>
  );
}

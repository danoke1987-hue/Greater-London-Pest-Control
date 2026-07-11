/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { updatePageMetadata, Link } from '../lib/router';
import { siteSettings } from '../data/business';
import { pestsList } from '../data/pests';
import QuoteForm from '../components/QuoteForm';
import { ShieldAlert, BookOpen, HeartPulse, Hammer, Home, CheckCircle2 } from 'lucide-react';

interface PestDetailViewProps {
  slug: string;
}

export default function PestDetailView({ slug }: PestDetailViewProps) {
  const pest = pestsList.find((p) => p.slug === slug);

  // Fallback if not found
  if (!pest) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-gray-950">Pest Guide Not Found</h1>
        <p className="text-gray-600 mt-2">The requested pest directory page could not be located.</p>
        <Link href="/pests" className="mt-4 inline-block text-emerald-600 font-bold underline">
          Return to Pest Directory
        </Link>
      </div>
    );
  }

  const getPestCategory = (pSlug: string) => {
    if (['rats', 'mice'].includes(pSlug)) return 'Rodents';
    if (['pigeons'].includes(pSlug)) return 'Birds';
    if (['grey-squirrels', 'foxes'].includes(pSlug)) return 'Wildlife';
    return 'Insects';
  };

  const isHighRisk = (pSlug: string) => {
    return ['rats', 'mice', 'cockroaches', 'bed-bugs', 'wasps', 'hornets'].includes(pSlug);
  };

  useEffect(() => {
    if (pest.seoTitle && pest.metaDescription) {
      updatePageMetadata(pest.seoTitle, pest.metaDescription, `https://${siteSettings.domain}/pests/${pest.slug}`);
    }
  }, [pest]);

  const category = getPestCategory(pest.slug);
  const highRisk = isHighRisk(pest.slug);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 text-left" id={`pest-detail-${pest.slug}`}>
      
      {/* 1. Hero Breadcrumb & Main Titles */}
      <div className="border-b border-gray-100 pb-8">
        <nav className="flex text-xs font-semibold text-gray-400 gap-1.5 mb-4">
          <Link href="/" className="hover:text-gray-600">Home</Link>
          <span>/</span>
          <Link href="/pests" className="hover:text-gray-600">Pests</Link>
          <span>/</span>
          <span className="text-gray-600">{pest.title}</span>
        </nav>
        
        <div className="flex flex-col gap-3 max-w-4xl text-left">
          <div className="inline-flex max-w-max items-center gap-1.5 rounded bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
            <span>{category} Directory</span>
          </div>
          <h1 className="font-sans text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl md:text-5xl">
            Professional {pest.title} Control
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed mt-2">
            {pest.summary}
          </p>
        </div>
      </div>

      {/* 2. Structured Details Layout */}
      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12">
        
        {/* Left Column: Extensive Content (8 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-10 text-left">
          
          {/* Section: Description & Hiding Places */}
          <section className="flex flex-col gap-4" aria-labelledby="section-biological">
            <h2 id="section-biological" className="font-sans text-xl font-bold tracking-tight text-gray-950 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-emerald-600" />
              <span>Identification & Biological Profile</span>
            </h2>
            <div className="rounded-xl border border-gray-100 bg-white p-5 flex flex-col gap-4 text-xs leading-relaxed text-gray-600">
              <p>
                <strong>Identification Guide:</strong> {pest.identificationGuide}
              </p>
              <div className="border-t border-gray-50 pt-4 mt-2">
                <span className="font-bold text-gray-950 block mb-2">Typical Harborage & Hiding Places</span>
                <ul className="list-inside list-disc flex flex-col gap-1 text-gray-700">
                  {pest.typicalHidingPlaces.map((hiding, idx) => (
                    <li key={idx}>{hiding}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Section: Indicators of Infestation */}
          <section className="flex flex-col gap-4" aria-labelledby="section-indicators">
            <h2 id="section-indicators" className="font-sans text-xl font-bold tracking-tight text-gray-950 flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-emerald-600" />
              <span>Key Indicators of Activity</span>
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="list">
              {pest.commonSigns.map((ind, idx) => (
                <li key={idx} className="rounded-xl border border-gray-100 bg-gray-50/50 p-4 flex gap-3 text-xs leading-relaxed text-gray-700">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 font-bold shrink-0">
                    {idx + 1}
                  </span>
                  <span>{ind}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section: Health & Structural Risks */}
          <section className="flex flex-col gap-4" aria-labelledby="section-risks">
            <h2 id="section-risks" className="font-sans text-xl font-bold tracking-tight text-gray-950 flex items-center gap-2">
              <HeartPulse className="h-5 w-5 text-emerald-600" />
              <span>Public Health & Structural Risks</span>
            </h2>
            <div className="rounded-xl border border-red-100 bg-red-50/20 p-5 flex flex-col gap-4 text-xs leading-relaxed text-red-950">
              <div>
                <span className="font-bold text-red-900 block mb-1 uppercase tracking-wide">Pathogens & Structural Hazards</span>
                <ul className="list-inside list-disc flex flex-col gap-1.5">
                  {pest.risksToHomeOrBusiness.map((risk, idx) => (
                    <li key={idx}>{risk}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Section: Treatment Options */}
          <section className="flex flex-col gap-4" aria-labelledby="section-methods">
            <h2 id="section-methods" className="font-sans text-xl font-bold tracking-tight text-gray-950 flex items-center gap-2">
              <Hammer className="h-5 w-5 text-emerald-600" />
              <span>BPCA-Compliant Eradication Protocol</span>
            </h2>
            <div className="flex flex-col gap-4 text-xs leading-relaxed text-gray-600 bg-white border border-gray-100 rounded-xl p-5">
              <p>
                Our structural treatments strictly adhere to the codes of practice of the British Pest Control Association (BPCA).
              </p>
              
              <div className="flex flex-col gap-4 pt-2">
                <div className="flex flex-col gap-1.5">
                  <span className="font-bold text-gray-950">1. Certified Elimination Procedures:</span>
                  <ul className="list-inside list-disc flex flex-col gap-1 text-gray-700">
                    {pest.treatmentOptions.map((opt, idx) => (
                      <li key={idx}>{opt}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col gap-1.5 border-t border-gray-50 pt-3">
                  <span className="font-bold text-gray-950">2. Prevention &amp; Hard Proofing:</span>
                  <ul className="list-inside list-disc flex flex-col gap-1 text-gray-700">
                    {pest.preventionGuidance.map((prev, idx) => (
                      <li key={idx}>{prev}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Landlords and Tenants Safety */}
          <section className="flex flex-col gap-4" aria-labelledby="section-tenants">
            <h2 id="section-tenants" className="font-sans text-xl font-bold tracking-tight text-gray-950 flex items-center gap-2">
              <Home className="h-5 w-5 text-emerald-600" />
              <span>Rental Obligations & Tenant Safety</span>
            </h2>
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-5 flex flex-col gap-4 text-xs leading-relaxed text-gray-700">
              <div>
                <span className="font-bold text-gray-900 block mb-1">Landlord & Tenant Considerations:</span>
                <p>{pest.landlordTenantConsiderations}</p>
              </div>
              <div className="border-t border-gray-200/50 pt-4">
                <span className="font-bold text-gray-900 block mb-1">Residential Considerations:</span>
                <p>{pest.residentialConsiderations}</p>
              </div>
              <div className="border-t border-gray-200/50 pt-4">
                <span className="font-bold text-gray-900 block mb-1">Commercial Standards:</span>
                <p>{pest.commercialConsiderations}</p>
              </div>
            </div>
          </section>

        </div>

        {/* Right Column: Quote Form & Sidebar (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6 text-left">
          <QuoteForm />
          
          {/* Quick Info Panel */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm flex flex-col gap-4">
            <h3 className="font-sans text-sm font-bold text-gray-950 uppercase tracking-wide border-b border-gray-50 pb-2">
              Technician Credentials
            </h3>
            <ul className="flex flex-col gap-3 text-xs text-gray-600 leading-normal" role="list">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>RSPH Level 2 qualified field biologists.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Full compliance with COSHH regulatory logs.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>All treatments backed by a 100% eradication warranty.</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}

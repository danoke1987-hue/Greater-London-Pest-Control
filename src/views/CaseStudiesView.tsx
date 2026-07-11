/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { updatePageMetadata, Link } from '../lib/router';
import { siteSettings } from '../data/business';
import { caseStudiesList } from '../data/editorial';
import QuoteForm from '../components/QuoteForm';
import { ShieldAlert, CheckCircle, MapPin, Eye, FileText, ArrowRight } from 'lucide-react';

interface CaseStudiesViewProps {
  slug?: string;
}

export default function CaseStudiesView({ slug }: CaseStudiesViewProps) {
  
  // 1. DETAIL VIEW FOR A SPECIFIC CASE STUDY
  if (slug) {
    const caseStudy = caseStudiesList.find((c) => c.slug === slug);

    if (!caseStudy) {
      return (
        <div className="mx-auto max-w-7xl px-4 py-24 text-center">
          <h1 className="text-2xl font-bold text-gray-950">Case Study Not Found</h1>
          <p className="text-gray-600 mt-2">The requested case study could not be located in our verified database.</p>
          <Link href="/case-studies" className="mt-4 inline-block text-emerald-600 font-bold underline">
            Return to Case Studies
          </Link>
        </div>
      );
    }

    const pageTitle = `${caseStudy.title} | GLPC Case Studies`;
    const pageDesc = `Detailed real-world pest exclusion audit: ${caseStudy.propertyType} in ${caseStudy.broadLocation} (${caseStudy.postcodeDistrict}). Read our physical actions completed.`;

    useEffect(() => {
      updatePageMetadata(pageTitle, pageDesc, `https://${siteSettings.domain}/case-studies/${caseStudy.slug}`);
    }, [caseStudy]);

    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 text-left" id={`case-study-detail-${caseStudy.slug}`}>
        
        {/* Header Breadcrumb & Titles */}
        <div className="border-b border-gray-100 pb-8">
          <nav className="flex text-xs font-semibold text-gray-400 gap-1.5 mb-4">
            <Link href="/" className="hover:text-gray-600">Home</Link>
            <span>/</span>
            <Link href="/case-studies" className="hover:text-gray-600">Case Studies</Link>
            <span>/</span>
            <span className="text-gray-600">{caseStudy.broadLocation} Exclusion</span>
          </nav>
          
          <div className="flex flex-col gap-3 max-w-4xl">
            <div className="inline-flex max-w-max items-center gap-1.5 rounded bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
              <CheckCircle className="h-3.5 w-3.5" />
              <span>Verified Technician Case Study &bull; {caseStudy.dateOrMonth}</span>
            </div>
            <h1 className="font-sans text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl md:text-5xl leading-tight">
              {caseStudy.title}
            </h1>
            <p className="font-mono text-xs text-emerald-700">
              Property Type: {caseStudy.propertyType} &bull; Postal Code: {caseStudy.postcodeDistrict} ({caseStudy.broadLocation}) &bull; Sectors: {caseStudy.customerType}
            </p>
          </div>
        </div>

        {/* Details Grid Layout */}
        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12">
          
          {/* Left Column Content (8 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            
            {/* Initial Signs */}
            <section className="flex flex-col gap-4">
              <h2 className="font-sans text-lg font-bold text-gray-950 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldAlert className="h-5 w-5 text-red-600" />
                <span>Initial Customer Observations & Signs</span>
              </h2>
              <ul className="grid grid-cols-1 gap-3" role="list">
                {caseStudy.initialSigns.map((sign, idx) => (
                  <li key={idx} className="rounded-xl border border-gray-100 bg-red-50/5 p-4 flex gap-3 text-xs text-gray-700 leading-relaxed">
                    <span className="text-red-600 font-bold">⚠</span>
                    <span>{sign}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Inspection Findings */}
            <section className="flex flex-col gap-4">
              <h2 className="font-sans text-lg font-bold text-gray-950 uppercase tracking-wider flex items-center gap-1.5">
                <Eye className="h-5 w-5 text-emerald-600" />
                <span>Physical Inspection Findings</span>
              </h2>
              <ul className="grid grid-cols-1 gap-3" role="list">
                {caseStudy.inspectionFindings.map((find, idx) => (
                  <li key={idx} className="rounded-xl border border-gray-100 bg-white p-4 flex gap-3 text-xs text-gray-700 leading-relaxed shadow-xs">
                    <span className="text-emerald-600 font-bold">✔</span>
                    <span>{find}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Contributing Conditions */}
            <section className="flex flex-col gap-4">
              <h2 className="font-sans text-lg font-bold text-gray-950 uppercase tracking-wider">
                Contributing Structural/Site Conditions
              </h2>
              <ul className="list-inside list-disc text-xs text-gray-600 leading-relaxed flex flex-col gap-2">
                {caseStudy.contributingConditions.map((cond, idx) => (
                  <li key={idx} className="text-gray-700">{cond}</li>
                ))}
              </ul>
            </section>

            {/* Actions Completed */}
            <section className="flex flex-col gap-4">
              <h2 className="font-sans text-lg font-bold text-gray-950 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="h-5 w-5 text-emerald-600" />
                <span>Actions Completed by Surveyors</span>
              </h2>
              <div className="rounded-xl border border-gray-100 bg-white p-5 text-xs leading-relaxed text-gray-600 flex flex-col gap-3">
                <ul className="list-inside list-decimal flex flex-col gap-2.5">
                  {caseStudy.actionsCompleted.map((act, idx) => (
                    <li key={idx} className="text-gray-700">
                      <strong>Phase {idx + 1}:</strong> {act}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Outcome */}
            <section className="flex flex-col gap-3">
              <h2 className="font-sans text-lg font-bold text-gray-950 uppercase tracking-wider">
                Exclusion Outcome & Warranties
              </h2>
              <p className="text-xs leading-relaxed text-gray-600">
                {caseStudy.outcome}
              </p>
            </section>

            {/* Redacted Customer Quotation */}
            {caseStudy.customerQuotationConsent && (
              <blockquote className="rounded-xl border border-emerald-100 bg-emerald-50/10 p-6 text-xs italic leading-relaxed text-emerald-950 flex flex-col gap-3">
                <p>"{caseStudy.customerQuotation}"</p>
                <cite className="font-sans font-bold text-[10px] uppercase tracking-wider text-emerald-800 block not-italic">
                  &mdash; Client Verification ({caseStudy.broadLocation} / {caseStudy.postcodeDistrict}) - Privacy Redacted
                </cite>
              </blockquote>
            )}

            {/* Image Placeholder Notice */}
            {caseStudy.imageConsentStatus && (
              <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-5 text-center text-xs text-gray-500 font-semibold italic">
                {caseStudy.imageAlt}
              </div>
            )}

          </div>

          {/* Right Column: Quote Form (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <QuoteForm />
          </div>

        </div>
      </div>
    );
  }

  // 2. HUB VIEW FOR LISTING ALL CASE STUDIES
  const pageTitle = "Verified London Pest Control Case Studies | Real Results GLPC";
  const pageDesc = "Read real-world, verified pest exclusion audits across Greater London. Review how our field biologists locate and seal structural entries.";
  const canonicalUrl = `https://${siteSettings.domain}/case-studies`;

  useEffect(() => {
    updatePageMetadata(pageTitle, pageDesc, canonicalUrl);
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 text-left" id="case-studies-hub-page">
      
      {/* Header Intro */}
      <div className="flex flex-col gap-4 max-w-3xl">
        <div className="inline-flex max-w-max items-center gap-1.5 rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-bold text-emerald-800">
          <CheckCircle className="h-4 w-4 text-emerald-600" />
          <span>Legitimate Structural Exclusion Log Books</span>
        </div>
        <h1 className="font-sans text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl">
          Pest Control & Proofing Case Studies
        </h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          We record detailed logs of real-world structural pest problems resolved inside the M25 boundary. We do not disclose private client addresses or names, ensuring strict compliance with GDPR data privacy policies.
        </p>
      </div>

      {/* Case Studies Grid */}
      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
        {caseStudiesList.map((caseStudy) => (
          <div key={caseStudy.slug} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm flex flex-col justify-between hover:border-emerald-500/30 hover:shadow-lg transition-all group text-left">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded">
                  {caseStudy.customerType} Audit
                </span>
                <span className="flex items-center gap-1 text-[10px] text-gray-400 font-semibold">
                  <MapPin className="h-3 w-3 text-emerald-600" />
                  <span>{caseStudy.broadLocation} ({caseStudy.postcodeDistrict})</span>
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <h2 className="font-sans text-xl font-bold tracking-tight text-gray-950 group-hover:text-emerald-700 transition-colors">
                  {caseStudy.title}
                </h2>
                <p className="font-mono text-[10px] italic text-gray-500">
                  Structure: {caseStudy.propertyType} &bull; Pest: {caseStudy.pest}
                </p>
                <p className="text-xs text-gray-600 leading-relaxed mt-2 line-clamp-3">
                  {caseStudy.outcome}
                </p>
              </div>

              {/* Initial signs summary bullets */}
              <ul className="flex flex-col gap-1.5 border-t border-gray-50 pt-4 text-xs text-gray-500" role="list">
                <li className="font-semibold text-gray-700">Primary Signs Reported:</li>
                {caseStudy.initialSigns.slice(0, 2).map((sign, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-red-500 font-bold">&bull;</span>
                    <span className="line-clamp-1">{sign}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">
                Privacy Redacted
              </span>
              <Link
                href={`/case-studies/${caseStudy.slug}`}
                className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-700 shadow-sm"
              >
                <span>Read Full Audit</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

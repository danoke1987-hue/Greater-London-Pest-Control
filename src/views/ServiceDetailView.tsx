/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { updatePageMetadata, Link } from '../lib/router';
import { siteSettings } from '../data/business';
import { servicesList } from '../data/services';
import QuoteForm from '../components/QuoteForm';
import { Shield, Eye, HelpCircle, AlertTriangle, CheckSquare, ClipboardCheck, DollarSign } from 'lucide-react';

interface ServiceDetailViewProps {
  slug: string;
}

export default function ServiceDetailView({ slug }: ServiceDetailViewProps) {
  const service = servicesList.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-gray-950">Service Not Found</h1>
        <p className="text-gray-600 mt-2">The requested pest treatment page could not be located.</p>
        <Link href="/services" className="mt-4 inline-block text-emerald-600 font-bold underline">
          Return to Treatments
        </Link>
      </div>
    );
  }

  useEffect(() => {
    updatePageMetadata(service.seoTitle, service.metaDescription, `https://${siteSettings.domain}/services/${service.slug}`);
  }, [service]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 text-left" id={`service-detail-${service.slug}`}>
      
      {/* 1. Header Navigation & Main Titles */}
      <div className="border-b border-gray-100 pb-8">
        <nav className="flex text-xs font-semibold text-gray-400 gap-1.5 mb-4">
          <Link href="/" className="hover:text-gray-600">Home</Link>
          <span>/</span>
          <Link href="/services" className="hover:text-gray-600">Services</Link>
          <span>/</span>
          <span className="text-gray-600">{service.title}</span>
        </nav>
        
        <div className="flex flex-col gap-3 max-w-4xl">
          <div className="inline-flex max-w-max items-center gap-1.5 rounded bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
            <span>BPCA Registered Treatment Scheme</span>
          </div>
          <h1 className="font-sans text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl md:text-5xl">
            {service.title}
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed mt-2">
            {service.summary}
          </p>
        </div>
      </div>

      {/* 2. Page Content Layout */}
      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12">
        
        {/* Left Column: Extensive Content (8 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-10">
          
          {/* Who It Is For */}
          <section className="flex flex-col gap-3">
            <h2 className="font-sans text-lg font-bold text-gray-950 uppercase tracking-wider border-b border-gray-50 pb-2">
              Who This Service Is For
            </h2>
            <p className="text-xs leading-relaxed text-gray-600">
              {service.whoItIsFor}
            </p>
          </section>

          {/* Problems Addressed */}
          <section className="flex flex-col gap-4">
            <h2 className="font-sans text-lg font-bold text-gray-950 uppercase tracking-wider">
              Problems This Service Addresses
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="list">
              {service.problemsAddressed.map((prob, idx) => (
                <li key={idx} className="rounded-xl border border-gray-100 bg-gray-50/50 p-4 flex gap-3 text-xs text-gray-700 leading-relaxed">
                  <span className="text-red-600 font-bold">⚠</span>
                  <span>{prob}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Diagnostic Methodology */}
          <section className="flex flex-col gap-4">
            <h2 className="font-sans text-lg font-bold text-gray-950 uppercase tracking-wider flex items-center gap-2">
              <Eye className="h-5 w-5 text-emerald-600" />
              <span>Inspection & Diagnostic Methodology</span>
            </h2>
            <div className="rounded-xl border border-gray-100 bg-white p-5 flex flex-col gap-3 text-xs leading-relaxed text-gray-600">
              <p>
                Our inspections are performed with scientific rigor to identify breeding zones, runways, and architectural entrance channels.
              </p>
              <ul className="list-inside list-decimal mt-2 flex flex-col gap-2.5">
                {service.inspectionMethodology.map((meth, idx) => (
                  <li key={idx} className="text-gray-700">
                    <strong>Phase {idx + 1}:</strong> {meth}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Treatment Process */}
          <section className="flex flex-col gap-4">
            <h2 className="font-sans text-lg font-bold text-gray-950 uppercase tracking-wider flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5 text-emerald-600" />
              <span>Eradication & Proofing Process</span>
            </h2>
            <div className="rounded-xl border border-gray-100 bg-white p-5 flex flex-col gap-3 text-xs leading-relaxed text-gray-600">
              <p>
                Physical sealing works are performed alongside biological treatments to permanently isolate the structural envelope.
              </p>
              <ul className="list-inside list-disc mt-2 flex flex-col gap-2.5">
                {service.treatmentProcess.map((proc, idx) => (
                  <li key={idx} className="text-gray-700">
                    {proc}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Preparation Sheets */}
          <section className="flex flex-col gap-4">
            <h2 className="font-sans text-lg font-bold text-gray-950 uppercase tracking-wider">
              Mandatory Occupant Preparation
            </h2>
            <div className="rounded-xl border border-amber-100 bg-amber-50/20 p-5 flex flex-col gap-3 text-xs leading-relaxed text-amber-950">
              <p className="font-semibold text-amber-900">
                Please review these instructions carefully. Compliance is required for our treatment efficacy guarantees:
              </p>
              <ul className="list-inside list-disc flex flex-col gap-2">
                {service.preparationRequired.map((prep, idx) => (
                  <li key={idx}>{prep}</li>
                ))}
              </ul>
            </div>
          </section>

          {/* Visit Sequence */}
          <section className="flex flex-col gap-4">
            <h2 className="font-sans text-lg font-bold text-gray-950 uppercase tracking-wider">
              Expected Visit Sequence & Milestones
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {service.visitSequence.map((visit, idx) => (
                <div key={idx} className="rounded-xl border border-gray-100 bg-white p-4.5 flex flex-col gap-2 text-xs">
                  <span className="font-mono text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                    Milestone {idx + 1}
                  </span>
                  <p className="text-gray-600 leading-relaxed font-medium">
                    {visit}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Limitations and Safety */}
          <section className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            
            {/* Limitations */}
            <div className="flex flex-col gap-3">
              <h3 className="font-sans text-sm font-bold text-gray-950 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="h-4.5 w-4.5 text-amber-500" />
                <span>Service Boundaries</span>
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                {service.limitations[0]}
              </p>
            </div>

            {/* Safety Considerations */}
            <div className="flex flex-col gap-3">
              <h3 className="font-sans text-sm font-bold text-gray-950 uppercase tracking-wider flex items-center gap-1.5">
                <Shield className="h-4.5 w-4.5 text-emerald-600" />
                <span>Chemical Safety (COSHH)</span>
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                {service.safetyConsiderations[0]}
              </p>
            </div>

          </section>

          {/* FAQs */}
          <section className="flex flex-col gap-4">
            <h2 className="font-sans text-lg font-bold text-gray-950 uppercase tracking-wider flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-emerald-600" />
              <span>Service Specific FAQs</span>
            </h2>
            <div className="flex flex-col gap-4">
              {service.faqs.map((faq, idx) => (
                <div key={idx} className="rounded-xl border border-gray-100 bg-white p-5 flex flex-col gap-2 text-left text-xs leading-relaxed">
                  <h3 className="font-bold text-gray-950">
                    Q: {faq.question}
                  </h3>
                  <p className="text-gray-600">
                    A: {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Right Column: Quote Form & Pricing (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <QuoteForm />
          
          {/* Pricing Policy Card */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm flex flex-col gap-4 text-left">
            <h3 className="font-sans text-sm font-bold text-gray-950 uppercase tracking-wide flex items-center gap-1.5 border-b border-gray-50 pb-2">
              <DollarSign className="h-5 w-5 text-emerald-600" />
              <span>Transparent Pricing Method</span>
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              {service.pricingMethod}
            </p>
            <div className="text-[10px] text-gray-400 font-semibold italic border-t border-gray-50 pt-3">
              We strictly adhere to a clear pricing schedule and do not charge hidden fees or call-out extras. All proposals are confirmed in writing prior to active treatments.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

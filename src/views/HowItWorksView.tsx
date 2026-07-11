/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { updatePageMetadata, Link } from '../lib/router';
import { siteSettings } from '../data/business';
import QuoteForm from '../components/QuoteForm';
import { Settings, ShieldCheck, Compass, CheckCircle2, ChevronRight } from 'lucide-react';

export default function HowItWorksView() {
  const pageTitle = "Our Scientific 5-Step Eradication Process | GLPC London";
  const pageDesc = "Read how Greater London Pest Control resolves structural pest issues permanently. Learn about our diagnostic surveys, proofing seals, and warranties.";
  const canonicalUrl = `https://${siteSettings.domain}/how-it-works`;

  useEffect(() => {
    updatePageMetadata(pageTitle, pageDesc, canonicalUrl);
  }, []);

  const steps = [
    {
      title: "1. Postcode Verification & Enquiry",
      desc: "Input your full UK postcode using our coverage tracker to confirm active technician routes in your neighborhood. Book your inspection online or call our CSS line."
    },
    {
      title: "2. Diagnostic Physical Site Survey",
      desc: "Our BPCA certified surveyor inspects lofts, sub-sink utility voids, cavity lines, and pushes high-definition CCTV camera lances inside lateral private sewers to locate ingress corridors."
    },
    {
      title: "3. Fast-Acting Targeted Elimination",
      desc: "We apply safe, certified treatments—such as superheated dry steam, biological exclusion, and targeted single-feed lockable bait grids—to quickly knock down active populations."
    },
    {
      title: "4. Structural Sealing & Proofing",
      desc: "We permanently seal your property's structural envelope using heavy galvanized wire mesh, concrete mortar, and high-expansion poly-mastics. Stainless steel non-return valves are fitted inside sewers."
    },
    {
      title: "5. Biologist Audit & Guarantee",
      desc: "We conduct secondary quality inspections to confirm zero active pest pressure, safely retrieve chemical monitors, and present your formal legal treatment guarantees (up to 20-year warranty)."
    }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 text-left" id="how-it-works-page">
      
      {/* 1. Header Navigation & Main Titles */}
      <div className="border-b border-gray-100 pb-8">
        <nav className="flex text-xs font-semibold text-gray-400 gap-1.5 mb-4">
          <Link href="/" className="hover:text-gray-600">Home</Link>
          <span>/</span>
          <span className="text-gray-600">How It Works</span>
        </nav>
        
        <div className="flex flex-col gap-3 max-w-4xl">
          <div className="inline-flex max-w-max items-center gap-1.5 rounded bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
            <Settings className="h-3.5 w-3.5" />
            <span>Operational Excellence Workflow standards</span>
          </div>
          <h1 className="font-sans text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl md:text-5xl">
            Our 5-Step Eradication & Proofing Process
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed mt-2">
            Most pest controllers simply place toxic poison blocks and leave. This fails because pests crawl back into the building once the poison disappears. Greater London Pest Control uses structural engineering alongside biology to resolve infestations permanently.
          </p>
        </div>
      </div>

      {/* 2. Page Content Layout */}
      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12">
        
        {/* Left Column (8 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-10">
          
          {/* Step Sequence */}
          <section className="flex flex-col gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="relative flex gap-6 text-left items-start group">
                {/* Connector line for design */}
                {idx < steps.length - 1 && (
                  <div className="absolute left-6.5 top-14 bottom-[-32px] w-0.5 bg-gray-100" />
                )}
                
                {/* Number Circle */}
                <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-800 font-extrabold text-lg shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                  {idx + 1}
                </div>

                {/* Step Details */}
                <div className="flex flex-col gap-1.5 pt-1">
                  <h3 className="font-sans text-base font-bold text-gray-950">
                    {step.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-gray-600">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </section>

          {/* Guarantee summary */}
          <section className="rounded-2xl border border-gray-100 bg-white p-6 flex flex-col gap-4 shadow-xs">
            <h3 className="font-sans text-sm font-bold text-gray-950 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="h-5 w-5 text-emerald-600" />
              <span>Legally-Binding Treatment Guarantees</span>
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              When our certified field surveyors complete our full structural proofing protocol, your property is secured by a comprehensive written warranty. If pests bypass our physical seals or bait grids during the warranty term, we will return, re-inspect, and re-treat completely free of charge.
            </p>
            <div className="border-t border-gray-50 pt-4">
              <Link href="/pest-control-prices" className="font-bold text-emerald-700 text-xs hover:underline">
                View Pricing & Warranty Details &rarr;
              </Link>
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

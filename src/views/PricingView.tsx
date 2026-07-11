/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { updatePageMetadata, Link } from '../lib/router';
import { siteSettings, globalFAQs } from '../data/business';
import QuoteForm from '../components/QuoteForm';
import { CreditCard, ShieldCheck, Check, Phone } from 'lucide-react';

export default function PricingView() {
  const pageTitle = "Transparent Pest Control Pricing London | Fixed Rates GLPC";
  const pageDesc = "No hidden fees. Read our clear Greater London pest control price guides for flats, terraced houses, and custom commercial contract audits.";
  const canonicalUrl = `https://${siteSettings.domain}/pest-control-prices`;

  useEffect(() => {
    updatePageMetadata(pageTitle, pageDesc, canonicalUrl);
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 text-left" id="pricing-page">
      
      {/* 1. Header Navigation & Main Titles */}
      <div className="border-b border-gray-100 pb-8">
        <nav className="flex text-xs font-semibold text-gray-400 gap-1.5 mb-4">
          <Link href="/" className="hover:text-gray-600">Home</Link>
          <span>/</span>
          <span className="text-gray-600">Pricing Guide</span>
        </nav>
        
        <div className="flex flex-col gap-3 max-w-4xl">
          <div className="inline-flex max-w-max items-center gap-1.5 rounded bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
            <CreditCard className="h-3.5 w-3.5" />
            <span>Honest, Transparent Estimates Policy</span>
          </div>
          <h1 className="font-sans text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl md:text-5xl">
            Pest Control Cost & Pricing Guidelines
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed mt-2">
            At Greater London Pest Control, we operate with structural honesty. We avoid deceptive "blind estimates" or "bargain-basement bait-and-switch" pricing. Below we outline our exact pricing guidelines for residential properties, commercial site audits, and diagnostic inspections.
          </p>
        </div>
      </div>

      {/* 2. Page Content Layout */}
      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12">
        
        {/* Left Column (8 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-10">
          
          {/* Section: Inspection structure */}
          <section className="flex flex-col gap-4">
            <h2 className="font-sans text-lg font-bold text-gray-950 uppercase tracking-wider">
              Diagnostic Site Inspections
            </h2>
            <div className="rounded-xl border border-emerald-100 bg-emerald-50/15 p-5 flex flex-col gap-3 text-xs leading-relaxed text-gray-700">
              <span className="font-sans text-base font-bold text-emerald-950">
                Inspection & Survey Fee: £120
              </span>
              <p>
                To provide a legitimate, guaranteed quote, our surveyor must physically inspect your property, lofts, utilities, and drainage chambers using high-definition CCTV camera systems.
              </p>
              <div className="border-t border-emerald-100/50 pt-3 font-bold text-emerald-900">
                ★ 100% Deductible: The £120 survey fee is deducted in full from any subsequent treatment or structural proofing work you agree to carry out with us.
              </div>
            </div>
          </section>

          {/* Section: Residential Pricing Scenarios */}
          <section className="flex flex-col gap-4">
            <h2 className="font-sans text-lg font-bold text-gray-950 uppercase tracking-wider">
              Standard Residential Service Packages
            </h2>
            <p className="text-xs text-gray-600 leading-relaxed">
              Below are typical price guides for standard treatments (e.g., mice/rat control), illustrating how structural size and proofing levels affect the total cost:
            </p>
            
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mt-2">
              
              <div className="rounded-xl border border-gray-100 bg-white p-5 flex flex-col justify-between shadow-xs">
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[9px] font-bold text-gray-400 uppercase tracking-wider">
                    Studio / 1-Bed Flat
                  </span>
                  <span className="font-sans text-lg font-extrabold text-gray-950">
                    From £160
                  </span>
                  <p className="text-[10px] text-gray-500 leading-normal mt-1">
                    Standard 3-visit eradication including minor pipe-penetration exclusion.
                  </p>
                </div>
                <ul className="flex flex-col gap-1.5 border-t border-gray-50 pt-3 mt-4 text-[10px] text-gray-600 font-semibold" role="list">
                  <li className="flex items-center gap-1">
                    <Check className="h-3 w-3 text-emerald-600" />
                    <span>3 Technician Visits</span>
                  </li>
                  <li className="flex items-center gap-1">
                    <Check className="h-3 w-3 text-emerald-600" />
                    <span>Minor Pipe Sealing</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border border-gray-100 bg-white p-5 flex flex-col justify-between shadow-xs">
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[9px] font-bold text-gray-400 uppercase tracking-wider">
                    3-Bed Terraced House
                  </span>
                  <span className="font-sans text-lg font-extrabold text-gray-950">
                    From £240
                  </span>
                  <p className="text-[10px] text-gray-500 leading-normal mt-1">
                    Complete eradication program targeting wall cavities, including loft safety sweeps.
                  </p>
                </div>
                <ul className="flex flex-col gap-1.5 border-t border-gray-50 pt-3 mt-4 text-[10px] text-gray-600 font-semibold" role="list">
                  <li className="flex items-center gap-1">
                    <Check className="h-3 w-3 text-emerald-600" />
                    <span>3 Technician Visits</span>
                  </li>
                  <li className="flex items-center gap-1">
                    <Check className="h-3 w-3 text-emerald-600" />
                    <span>Loft Safety Sweep</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border border-gray-100 bg-white p-5 flex flex-col justify-between shadow-xs">
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[9px] font-bold text-gray-400 uppercase tracking-wider">
                    Large Detached / Commercial
                  </span>
                  <span className="font-sans text-lg font-extrabold text-gray-950">
                    Custom Quote
                  </span>
                  <p className="text-[10px] text-gray-500 leading-normal mt-1">
                    Requires on-site physical survey to map extensive utility lines and structural layout.
                  </p>
                </div>
                <ul className="flex flex-col gap-1.5 border-t border-gray-50 pt-3 mt-4 text-[10px] text-gray-600 font-semibold" role="list">
                  <li className="flex items-center gap-1">
                    <Check className="h-3 w-3 text-emerald-600" />
                    <span>On-Site Survey First</span>
                  </li>
                  <li className="flex items-center gap-1">
                    <Check className="h-3 w-3 text-emerald-600" />
                    <span>Sewer CCTV Check</span>
                  </li>
                </ul>
              </div>

            </div>
          </section>

          {/* Section: Commercial contracts guidelines */}
          <section className="flex flex-col gap-4 text-xs text-gray-600 leading-relaxed bg-white border border-gray-100 rounded-xl p-5">
            <h3 className="font-sans text-sm font-bold text-gray-950 uppercase tracking-wider">
              Commercial Preventative Protection Contracts
            </h3>
            <p>
              Commercial pricing is custom-tailored to site square footage, food safety audit levels (BRC, SALSA), and technician visit frequencies (4, 8, or 12 inspections per year). Routine preventative contracts starting from £35 per month include continuous non-toxic monitoring arrays, a physical/digital Compliance Log Folder, and completely free, rapid emergency call-out cover.
            </p>
          </section>

          {/* Pricing FAQ Section */}
          <section className="flex flex-col gap-4">
            <h2 className="font-sans text-lg font-bold text-gray-950 uppercase tracking-wider">
              Payment & Policy FAQs
            </h2>
            <div className="flex flex-col gap-4">
              {globalFAQs.slice(0, 3).map((faq, idx) => (
                <div key={idx} className="rounded-xl border border-gray-100 bg-white p-5 flex flex-col gap-2 text-xs leading-relaxed">
                  <h3 className="font-bold text-gray-950">Q: {faq.question}</h3>
                  <p className="text-gray-600">A: {faq.answer}</p>
                </div>
              ))}
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

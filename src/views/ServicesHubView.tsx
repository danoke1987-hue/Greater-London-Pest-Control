/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { updatePageMetadata, Link } from '../lib/router';
import { siteSettings } from '../data/business';
import { servicesList } from '../data/services';
import { ShieldCheck, ArrowRight, CheckCircle } from 'lucide-react';

export default function ServicesHubView() {
  const pageTitle = "Accredited Pest Control Services London | Guaranteed Treatments";
  const pageDesc = "Browse professional, BPCA-accredited pest control services inside the M25. Same-day rat, mouse, bed bug, and commercial protection contracts.";
  const canonicalUrl = `https://${siteSettings.domain}/services`;

  useEffect(() => {
    updatePageMetadata(pageTitle, pageDesc, canonicalUrl);
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 text-left" id="services-hub-page">
      
      {/* 1. Header Intro */}
      <div className="flex flex-col gap-4 max-w-3xl">
        <div className="inline-flex max-w-max items-center gap-1.5 rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-bold text-emerald-800">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          <span>Accredited Greater London Treatments</span>
        </div>
        <h1 className="font-sans text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl">
          Pest Control & Prevention Services
        </h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          We deliver certified structural pest eradication and proofing solutions inside the M25 boundary. All physical works are completed by fully qualified BPCA field technicians and backed by legal warranties.
        </p>
      </div>

      {/* 2. Services Grid */}
      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {servicesList.map((service) => (
          <div key={service.slug} className="flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:border-emerald-500/30 hover:shadow-lg transition-all group">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded">
                  BPCA Certified
                </span>
                <span className="text-[10px] text-gray-500 font-semibold italic">
                  Reviewed: {service.lastReviewed}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <h2 className="font-sans text-xl font-bold tracking-tight text-gray-950">
                  {service.title}
                </h2>
                <p className="text-xs text-gray-600 leading-relaxed mt-1">
                  {service.summary}
                </p>
              </div>

              {/* Core features bullet snap */}
              <ul className="flex flex-col gap-2 border-t border-gray-50 pt-4 text-xs text-gray-600 leading-relaxed" role="list">
                {service.problemsAddressed.slice(0, 2).map((prob, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{prob}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">
                HSE Registered
              </span>
              <Link
                href={`/services/${service.slug}`}
                className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-700 shadow-sm transition-all"
              >
                <span>Full Service Guide</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pricing Disclaimer Box */}
      <div className="mt-12 rounded-2xl bg-gray-50 border border-gray-100 p-6 flex flex-col gap-2.5">
        <h3 className="font-sans text-sm font-bold text-gray-900 uppercase tracking-wider">
          Our Standard Commercial and Residential Pricing Standards
        </h3>
        <p className="text-xs text-gray-600 leading-relaxed">
          At Greater London Pest Control, we provide transparent, honest estimates and avoid "blind quotes." Residential prices depend on property structure size and proofing levels, while commercial contract rates are tailored precisely to regulatory audit levels. Standard pest inspections are offered from £120, which is deducted in full from any subsequent treatment package agreed.
        </p>
        <div>
          <Link href="/pest-control-prices" className="font-bold text-emerald-700 text-xs hover:underline">
            View Complete Pricing Guide &rarr;
          </Link>
        </div>
      </div>

    </div>
  );
}

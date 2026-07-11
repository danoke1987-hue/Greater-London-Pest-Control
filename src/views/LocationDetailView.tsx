/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { updatePageMetadata, Link } from '../lib/router';
import { siteSettings } from '../data/business';
import { locationsList, activeBoroughs } from '../data/locations';
import QuoteForm from '../components/QuoteForm';
import { MapPin, ShieldCheck, FileText, Compass, AlertCircle, HelpCircle } from 'lucide-react';

interface LocationDetailViewProps {
  slug: string;
}

export default function LocationDetailView({ slug }: LocationDetailViewProps) {
  const location = locationsList.find((l) => l.slug === slug);

  // If location not found or not published, show a friendly fallback
  if (!location || !location.editorialQuality.isServed) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-gray-950">Area Guide Under Verification</h1>
        <p className="text-gray-600 mt-2">The requested area guide is currently undergoing editorial review and has not yet been approved for indexation.</p>
        <Link href="/areas" className="mt-4 inline-block text-emerald-600 font-bold underline">
          Return to Service Areas
        </Link>
      </div>
    );
  }

  const borough = activeBoroughs.find(b => b.slug === location.boroughSlug);
  const pageTitle = `Pest Control ${location.name} | Certified BPCA Exterminator & Proofing`;
  const pageDesc = `Professional pest control in ${location.name} (${borough?.name || 'Greater London'}). Safe, fast-acting treatments with structural proofing warranties. Inquire today.`;

  useEffect(() => {
    updatePageMetadata(pageTitle, pageDesc, `https://${siteSettings.domain}/locations/${location.slug}`);
  }, [location]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 text-left" id={`location-detail-${location.slug}`}>
      
      {/* 1. Header Navigation & Main Titles */}
      <div className="border-b border-gray-100 pb-8">
        <nav className="flex text-xs font-semibold text-gray-400 gap-1.5 mb-4">
          <Link href="/" className="hover:text-gray-600">Home</Link>
          <span>/</span>
          <Link href="/areas" className="hover:text-gray-600">Areas</Link>
          <span>/</span>
          {borough && (
            <>
              <Link href={`/boroughs/${borough.slug}`} className="hover:text-gray-600">{borough.name}</Link>
              <span>/</span>
            </>
          )}
          <span className="text-gray-600">{location.name}</span>
        </nav>
        
        <div className="flex flex-col gap-3 max-w-4xl">
          <div className="inline-flex max-w-max items-center gap-1.5 rounded bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
            <MapPin className="h-3 w-3" />
            <span>Active Service Route Verified &bull; {borough?.name}</span>
          </div>
          <h1 className="font-sans text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl md:text-5xl">
            Pest Control in {location.name}
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed mt-2">
            {location.localIntroduction}
          </p>
        </div>
      </div>

      {/* 2. Structured Sections Layout */}
      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12">
        
        {/* Left Column: Extensive Local Content (8 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-10">
          
          {/* Local Pest Observations */}
          <section className="flex flex-col gap-3">
            <h2 className="font-sans text-lg font-bold text-gray-950 uppercase tracking-wider border-b border-gray-50 pb-2">
              Local Pest Observations & Trends
            </h2>
            <p className="text-xs leading-relaxed text-gray-600">
              {location.localPestObservations}
            </p>
          </section>

          {/* Property Considerations */}
          {location.propertyConsiderations && (
            <section className="flex flex-col gap-4">
              <h2 className="font-sans text-lg font-bold text-gray-950 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="h-5 w-5 text-emerald-600" />
                <span>Property & Architectural Considerations</span>
              </h2>
              <div className="rounded-xl border border-gray-100 bg-white p-5 text-xs leading-relaxed text-gray-600">
                <p>{location.propertyConsiderations}</p>
              </div>
            </section>
          )}

          {/* Commercial Considerations */}
          {location.commercialConsiderations && (
            <section className="flex flex-col gap-4">
              <h2 className="font-sans text-lg font-bold text-gray-950 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="h-5 w-5 text-emerald-600" />
                <span>Commercial Business Protection</span>
              </h2>
              <div className="rounded-xl border border-emerald-100 bg-emerald-50/10 p-5 text-xs leading-relaxed text-gray-600">
                <p>{location.commercialConsiderations}</p>
              </div>
            </section>
          )}

          {/* Parking & Technician Notes */}
          <section className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            
            {/* Technician Notes */}
            {location.technicianNotes && (
              <div className="flex flex-col gap-3">
                <h3 className="font-sans text-sm font-bold text-gray-950 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertCircle className="h-4.5 w-4.5 text-emerald-600" />
                  <span>On-Site Technician Notes</span>
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {location.technicianNotes}
                </p>
              </div>
            )}

            {/* Parking & Access Notes */}
            {location.parkingAndAccessNotes && (
              <div className="flex flex-col gap-3">
                <h3 className="font-sans text-sm font-bold text-gray-950 uppercase tracking-wider flex items-center gap-1.5">
                  <Compass className="h-4.5 w-4.5 text-emerald-600" />
                  <span>Parking & Access Rules</span>
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {location.parkingAndAccessNotes}
                </p>
              </div>
            )}

          </section>

          {/* Local FAQs */}
          {location.faqs && location.faqs.length > 0 && (
            <section className="flex flex-col gap-4">
              <h2 className="font-sans text-lg font-bold text-gray-950 uppercase tracking-wider flex items-center gap-1.5">
                <HelpCircle className="h-5 w-5 text-emerald-600" />
                <span>Local FAQs for {location.name}</span>
              </h2>
              <div className="flex flex-col gap-4">
                {location.faqs.map((faq, idx) => (
                  <div key={idx} className="rounded-xl border border-gray-100 bg-white p-5 flex flex-col gap-2 text-xs leading-relaxed">
                    <h3 className="font-bold text-gray-950">Q: {faq.question}</h3>
                    <p className="text-gray-600">A: {faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Nearby served areas link snaps */}
          {location.nearbyAreas && location.nearbyAreas.length > 0 && (
            <section className="border-t border-gray-100 pt-8 text-xs text-gray-500 leading-relaxed">
              <span className="font-bold text-gray-900 block mb-2">Nearby Served Areas in This Sector:</span>
              <div className="flex flex-wrap gap-2">
                {location.nearbyAreas.map((area, idx) => (
                  <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg font-semibold capitalize">
                    {area.replace('-', ' ')}
                  </span>
                ))}
              </div>
            </section>
          )}

        </div>

        {/* Right Column: Quote Form & Sidebar (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <QuoteForm />
          
          {/* Localized Response Times Panel */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm flex flex-col gap-4">
            <h3 className="font-sans text-sm font-bold text-gray-950 uppercase tracking-wide border-b border-gray-50 pb-2">
              Local Response Times
            </h3>
            <ul className="flex flex-col gap-3 text-xs text-gray-600 leading-normal" role="list">
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-600 font-bold">✔</span>
                <span>Response times typically within 2-3 hours inside {location.name}.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-600 font-bold">✔</span>
                <span>Unbranded service vehicles deployed to safeguard privacy.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-600 font-bold">✔</span>
                <span>Fully certified BPCA technicians on rotation daily.</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}

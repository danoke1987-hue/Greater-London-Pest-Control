/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { updatePageMetadata, Link } from '../lib/router';
import { siteSettings } from '../data/business';
import { postcodesList, boroughsList } from '../data/locations';
import QuoteForm from '../components/QuoteForm';
import { Compass, ShieldCheck, Mail, Phone, AlertTriangle, ArrowRight } from 'lucide-react';

interface PostcodeDetailViewProps {
  outwardCode: string;
}

export default function PostcodeDetailView({ outwardCode }: PostcodeDetailViewProps) {
  const postcode = postcodesList.find(
    (p) => p.outwardCode.toUpperCase() === outwardCode.toUpperCase()
  );

  if (!postcode) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-gray-950">Postcode Outward Sector Not Found</h1>
        <p className="text-gray-600 mt-2">The requested postal district guide could not be located in our verified database.</p>
        <Link href="/areas" className="mt-4 inline-block text-emerald-600 font-bold underline">
          Return to Service Areas
        </Link>
      </div>
    );
  }

  const borough = boroughsList.find((b) => b.slug === postcode.relevantBorough);
  const isActivelyServed = postcode.isActivelyServed;
  const pageTitle = `Pest Control ${postcode.outwardCode} | ${postcode.postcodeArea} | Certified Exterminators`;
  const pageDesc = `Professional, BPCA-accredited structural pest control in ${postcode.postcodeArea} (${postcode.outwardCode}). Direct same-day emergency dispatch inside the M25.`;

  useEffect(() => {
    updatePageMetadata(pageTitle, pageDesc, `https://${siteSettings.domain}/postcodes/${postcode.outwardCode}`);
  }, [postcode]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 text-left" id={`postcode-detail-${postcode.outwardCode}`}>
      
      {/* 1. Header Navigation & Main Titles */}
      <div className="border-b border-gray-100 pb-8">
        <nav className="flex text-xs font-semibold text-gray-400 gap-1.5 mb-4">
          <Link href="/" className="hover:text-gray-600">Home</Link>
          <span>/</span>
          <Link href="/areas" className="hover:text-gray-600">Areas</Link>
          <span>/</span>
          {borough && (
            <>
              <Link href={`/boroughs/${borough.slug}`} className="hover:text-gray-600">Borough of {borough.name}</Link>
              <span>/</span>
            </>
          )}
          <span className="text-gray-600">Postcode Sector {postcode.outwardCode}</span>
        </nav>
        
        <div className="flex flex-col gap-3 max-w-4xl">
          {isActivelyServed ? (
            <div className="inline-flex max-w-max items-center gap-1.5 rounded bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
              <ShieldCheck className="h-3 w-3 text-emerald-600" />
              <span>Confirmed Active Same-Day Response Zone &bull; {postcode.outwardCode}</span>
            </div>
          ) : (
            <div className="inline-flex max-w-max items-center gap-1.5 rounded bg-amber-50 px-2.5 py-0.5 text-[10px] font-bold text-amber-800">
              <AlertTriangle className="h-3 w-3 text-amber-600" />
              <span>Postal Route Under Verification &bull; No Active Same-Day Dispatch</span>
            </div>
          )}
          
          <h1 className="font-sans text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl md:text-5xl">
            Pest Control in {postcode.postcodeArea} ({postcode.outwardCode})
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed mt-2">
            Our certified structural exclusion and extermination teams provide rapid support inside the <strong>{postcode.outwardCode}</strong> postal outward sector, encompassing <strong>{postcode.postcodeArea}</strong> and neighboring communities within the London Borough of {borough?.name || 'Greater London'}.
          </p>
        </div>
      </div>

      {/* 2. Page Content Layout */}
      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12">
        
        {/* Left Column (8 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-10">
          
          {isActivelyServed ? (
            <>
              {/* Coverage Confirmation & Travel constraints */}
              <section className="flex flex-col gap-4">
                <h2 className="font-sans text-lg font-bold text-gray-950 uppercase tracking-wider">
                  Postcode Operational Scope
                </h2>
                <div className="rounded-xl border border-gray-100 bg-white p-5 flex flex-col gap-3 text-xs leading-relaxed text-gray-600">
                  <p>
                    Technicians patrolled under the <strong>{postcode.outwardCode}</strong> router scheme are equipped with standard high-viscosity gels, professional rodent baiting cages, CCTV sewer lances, and superheated steam units.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-gray-50 pt-4 mt-2">
                    <div>
                      <span className="font-bold text-gray-950 block mb-1">M25 Boundary Status</span>
                      <span>{postcode.isWhollyInsideM25 ? "Wholly Inside M25" : "Partly Inside M25"}</span>
                    </div>
                    <div>
                      <span className="font-bold text-gray-950 block mb-1">Primary Post Town</span>
                      <span>{postcode.mainPostTown}</span>
                    </div>
                    <div className="sm:col-span-2">
                      <span className="font-bold text-gray-950 block mb-1">Travel Limitations & Congestion Zones</span>
                      <span>{postcode.serviceLimitations || "No major travel restrictions apply; standard technician routing is in place."}</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Neighbors Link snaps */}
              <section className="flex flex-col gap-4">
                <h2 className="font-sans text-lg font-bold text-gray-950 uppercase tracking-wider flex items-center gap-1.5">
                  <Compass className="h-5 w-5 text-emerald-600" />
                  <span>Neighbouring Postal Sectors Served</span>
                </h2>
                <p className="text-xs text-gray-600 leading-relaxed">
                  We maintain overlapping technician coverage paths across neighboring South and Central London postal outward sectors to secure contiguous structural areas:
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {postcode.neighbouringOutwardDistricts.map((neigh) => (
                    <span
                      key={neigh}
                      className="rounded-lg border border-gray-100 bg-white px-3.5 py-2 text-xs font-bold text-emerald-800 hover:border-emerald-500/30 transition-all cursor-default"
                    >
                      {neigh}
                    </span>
                  ))}
                </div>
              </section>

              {/* Direct Booking Guidelines */}
              <section className="rounded-xl border border-emerald-100 bg-emerald-50/15 p-6 flex flex-col gap-4 text-xs leading-relaxed text-gray-700">
                <h3 className="font-sans text-sm font-bold text-emerald-900 uppercase tracking-wider">
                  Same-Day Response Guidelines inside {postcode.outwardCode}
                </h3>
                <p>
                  We aim to complete standard surveys and immediate knockdown treatments within 2 to 3 hours of formal phone dispatch. To schedule an appointment or request a rapid callback, please submit your request using the secure form on the right.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <a
                    href={`tel:${siteSettings.standardPhone.replace(/\s+/g, '')}`}
                    className="flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-700"
                  >
                    <Phone className="h-4.5 w-4.5" />
                    <span>Call Customer Service</span>
                  </a>
                  <a
                    href={`mailto:${siteSettings.email}`}
                    className="flex items-center justify-center gap-2 rounded-lg border border-emerald-200 bg-white px-4 py-2.5 text-xs font-bold text-emerald-800 hover:bg-emerald-50"
                  >
                    <Mail className="h-4.5 w-4.5" />
                    <span>Send Technical Email</span>
                  </a>
                </div>
              </section>
            </>
          ) : (
            /* Postcode is not actively served */
            <div className="rounded-2xl border border-amber-100 bg-amber-50/25 p-6 flex flex-col gap-4 text-xs leading-relaxed text-amber-950">
              <h3 className="font-sans text-sm font-bold text-amber-900 uppercase tracking-wider">
                Our Same-Day technician routes do not cover {postcode.outwardCode}
              </h3>
              <p>
                To comply strictly with quality and scheduling guarantees, Greater London Pest Control does not offer active standard bookings inside the <strong>{postcode.outwardCode}</strong> ({postcode.postcodeArea}) sector at this time.
              </p>
              <div className="border-t border-amber-100/50 pt-4">
                <span className="font-bold text-amber-900 block mb-2">Are you located in an adjacent sector?</span>
                <p>
                  You can browse our primary service areas list or use our postcode checker to verify adjacent postal boundary coverage coordinates.
                </p>
                <div className="mt-4">
                  <Link href="/areas" className="font-bold text-emerald-800 hover:underline">
                    View Supported Service Areas &rarr;
                  </Link>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Right Column (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <QuoteForm />
        </div>

      </div>
    </div>
  );
}

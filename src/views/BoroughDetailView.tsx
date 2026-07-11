/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { updatePageMetadata, Link } from '../lib/router';
import { siteSettings } from '../data/business';
import { boroughsList, locationsList } from '../data/locations';
import QuoteForm from '../components/QuoteForm';
import PostcodeChecker from '../components/PostcodeChecker';
import { Landmark, ArrowRight, ShieldCheck, MapPin, MapPinOff } from 'lucide-react';

interface BoroughDetailViewProps {
  slug: string;
}

export default function BoroughDetailView({ slug }: BoroughDetailViewProps) {
  const borough = boroughsList.find((b) => b.slug === slug);

  if (!borough) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-gray-950">Borough Boundary Not Found</h1>
        <p className="text-gray-600 mt-2">The requested London borough coordinate page could not be located.</p>
        <Link href="/areas" className="mt-4 inline-block text-emerald-600 font-bold underline">
          Return to Service Areas
        </Link>
      </div>
    );
  }

  const pageTitle = `Pest Control ${borough.name} Borough | Certified Exterminator & Proofing`;
  const pageDesc = `BPCA certified pest control services in the London Borough of ${borough.name}. Direct rapid surveys and structural proofing with guarantees.`;

  useEffect(() => {
    updatePageMetadata(pageTitle, pageDesc, `https://${siteSettings.domain}/boroughs/${borough.slug}`);
  }, [borough]);

  // Find active locations within this borough
  const activeLocationsInBorough = locationsList.filter(
    (l) => l.boroughSlug === borough.slug && l.editorialQuality.isServed && l.editorialQuality.publicationStatus === 'published'
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 text-left" id={`borough-detail-${borough.slug}`}>
      
      {/* 1. Header Navigation & Main Titles */}
      <div className="border-b border-gray-100 pb-8">
        <nav className="flex text-xs font-semibold text-gray-400 gap-1.5 mb-4">
          <Link href="/" className="hover:text-gray-600">Home</Link>
          <span>/</span>
          <Link href="/areas" className="hover:text-gray-600">Areas</Link>
          <span>/</span>
          <span className="text-gray-600">Borough of {borough.name}</span>
        </nav>
        
        <div className="flex flex-col gap-3 max-w-4xl">
          {borough.isServed ? (
            <div className="inline-flex max-w-max items-center gap-1.5 rounded bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
              <ShieldCheck className="h-3 w-3 text-emerald-600" />
              <span>Actively Served London Borough - Technician Patrol Route</span>
            </div>
          ) : (
            <div className="inline-flex max-w-max items-center gap-1.5 rounded bg-amber-50 px-2.5 py-0.5 text-[10px] font-bold text-amber-800">
              <MapPinOff className="h-3 w-3" />
              <span>Informational Page Only &bull; Out of Service Boundary</span>
            </div>
          )}
          
          <h1 className="font-sans text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl md:text-5xl">
            Pest Control in the Borough of {borough.name}
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed mt-2">
            {borough.description}
          </p>
        </div>
      </div>

      {/* 2. Page Content Layout */}
      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12">
        
        {/* Left Column (8 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-10">
          
          {borough.isServed ? (
            <>
              {/* Served District Directory */}
              <section className="flex flex-col gap-4">
                <h2 className="font-sans text-lg font-bold text-gray-950 uppercase tracking-wider">
                  Actively Served Districts in {borough.name}
                </h2>
                <p className="text-xs text-gray-600 leading-relaxed">
                  We maintain daily patrol routes and verified physical customer coverage in these localized districts. Click any district below to read the comprehensive local guide:
                </p>
                
                {activeLocationsInBorough.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                    {activeLocationsInBorough.map((loc) => (
                      <Link
                        key={loc.slug}
                        href={`/locations/${loc.slug}`}
                        className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-4 shadow-xs hover:border-emerald-500/30 hover:shadow-md transition-all group"
                      >
                        <div className="flex flex-col gap-0.5">
                          <span className="text-sm font-bold text-gray-950 group-hover:text-emerald-700">
                            {loc.name}
                          </span>
                          <span className="text-[10px] text-gray-400 font-medium">Full Guide &amp; Reviews</span>
                        </div>
                        <ArrowRight className="h-4 w-4 text-emerald-500" />
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-6 text-center text-xs text-gray-500 font-semibold leading-relaxed">
                    Local district detail pages are currently undergoing final quality checks. You can still submit an enquiry for any postcode inside {borough.name} using the form on the right.
                  </div>
                )}
              </section>

              {/* Council reporting instructions */}
              <section className="rounded-xl border border-gray-100 bg-white p-6 flex flex-col gap-4">
                <h3 className="font-sans text-sm font-bold text-gray-950 uppercase tracking-wider flex items-center gap-2">
                  <Landmark className="h-5 w-5 text-emerald-600 shrink-0" />
                  <span>Municipal Pest Services & Reporting Lines</span>
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  If you are a council tenant living in the London Borough of {borough.name}, you may be eligible for subsidized or free pest treatment options provided directly by the local authority. For private renters or residential homeowners seeking independent commercial-grade proofing and rapid same-day response times, please use our private call-out scheduler.
                </p>
                <div className="border-t border-gray-50 pt-4 flex flex-col gap-2.5 text-xs">
                  <span className="font-bold text-gray-800">Borough Council Contacts:</span>
                  <p>
                    Please visit the official website for the <strong>{borough.name} Borough Council</strong> to check municipal environmental health rules, waste collections, and council-tenant pest reporting procedures.
                  </p>
                </div>
              </section>
            </>
          ) : (
            /* Non-served Borough View */
            <div className="rounded-2xl border border-amber-100 bg-amber-50/20 p-6 flex flex-col gap-4 text-xs leading-relaxed text-amber-950">
              <h3 className="font-sans text-sm font-bold text-amber-900 uppercase tracking-wider">
                This Borough lies outside our active service boundary
              </h3>
              <p>
                To maintain our rapid response guarantees (typically within 2-3 hours), Greater London Pest Control operates strictly within defined inner sectors inside the M25. We do not currently accept bookings or dispatch technicians to {borough.name}.
              </p>
              <div className="border-t border-amber-100/50 pt-4">
                <span className="font-bold text-amber-900 block mb-2">Check Other Service Areas:</span>
                <p>
                  You can browse our active regions map or use our postcode checker to verify if a neighboring street falls inside our approved boundary line.
                </p>
                <div className="mt-4">
                  <Link href="/areas" className="font-bold text-emerald-800 hover:underline">
                    View Supported Service Areas &rarr;
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Area check widget */}
          <div className="mt-4">
            <PostcodeChecker />
          </div>

        </div>

        {/* Right Column: Quote Form (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <QuoteForm />
        </div>

      </div>
    </div>
  );
}

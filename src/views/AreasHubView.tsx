/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { updatePageMetadata, Link } from '../lib/router';
import { siteSettings } from '../data/business';
import { regionsList, boroughsList } from '../data/locations';
import PostcodeChecker from '../components/PostcodeChecker';
import { Map, ShieldCheck, ChevronRight, Search } from 'lucide-react';

export default function AreasHubView() {
  const pageTitle = "Greater London Service Area Limits | M25 Pest Control Map";
  const pageDesc = "Verify active structural pest control coverage inside Greater London. Browse 32 boroughs, 6 major regions, and outward postcode districts.";
  const canonicalUrl = `https://${siteSettings.domain}/areas`;

  const [activeRegionFilter, setActiveRegionFilter] = useState<'all' | string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    updatePageMetadata(pageTitle, pageDesc, canonicalUrl);
  }, []);

  const activeBoroughs = boroughsList.filter(b => b.isServed);
  const draftBoroughs = boroughsList.filter(b => !b.isServed);

  // Filter boroughs based on tabs
  const filteredBoroughs = activeBoroughs.filter((b) => {
    const matchesRegion = activeRegionFilter === 'all' || b.broadRegion === activeRegionFilter;
    const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 text-left" id="areas-hub-page">
      
      {/* 1. Header Intro */}
      <div className="flex flex-col gap-4 max-w-3xl">
        <div className="inline-flex max-w-max items-center gap-1.5 rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-bold text-emerald-800">
          <Map className="h-4 w-4 text-emerald-600" />
          <span>Legitimate Greater London Operating Boundaries</span>
        </div>
        <h1 className="font-sans text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl">
          London Service Areas & Regions
        </h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          Greater London Pest Control operates dedicated local technician routes inside the M25 boundary. To ensure rapid response times, we publish real-time coverage updates for boroughs and postal districts where our teams actively patrol.
        </p>
      </div>

      {/* 2. Postcode Checker Widget */}
      <div className="mt-10 max-w-3xl">
        <PostcodeChecker />
      </div>

      {/* 3. Regional Operating Sectors */}
      <section className="mt-16" aria-labelledby="regions-title">
        <h2 id="regions-title" className="font-sans text-2xl font-bold tracking-tight text-gray-950">
          London Regional Hubs
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {regionsList.map((region) => (
            <div key={region.slug} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xs text-left">
              <span className="font-mono text-[9px] font-bold text-emerald-700 uppercase tracking-wider block mb-2">
                Regional Sector
              </span>
              <h3 className="font-sans text-lg font-bold text-gray-900 tracking-tight">
                {region.name}
              </h3>
              <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                {region.description}
              </p>
              <div className="mt-4 pt-4 border-t border-gray-50 text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
                Active patrolling route
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Filterable Served Boroughs Directory */}
      <section className="mt-16" aria-labelledby="boroughs-dir-title">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between border-b border-gray-100 pb-6">
          <div className="flex flex-col gap-1 text-left">
            <h2 id="boroughs-dir-title" className="font-sans text-2xl font-bold tracking-tight text-gray-950">
              Served Boroughs Directory
            </h2>
            <p className="text-xs text-gray-500">
              Browse localized pest trends and council reporting rules for actively served boroughs.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full max-w-xs">
            <input
              type="text"
              placeholder="Search active boroughs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-2.5 pl-10 text-xs font-semibold text-gray-900 focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600/15"
            />
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Region Filter buttons */}
        <div className="flex flex-wrap gap-1.5 mt-6">
          <button
            onClick={() => setActiveRegionFilter('all')}
            className={`rounded-lg px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
              activeRegionFilter === 'all'
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            All Served
          </button>
          {regionsList.map((region) => (
            <button
              key={region.slug}
              onClick={() => setActiveRegionFilter(region.slug)}
              className={`rounded-lg px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                activeRegionFilter === region.slug
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              {region.name}
            </button>
          ))}
        </div>

        {/* Borough Grid */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBoroughs.map((b) => (
            <Link
              key={b.slug}
              href={`/boroughs/${b.slug}`}
              className="flex items-center justify-between rounded-xl border border-gray-100 bg-white px-5 py-4 shadow-sm hover:border-emerald-500/30 hover:shadow-md transition-all group"
            >
              <div className="flex flex-col gap-1 text-left">
                <span className="text-xs font-bold text-gray-950 group-hover:text-emerald-700">
                  {b.name}
                </span>
                <span className="font-mono text-[9px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full max-w-max">
                  Route Active
                </span>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-emerald-600" />
            </Link>
          ))}
        </div>
      </section>

      {/* 5. Unserved Draft Boroughs Disclosure */}
      <section className="mt-16 border-t border-gray-100 pt-12" aria-labelledby="draft-boroughs-title">
        <div className="flex flex-col gap-2 max-w-2xl text-left mb-6">
          <h2 id="draft-boroughs-title" className="font-sans text-lg font-bold text-gray-950">
            Postcode and Borough Boundary Verification
          </h2>
          <p className="text-xs text-gray-600 leading-relaxed">
            In compliance with strict consumer guidelines, we do not claim direct operational presence in boroughs where we do not maintain physical staffed offices or active daily technician patrol loops. The following boroughs inside Greater London are currently out-of-bounds for standard same-day residential bookings:
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 text-left">
          {draftBoroughs.map((b) => (
            <div key={b.slug} className="rounded-xl border border-dashed border-gray-200 bg-gray-50/50 px-4 py-3 text-xs font-semibold text-gray-500 flex items-center justify-between">
              <span>{b.name}</span>
              <span className="text-[9px] font-bold text-gray-400 uppercase">Out of limits</span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

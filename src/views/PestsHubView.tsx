/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { updatePageMetadata, Link } from '../lib/router';
import { siteSettings } from '../data/business';
import { pestsList } from '../data/pests';
import { Search, ShieldAlert, BadgeInfo, CheckCircle } from 'lucide-react';

export default function PestsHubView() {
  const pageTitle = "Greater London Pest Directory | Extermination Guides & Advice";
  const pageDesc = "Identify and research structural pests in Greater London. Complete professional guides on lifecycles, risks, and treatments.";
  const canonicalUrl = `https://${siteSettings.domain}/pests`;

  const [activeTab, setActiveTab] = useState<'all' | 'rodents' | 'insects' | 'wildlife'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    updatePageMetadata(pageTitle, pageDesc, canonicalUrl);
  }, []);

  const getPestCategory = (slug: string) => {
    if (['rats', 'mice'].includes(slug)) return 'Rodents';
    if (['pigeons'].includes(slug)) return 'Birds';
    if (['grey-squirrels', 'foxes'].includes(slug)) return 'Wildlife';
    return 'Insects';
  };

  const isHighRisk = (slug: string) => {
    return ['rats', 'mice', 'cockroaches', 'bed-bugs', 'wasps', 'hornets'].includes(slug);
  };

  // Filter list based on state
  const filteredPests = pestsList.filter((pest) => {
    const category = getPestCategory(pest.slug);
    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'rodents' && category === 'Rodents') ||
      (activeTab === 'insects' && category === 'Insects') ||
      (activeTab === 'wildlife' && (category === 'Birds' || category === 'Wildlife'));

    const matchesSearch =
      pest.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pest.summary.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 text-left" id="pests-hub-page">
      
      {/* 1. Header Intro */}
      <div className="flex flex-col gap-4 max-w-3xl">
        <div className="inline-flex max-w-max items-center gap-1.5 rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-bold text-emerald-800">
          <ShieldAlert className="h-4 w-4 text-emerald-600" />
          <span>Formally Approved Scientific Pest Directory</span>
        </div>
        <h1 className="font-sans text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl">
          Greater London Pest Library
        </h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          Research UK structural pests, their lifecycles, health risk factors, and compliant professional eradication methodologies. We strictly distinguish between actively treated pests and protected species.
        </p>
      </div>

      {/* 2. Controls & Search */}
      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 pb-6">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Pest Categories">
          {(['all', 'rodents', 'insects', 'wildlife'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              role="tab"
              aria-selected={activeTab === tab}
              className={`rounded-lg px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === tab
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full max-w-xs">
          <input
            type="text"
            placeholder="Search pest index..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-2.5 pl-10 text-xs font-semibold text-gray-900 focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600/15"
          />
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* 3. Pests Grid */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPests.map((pest) => {
          const isTreatable = pest.status === 'active';
          const category = getPestCategory(pest.slug);
          const highRisk = isHighRisk(pest.slug);
          return (
            <div
              key={pest.slug}
              className={`flex flex-col justify-between rounded-2xl border p-6 transition-all ${
                isTreatable
                  ? 'border-gray-100 bg-white hover:border-emerald-500/30 hover:shadow-lg'
                  : 'border-dashed border-gray-200 bg-gray-50/50'
              }`}
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                    {category}
                  </span>
                  
                  {isTreatable ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
                      <CheckCircle className="h-3 w-3 stroke-[2.5]" />
                      <span>Actively Treated</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full">
                      <BadgeInfo className="h-3 w-3" />
                      <span>Info / Protected</span>
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5 text-left">
                  <h2 className="font-sans text-xl font-bold tracking-tight text-gray-950">
                    {pest.title}
                  </h2>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed mt-1">
                  {pest.summary}
                </p>

                {/* Risk Ratings Summary */}
                <div className="grid grid-cols-2 gap-2 bg-gray-50 p-3 rounded-xl text-[10px] font-semibold text-gray-700 border border-gray-100">
                  <div className="flex items-center justify-between">
                    <span>Health Risk:</span>
                    <span className={highRisk ? 'text-red-600 font-extrabold' : 'text-amber-600 font-extrabold'}>
                      {highRisk ? 'High' : 'Medium'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Damage Risk:</span>
                    <span className={highRisk ? 'text-red-600 font-extrabold' : 'text-amber-600 font-extrabold'}>
                      {highRisk ? 'High' : 'Medium'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">
                  HSE Compliant
                </span>
                {isTreatable ? (
                  <Link
                    href={`/pests/${pest.slug}`}
                    className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-700 shadow-sm"
                  >
                    Extermination Guide &rarr;
                  </Link>
                ) : (
                  <span className="text-xs font-semibold text-gray-400 italic">
                    Protected under UK Law
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Protected Species Notice */}
      <div className="mt-12 rounded-2xl bg-amber-50/60 border border-amber-100 p-6 flex flex-col gap-3">
        <h3 className="font-sans text-sm font-bold text-amber-900 uppercase tracking-wider flex items-center gap-2">
          <BadgeInfo className="h-5 w-5 text-amber-600 shrink-0" />
          <span>Note on Protected Wildlife and Bees</span>
        </h3>
        <p className="text-xs text-amber-950 leading-relaxed">
          Some species listed in our index, such as Honey Bees (Apis mellifera) and certain bats, are ecologically vital or strictly protected under the Wildlife and Countryside Act 1981. Greater London Pest Control does not offer extermination services for honey bees; instead, we refer requests to certified local beekeepers for live swarm extraction and relocation.
        </p>
      </div>

    </div>
  );
}

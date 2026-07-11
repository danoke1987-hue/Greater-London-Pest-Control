/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { updatePageMetadata, Link } from '../lib/router';
import { siteSettings } from '../data/business';
import { adviceArticles } from '../data/editorial';
import QuoteForm from '../components/QuoteForm';
import { BookOpen, HelpCircle, CheckCircle, ArrowRight, User, Clock, AlertCircle } from 'lucide-react';

interface AdviceViewProps {
  slug?: string;
}

export default function AdviceView({ slug }: AdviceViewProps) {
  const [selectedCluster, setSelectedCluster] = useState<'all' | string>('all');

  // 1. DETAIL VIEW FOR AN ADVICE ARTICLE
  if (slug) {
    const article = adviceArticles.find((a) => a.slug === slug);

    if (!article) {
      return (
        <div className="mx-auto max-w-7xl px-4 py-24 text-center">
          <h1 className="text-2xl font-bold text-gray-950">Article Not Found</h1>
          <p className="text-gray-600 mt-2">The requested pest advice article could not be located in our database.</p>
          <Link href="/advice" className="mt-4 inline-block text-emerald-600 font-bold underline">
            Return to Advice Centre
          </Link>
        </div>
      );
    }

    const pageTitle = article.seoTitle;
    const pageDesc = article.metaDescription;

    useEffect(() => {
      updatePageMetadata(pageTitle, pageDesc, `https://${siteSettings.domain}/advice/${article.slug}`);
    }, [article]);

    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 text-left" id={`advice-detail-${article.slug}`}>
        
        {/* Header Breadcrumbs & Titles */}
        <div className="border-b border-gray-100 pb-8">
          <nav className="flex text-xs font-semibold text-gray-400 gap-1.5 mb-4">
            <Link href="/" className="hover:text-gray-600">Home</Link>
            <span>/</span>
            <Link href="/advice" className="hover:text-gray-600">Advice Centre</Link>
            <span>/</span>
            <span className="text-gray-600">{article.title}</span>
          </nav>
          
          <div className="flex flex-col gap-3 max-w-4xl">
            <div className="inline-flex max-w-max items-center gap-1.5 rounded bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
              <BookOpen className="h-3.5 w-3.5 animate-pulse" />
              <span>Expert Advice &bull; {article.topicCluster}</span>
            </div>
            <h1 className="font-sans text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl md:text-5xl leading-tight">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 font-semibold mt-2">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4 text-emerald-600" />
                <span>By {article.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-emerald-600" />
                <span>Reading Time: {article.readingTime}</span>
              </div>
              <div>
                <span>Last Reviewed: {article.lastReviewed}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Article Details Grid */}
        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12">
          
          {/* Left Column Content (8 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            
            {/* Table of Contents headings indexes */}
            <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-5 text-left flex flex-col gap-3">
              <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-gray-500">
                Inside This Article (Table of Contents)
              </h3>
              <ul className="flex flex-col gap-2 text-xs font-bold text-emerald-800" role="list">
                {article.headings.map((heading, idx) => (
                  <li key={idx}>
                    <span className="text-gray-400 font-mono text-[10px] mr-1.5">0{idx + 1}</span>
                    <span>{heading.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Main content block */}
            <article className="prose prose-sm prose-emerald text-gray-700 leading-relaxed max-w-none text-xs sm:text-sm flex flex-col gap-5">
              {article.content.split('\n\n').map((paragraph, idx) => {
                if (paragraph.startsWith('###')) {
                  return (
                    <h3 key={idx} className="font-sans text-lg font-bold text-gray-950 mt-4 border-l-4 border-emerald-500 pl-3">
                      {paragraph.replace('###', '').trim()}
                    </h3>
                  );
                }
                if (paragraph.startsWith('1.') || paragraph.startsWith('-')) {
                  const items = paragraph.split('\n');
                  return (
                    <ul key={idx} className="list-inside list-disc flex flex-col gap-1.5 pl-2">
                      {items.map((item, itemIdx) => (
                        <li key={itemIdx}>{item.replace(/^[-1.]\s*/, '').trim()}</li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={idx} className="leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}
            </article>

            {/* Legal Disclaimer (Mandatory) */}
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-5 flex gap-3.5 items-start text-xs text-gray-500 leading-relaxed">
              <AlertCircle className="h-5 w-5 text-gray-400 shrink-0 mt-0.5" />
              <div className="flex flex-col gap-1">
                <span className="font-bold text-gray-700">General Information Disclaimer</span>
                <p>
                  The content of this advice article is provided for general informational guidelines and education purposes only. It does not constitute formal legal, municipal, or professional pest-control advice. Renters, tenants, and property owners seeking specific legal rulings should consult Citizens Advice, their local borough council's Environmental Health department, or a qualified housing solicitor.
                </p>
              </div>
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

  // 2. HUB VIEW FOR ADVICE ARTICLES DIRECTORY
  const pageTitle = "Expert Pest Advice & Prevention Centre | GLPC London";
  const pageDesc = "Read expert, science-backed advice on detecting and preventing rats, mice, bed bugs, and other structural pests in Greater London.";
  const canonicalUrl = `https://${siteSettings.domain}/advice`;

  useEffect(() => {
    updatePageMetadata(pageTitle, pageDesc, canonicalUrl);
  }, []);

  const clusters = ['all', 'RODENTS', 'BED BUGS', 'LANDLORDS AND TENANTS'];

  const filteredArticles = adviceArticles.filter(
    (a) => selectedCluster === 'all' || a.topicCluster === selectedCluster
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 text-left" id="advice-hub-page">
      
      {/* Header Intro */}
      <div className="flex flex-col gap-4 max-w-3xl">
        <div className="inline-flex max-w-max items-center gap-1.5 rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-bold text-emerald-800">
          <BookOpen className="h-4 w-4 text-emerald-600" />
          <span>Accredited Greater London Educational Resource</span>
        </div>
        <h1 className="font-sans text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl">
          Pest Control & Prevention Advice Centre
        </h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          Access our scientific guides, biological profiles, and legal accountability checklists compiled by RSPH Level 2 qualified field biologists.
        </p>
      </div>

      {/* Cluster Tabs */}
      <div className="mt-10 flex flex-wrap gap-1.5 border-b border-gray-100 pb-6" role="tablist" aria-label="Topic Clusters">
        {clusters.map((cluster) => (
          <button
            key={cluster}
            onClick={() => setSelectedCluster(cluster)}
            role="tab"
            aria-selected={selectedCluster === cluster}
            className={`rounded-lg px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all ${
              selectedCluster === cluster
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            {cluster === 'all' ? 'All Clusters' : cluster}
          </button>
        ))}
      </div>

      {/* Articles List Directory */}
      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
        {filteredArticles.map((art) => (
          <div key={art.slug} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm flex flex-col justify-between hover:border-emerald-500/30 hover:shadow-lg transition-all group text-left">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded">
                  {art.topicCluster}
                </span>
                <span className="flex items-center gap-1 text-[10px] text-gray-400 font-semibold">
                  <Clock className="h-3.5 w-3.5 text-emerald-600" />
                  <span>{art.readingTime} read</span>
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <h2 className="font-sans text-xl font-bold tracking-tight text-gray-950 group-hover:text-emerald-700 transition-colors">
                  {art.title}
                </h2>
                <p className="text-xs text-gray-600 leading-relaxed mt-1.5 line-clamp-3">
                  {art.summary}
                </p>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[10px] text-gray-400 font-semibold italic">
                Reviewed: {art.lastReviewed}
              </span>
              <Link
                href={`/advice/${art.slug}`}
                className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-700 shadow-sm"
              >
                <span>Read Full Article</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

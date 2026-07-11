/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { checkPostcodeCoverage, PostcodeCheckResult } from '../lib/postcode';
import { trackEvent } from '../lib/analytics';
import { Link } from '../lib/router';
import { siteSettings } from '../data/business';
import { Search, MapPinCheck, MapPinX, AlertCircle, Phone, ArrowRight } from 'lucide-react';

export default function PostcodeChecker() {
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState<PostcodeCheckResult | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const res = checkPostcodeCoverage(inputValue);
    setResult(res);

    // Track analytics event safely (do NOT transmit the personal full postcode!)
    // We only log the matched outward district or 'invalid' status.
    trackEvent({
      event: 'postcode_check',
      postcode_district: res.outwardCode || 'none',
      result_status: res.status,
    });

    // Move focus to the results block for accessibility screen readers
    setTimeout(() => {
      resultRef.current?.focus();
    }, 100);
  };

  return (
    <div className="w-full rounded-2xl border border-gray-100 bg-white p-6 shadow-xl shadow-gray-100/40 sm:p-8" id="postcode-checker-container">
      <div className="flex flex-col gap-2">
        <h3 className="font-sans text-lg font-bold tracking-tight text-gray-950 sm:text-xl">
          Check Your Area Coverage
        </h3>
        <p className="text-sm text-gray-600">
          Enter your full UK postcode to verify active same-day technician availability in your London neighborhood.
        </p>
      </div>

      <form onSubmit={handleCheck} className="mt-5 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <label htmlFor="coverage-postcode-input" className="sr-only">
            UK Postcode (e.g. SE1 1NP)
          </label>
          <input
            id="coverage-postcode-input"
            type="text"
            required
            placeholder="e.g. SE1 1NP"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4.5 py-3.5 pl-11 text-sm font-semibold text-gray-900 transition-all placeholder:text-gray-400 focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-3 focus:ring-emerald-600/15"
          />
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 stroke-[2.2]" />
        </div>
        <button
          type="submit"
          className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-emerald-600/10 transition-all hover:bg-emerald-700 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-600 active:scale-98"
        >
          <span>Verify Coverage</span>
        </button>
      </form>

      {/* Accessible Result Zone (aria-live to announce updates) */}
      <div
        ref={resultRef}
        id="postcode-check-result"
        tabIndex={-1}
        aria-live="polite"
        className="mt-6 focus:outline-none"
      >
        {result && (
          <div
            className={`rounded-xl p-5 border flex flex-col sm:flex-row sm:items-start gap-4 ${
              result.status === 'confirmed'
                ? 'bg-emerald-50/65 border-emerald-100 text-emerald-950'
                : result.status === 'partial'
                ? 'bg-amber-50/65 border-amber-100 text-amber-950'
                : result.status === 'outside'
                ? 'bg-gray-50 border-gray-100 text-gray-900'
                : 'bg-red-50/65 border-red-100 text-red-950'
            }`}
          >
            {/* Visual Icon */}
            <div className="shrink-0">
              {result.status === 'confirmed' ? (
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-sm shadow-emerald-600/10">
                  <MapPinCheck className="h-5.5 w-5.5 stroke-[2.2]" />
                </div>
              ) : result.status === 'partial' ? (
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-amber-600 text-white shadow-sm">
                  <AlertCircle className="h-5.5 w-5.5 stroke-[2.2]" />
                </div>
              ) : result.status === 'outside' ? (
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-500 text-white shadow-sm">
                  <MapPinX className="h-5.5 w-5.5 stroke-[2.2]" />
                </div>
              ) : (
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-red-600 text-white shadow-sm">
                  <AlertCircle className="h-5.5 w-5.5 stroke-[2.2]" />
                </div>
              )}
            </div>

            {/* Explanatory content */}
            <div className="flex-1 flex flex-col gap-3.5">
              <div className="flex flex-col gap-1">
                <span className="font-sans text-sm font-bold uppercase tracking-wider text-gray-500">
                  Result Status
                </span>
                <p className="text-[14px] font-semibold leading-relaxed">
                  {result.message}
                </p>
              </div>

              {/* Dynamic Action CTAs based on status */}
              {result.status === 'confirmed' && (
                <div className="flex flex-wrap gap-2.5 pt-1">
                  <Link
                    href={`/postcodes/${result.outwardCode}`}
                    className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-emerald-700"
                  >
                    <span>View Area Guide</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <Link
                    href="/request-a-quote"
                    className="flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-white px-4 py-2.5 text-xs font-bold text-emerald-800 hover:bg-emerald-50"
                  >
                    <span>Request Visit</span>
                  </Link>
                </div>
              )}

              {result.status === 'partial' && (
                <div className="flex flex-wrap gap-2.5 pt-1">
                  <a
                    href={`tel:${siteSettings.standardPhone.replace(/\s+/g, '')}`}
                    className="flex items-center gap-1.5 rounded-lg bg-amber-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-amber-700"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    <span>Call CS to Verify</span>
                  </a>
                  <Link
                    href="/request-a-quote"
                    className="flex items-center gap-1.5 rounded-lg border border-amber-200 bg-white px-4 py-2.5 text-xs font-bold text-amber-900 hover:bg-amber-50"
                  >
                    <span>Send Quote Request</span>
                  </Link>
                </div>
              )}

              {result.status === 'outside' && (
                <div className="flex flex-col gap-2 pt-1 text-xs text-gray-500 leading-relaxed">
                  <p>
                    Although we are unable to serve your postcode directly, you can browse our primary regions inside the M25 to see our operational map limits.
                  </p>
                  <div>
                    <Link href="/areas" className="font-bold text-emerald-700 hover:underline">
                      View Service Map Limits &rarr;
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

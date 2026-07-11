/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { updatePageMetadata, Link } from '../lib/router';
import { siteSettings, accreditations, customerReviews } from '../data/business';
import { activeServices } from '../data/services';
import { activeBoroughs } from '../data/locations';
import PostcodeChecker from '../components/PostcodeChecker';
import { ShieldCheck, Truck, Clock, Award, Phone, Check, ChevronRight } from 'lucide-react';

export default function HomeView() {
  const pageTitle = "Professional Pest Control Greater London | BPCA Accredited GLPC";
  const pageDesc = "Accredited, certified pest control services in Greater London. Safe, fast-acting treatments with 20-year structural proofing guarantees. Inquire today.";
  const canonicalUrl = `https://${siteSettings.domain}/`;

  useEffect(() => {
    updatePageMetadata(pageTitle, pageDesc, canonicalUrl);
  }, []);

  return (
    <div className="flex flex-col gap-16 md:gap-24" id="home-view-page">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-16 sm:py-24" aria-labelledby="hero-main-title">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            <div className="inline-flex max-w-max items-center gap-2 rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-bold text-emerald-800">
              <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600" />
              <span>Greater London's Premier Exterminator & Proofing Specialist</span>
            </div>
            
            <h1 id="hero-main-title" className="font-sans text-4xl font-extrabold tracking-tight text-gray-950 sm:text-5xl lg:text-6xl leading-[1.1]">
              Scientific Pest Control <br />
              <span className="text-emerald-600">With Structural Warranties</span>
            </h1>
            
            <p className="text-base text-gray-600 sm:text-lg leading-relaxed max-w-2xl">
              We resolve active infestations inside Greater London homes and commercial premises using certified RSPH Level 2 field biologists. Backed by permanent structural sealing to guarantee pests do not return.
            </p>

            {/* Accreditations Trust Grid */}
            <div className="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-4 border-y border-gray-100 py-6">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 font-bold text-xs shrink-0">
                  BPCA
                </div>
                <span className="text-[11px] font-bold text-gray-700 leading-tight">Member<br />Registered</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 font-bold text-xs shrink-0">
                  NPTA
                </div>
                <span className="text-[11px] font-bold text-gray-700 leading-tight">National<br />Accredited</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 font-bold text-xs shrink-0">
                  RSPH2
                </div>
                <span className="text-[11px] font-bold text-gray-700 leading-tight">Biologist<br />Qualified</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 font-bold text-xs shrink-0">
                  CEPA
                </div>
                <span className="text-[11px] font-bold text-gray-700 leading-tight">Certified<br />Excellence</span>
              </div>
            </div>

            {/* Quick trust bullet list */}
            <ul className="flex flex-col gap-2.5 text-sm font-semibold text-gray-700" role="list">
              <li className="flex items-center gap-2">
                <Check className="h-4.5 w-4.5 text-emerald-600 stroke-[2.5]" />
                <span>No grotesque close-up pest imagery (Certified Clean Layout)</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4.5 w-4.5 text-emerald-600 stroke-[2.5]" />
                <span>CCTV Sewer and Cavity Investigation on Rats / Rodents</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4.5 w-4.5 text-emerald-600 stroke-[2.5]" />
                <span>Up to 20-Year Structural Proofing and Exclusion Guarantee</span>
              </li>
            </ul>
          </div>

          {/* Right Column: Dynamic Postcode Checker & Emergency Panel */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <PostcodeChecker />
            
            <div className="rounded-2xl bg-gray-950 p-6 text-white flex flex-col gap-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600">
                  <Clock className="h-5 w-5 stroke-[2.2]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-mono font-bold tracking-wider text-red-500 uppercase">
                    Urgent Out-of-Hours
                  </span>
                  <span className="text-base font-bold text-white">
                    EmergencySame-Day Response
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                We maintain active technician patrols inside the M25 ready to respond within 2-3 hours for active rats, swarms, or commercial audit hazards.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <a
                  href={`tel:${siteSettings.emergencyPhone.replace(/\s+/g, '')}`}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 py-3 text-center text-xs font-bold text-white hover:bg-red-700 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  <span>Call Emergency 24H Line</span>
                </a>
                <Link
                  href="/request-a-quote"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-800 bg-gray-900 py-3 text-center text-xs font-bold text-gray-300 hover:text-white"
                >
                  <span>Request Online Quote</span>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Professional Credentials / Accreditations Slider */}
      <section className="bg-gray-50/70 border-y border-gray-100 py-10" aria-label="Professional Accreditations">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-6">
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-gray-500">
            Our Formally Approved Licenses and Memberships
          </span>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-85">
            {accreditations.map((acc) => (
              <div key={acc.id} className="flex items-center gap-2.5 bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-xs">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-800 font-extrabold text-xs">
                  ★
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-gray-900">{acc.name}</span>
                  <span className="text-[10px] text-gray-500 font-medium">HSE Compliant</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Core Treatments & Services Hub */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-labelledby="services-hub-title">
        <div className="text-center flex flex-col items-center gap-3">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-700">
            Our Primary Extermination Services
          </span>
          <h2 id="services-hub-title" className="font-sans text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl">
            Acreddited Structural Treatment Programs
          </h2>
          <p className="text-sm text-gray-600 max-w-2xl">
            We provide specialized, biologist-supervised eradication services across London. Select a service below to review visit schedules, preparation guidelines, and fixed pricing.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {activeServices.map((service) => (
            <div key={service.slug} className="flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:border-emerald-500/30 hover:shadow-lg transition-all group">
              <div className="flex flex-col gap-4 text-left">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 font-bold group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <Award className="h-6 w-6 stroke-[2.2]" />
                </div>
                <h3 className="font-sans text-lg font-bold tracking-tight text-gray-950">
                  {service.title}
                </h3>
                <p className="text-xs leading-relaxed text-gray-600">
                  {service.summary}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-800">
                  BPCA Qualified
                </span>
                <Link href={`/services/${service.slug}`} className="flex items-center gap-1 text-xs font-bold text-gray-900 group-hover:text-emerald-700">
                  <span>Full Guide</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Why Choose GLPC section */}
      <section className="bg-gray-50/50 py-16 sm:py-24" aria-labelledby="why-glpc-title">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 flex flex-col gap-6 text-left">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-700">
              The GLPC Scientific Advantage
            </span>
            <h2 id="why-glpc-title" className="font-sans text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl leading-tight">
              Eradication Backed by Physical Engineering
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Standard pest controllers rely exclusively on repeating toxic bait placement. This fails for rodents, who return via structural defects once baits disappear. We solve the structural root cause.
            </p>

            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-emerald-700 shadow-xs shrink-0">
                  <Truck className="h-5 w-5" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold text-gray-950">Discreet Unbranded Fleet</span>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Our technical support vehicles operate unbranded to protect your family or business reputation.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-emerald-700 shadow-xs shrink-0">
                  <Clock className="h-5 w-5" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold text-gray-950">Biologist Scheduled Visits</span>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Every follow-up is scheduled with a dedicated, RSPH Level 2 qualified entomologist.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 text-left">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="font-sans text-sm font-bold text-gray-900 uppercase tracking-wider">
                1. Full Structural Sealing
              </h3>
              <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                We block structural holes, expansion joints, wall gaps, and floor entry ports using steel mesh, cement, and high-performance poly-mastics to isolate your property.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="font-sans text-sm font-bold text-gray-900 uppercase tracking-wider">
                2. CCTV Sewer Diagnostics
              </h3>
              <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                80% of urban London rat problems enter via defective sub-floor sewer lines. Our high-tech cameras locate structural pipe damage to seal entries permanently.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="font-sans text-sm font-bold text-gray-900 uppercase tracking-wider">
                3. Zero Toxic Chemical Overuse
              </h3>
              <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                We prioritize safe, targeted traps, superheated dry steam, and biological exclusion, protecting your pets, employees, and interior spaces.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="font-sans text-sm font-bold text-gray-900 uppercase tracking-wider">
                4. Up to 20-Year Warranties
              </h3>
              <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                All structural exclusion work completed by our surveyors is fully guaranteed. If pests bypass our seals, we re-treat and re-seal completely free.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Customer Testimonials */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Customer Reviews">
        <div className="text-center flex flex-col items-center gap-3">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-700">
            Verified Reviews from London Clients
          </span>
          <h2 className="font-sans text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl">
            What Our Customers Say
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 text-left">
          {customerReviews.map((review) => (
            <div key={review.id} className="flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-xs">
              <div className="flex flex-col gap-4">
                <div className="text-amber-500 font-bold text-sm tracking-wide">
                  {"★".repeat(review.rating)}
                </div>
                <p className="text-xs italic leading-relaxed text-gray-600">
                  "{review.content}"
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between text-xs font-semibold">
                <span className="text-gray-900">{review.author}</span>
                <span className="text-emerald-700 font-mono text-[10px] uppercase">{review.locationSlug}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Active Borough Links Directory */}
      <section className="bg-gray-900 py-16 text-white text-left" aria-labelledby="boroughs-dir-title">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
          <div className="flex flex-col gap-2 max-w-2xl">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-400">
              Approved Greater London Coverage Directory
            </span>
            <h2 id="boroughs-dir-title" className="font-sans text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Actively Served Boroughs Inside the M25
            </h2>
            <p className="text-xs text-gray-400">
              We operate exclusively in specific London boroughs with genuine technician presence. Select your borough below to read localized pest trends and municipal rules.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {activeBoroughs.map((b) => (
              <Link
                key={b.slug}
                href={`/boroughs/${b.slug}`}
                className="flex items-center justify-between rounded-xl border border-gray-800 bg-gray-950 px-4.5 py-3.5 transition-all hover:border-emerald-500/40 hover:bg-gray-900 text-xs font-bold text-gray-200 hover:text-white"
              >
                <span>{b.name}</span>
                <ChevronRight className="h-4 w-4 text-emerald-500" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from '../lib/router';
import { siteSettings, businessDetails } from '../data/business';
import { Shield, Mail, Phone, MapPin, CheckCircle } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const primaryServices = [
    { href: '/services/mouse-control', label: 'Mouse Control' },
    { href: '/services/rat-control', label: 'Rat Control & Sewers' },
    { href: '/services/bed-bug-treatment', label: 'Bed Bug Heat Steam' },
    { href: '/services/wasp-control', label: 'Wasp & Hornet Nest' },
    { href: '/services/commercial-contracts', label: 'Commercial Contracts' },
    { href: '/services/emergency-pest-control', label: 'Emergency Response' },
  ];

  const majorPests = [
    { href: '/pests/rats', label: 'Brown & Black Rats' },
    { href: '/pests/mice', label: 'House Mice' },
    { href: '/pests/bed-bugs', label: 'Resilient Bed Bugs' },
    { href: '/pests/cockroaches', label: 'German Cockroaches' },
    { href: '/pests/wasps', label: 'Wasps & Hornets' },
    { href: '/pests/pigeons', label: 'Feral Pigeons' },
  ];

  const regionHubs = [
    { href: '/areas', label: 'Greater London (M25)' },
    { href: '/locations/london-bridge', label: 'London Bridge (HQ)' },
    { href: '/locations/hampstead', label: 'Hampstead (Camden)' },
  ];

  const companyLinks = [
    { href: '/about', label: 'About Us' },
    { href: '/how-it-works', label: 'How It Works' },
    { href: '/pest-control-prices', label: 'Pricing Guide' },
    { href: '/case-studies', label: 'Case Studies' },
    { href: '/reviews', label: 'Customer Reviews' },
    { href: '/our-technicians', label: 'Our Technicians' },
    { href: '/accreditations', label: 'Accreditations' },
  ];

  const policyLinks = [
    { href: '/privacy-policy', label: 'Privacy Policy' },
    { href: '/cookie-policy', label: 'Cookie Policy' },
    { href: '/terms-and-conditions', label: 'Terms & Conditions' },
    { href: '/complaints-procedure', label: 'Complaints Procedure' },
    { href: '/accessibility-statement', label: 'Accessibility Statement' },
    { href: '/sitemap', label: 'XML Site Directory' },
  ];

  return (
    <footer className="border-t border-gray-100 bg-gray-950 text-gray-400 py-16 sm:py-20" id="main-footer">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top section: Brand & Credentials */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4 border-b border-gray-800 pb-12">
          <div className="lg:col-span-1 flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-500" id="footer-logo-link">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-white">
                <Shield className="h-6 w-6 stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <span className="font-sans text-lg font-bold tracking-tight text-white sm:text-xl">
                  GLPC
                </span>
                <span className="font-mono text-[9px] font-bold tracking-wider text-emerald-500 uppercase">
                  Greater London
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              Professional, BPCA-accredited structural pest control services across Greater London. Specialising in safe, guaranteed residential, commercial, and landlord treatments inside the M25 boundary.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <CheckCircle className="h-4 w-4" />
              <span>£10M Public Liability Insured</span>
            </div>
          </div>

          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm">
            <div className="flex flex-col gap-4">
              <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-white">
                Operating HQ (Staffed)
              </h3>
              <div className="flex items-start gap-2.5">
                <MapPin className="h-5 w-5 text-emerald-500 shrink-0" />
                <span className="leading-relaxed">
                  {businessDetails.mainOffice.name}<br />
                  {businessDetails.mainOffice.addressLine1}<br />
                  {businessDetails.mainOffice.city}, {businessDetails.mainOffice.postcode}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-white">
                Depot (Unstaffed Hub)
              </h3>
              <div className="flex items-start gap-2.5">
                <MapPin className="h-5 w-5 text-emerald-500 shrink-0" />
                <span className="leading-relaxed">
                  {businessDetails.additionalDepots[0].name}<br />
                  {businessDetails.additionalDepots[0].addressLine1}<br />
                  {businessDetails.additionalDepots[0].city}, {businessDetails.additionalDepots[0].postcode}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-white">
                Contact Enquiries
              </h3>
              <div className="flex flex-col gap-2.5">
                <a href={`tel:${siteSettings.standardPhone.replace(/\s+/g, '')}`} className="flex items-center gap-2 hover:text-white transition-colors">
                  <Phone className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>CS: {siteSettings.standardPhone}</span>
                </a>
                <a href={`tel:${siteSettings.emergencyPhone.replace(/\s+/g, '')}`} className="flex items-center gap-2 font-bold text-red-400 hover:text-red-300 transition-colors">
                  <Phone className="h-4 w-4 shrink-0" />
                  <span>24H: {siteSettings.emergencyPhone}</span>
                </a>
                <a href={`mailto:${siteSettings.email}`} className="flex items-center gap-2 hover:text-white transition-colors">
                  <Mail className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span className="break-all">{siteSettings.email}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Middle section: Navigation Links */}
        <div className="grid grid-cols-2 gap-8 py-12 sm:grid-cols-4 text-sm border-b border-gray-800">
          <div className="flex flex-col gap-4">
            <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-white">
              Pest Extermination
            </h4>
            <ul className="flex flex-col gap-2.5">
              {majorPests.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-white">
              Primary Treatments
            </h4>
            <ul className="flex flex-col gap-2.5">
              {primaryServices.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-white">
              Coverage Regions
            </h4>
            <ul className="flex flex-col gap-2.5">
              {regionHubs.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-white">
              Company & Services
            </h4>
            <ul className="flex flex-col gap-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom section: Legal & Regulatory disclaimers */}
        <div className="flex flex-col gap-6 py-12 text-xs md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2 max-w-2xl">
            <p>
              &copy; {currentYear} {businessDetails.legalName}. All rights reserved.
            </p>
            <p className="text-gray-500 leading-relaxed">
              Company Registration Number: {businessDetails.registrationNumber} (England & Wales). VAT Registration: {businessDetails.vatNumber}. Registered staffed office: {businessDetails.mainOffice.addressLine1}, {businessDetails.mainOffice.city}, {businessDetails.mainOffice.postcode}. GLPC acts as a single service-area business operating within the M25 boundary, utilizing BPCA certified and RSPH Level 2 qualified field technicians. All chemical applications comply fully with UK HSE rules.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-gray-500">
            {policyLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-gray-400 underline transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}

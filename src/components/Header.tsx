/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Link, useRouter } from '../lib/router';
import { trackEvent } from '../lib/analytics';
import { siteSettings } from '../data/business';
import { Shield, Phone, MessageSquare, Menu, X, ArrowRight } from 'lucide-react';

export default function Header() {
  const { pathname } = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handlePhoneClick = () => {
    trackEvent({ event: 'phone_click', phone_number: siteSettings.standardPhone, location_context: 'header' });
  };

  const navLinks = [
    { href: '/pests', label: 'Pests' },
    { href: '/services', label: 'Services' },
    { href: '/areas', label: 'Areas' },
    { href: '/residential-pest-control', label: 'Residential' },
    { href: '/commercial-pest-control', label: 'Commercial' },
    { href: '/landlord-pest-control', label: 'Landlords & Managers' },
    { href: '/advice', label: 'Advice Centre' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur-sm" id="main-header">
      {/* Skip Link for accessibility */}
      <a
        href="#main-content"
        className="absolute left-4 top-4 z-100 -translate-y-16 bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-transform focus:translate-y-0"
      >
        Skip to main content
      </a>

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-600 focus-visible:outline-offset-2" id="header-logo-link">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm shadow-emerald-600/10">
            <Shield className="h-6 w-6 stroke-[2.2]" />
          </div>
          <div className="flex flex-col">
            <span className="font-sans text-lg font-bold tracking-tight text-gray-950 sm:text-xl">
              GLPC
            </span>
            <span className="font-mono text-[9px] font-semibold tracking-wider text-emerald-700 uppercase">
              Greater London
            </span>
          </div>
        </Link>

        {/* Desktop Navigation links */}
        <nav className="hidden lg:flex lg:items-center lg:gap-1.5" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-2 text-[14px] font-medium tracking-tight transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-600 ${
                  isActive
                    ? 'bg-emerald-50/70 text-emerald-800'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Quick Actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${siteSettings.standardPhone.replace(/\s+/g, '')}`}
            onClick={handlePhoneClick}
            className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-800 transition-all hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-600 active:scale-98"
            id="header-call-btn"
          >
            <Phone className="h-4 w-4 text-emerald-600 stroke-[2.5]" />
            <span>Call Now</span>
          </a>
          <Link
            href="/request-a-quote"
            className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4.5 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-600/10 transition-all hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-600 focus-visible:outline-offset-2 active:scale-98"
            id="header-quote-btn"
          >
            <span>Request Quote</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Mobile quick actions (Call, quote and hamburger toggle) */}
        <div className="flex items-center gap-1.5 lg:hidden">
          <a
            href={`tel:${siteSettings.standardPhone.replace(/\s+/g, '')}`}
            onClick={handlePhoneClick}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-100 bg-white text-gray-700 shadow-sm transition-all hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-600"
            aria-label="Call Customer Services Now"
          >
            <Phone className="h-5 w-5 text-emerald-600 stroke-[2.2]" />
          </a>
          <Link
            href="/request-a-quote"
            className="flex h-11 items-center justify-center rounded-xl bg-emerald-600 px-4 text-xs font-bold text-white shadow-sm transition-all hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-600"
            aria-label="Request a custom pest control quote"
          >
            Quote
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-100 bg-white text-gray-700 shadow-sm hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-600"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Accessible Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-20 z-40 bg-gray-900/60 backdrop-blur-xs lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
          id="mobile-menu-overlay"
        >
          <div
            className="absolute right-0 top-0 h-full w-full max-w-xs border-l border-gray-100 bg-white p-6 shadow-2xl transition-transform"
            onClick={(e) => e.stopPropagation()}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
          >
            <div className="flex flex-col gap-4">
              <span className="font-mono text-[10px] font-bold tracking-wider text-emerald-800 uppercase border-b border-gray-50 pb-2">
                Navigation Directory
              </span>
              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`rounded-lg px-4 py-3 text-sm font-semibold transition-all ${
                        isActive
                          ? 'bg-emerald-50 text-emerald-800'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-6 flex flex-col gap-3 border-t border-gray-100 pt-6">
                <a
                  href={`tel:${siteSettings.standardPhone.replace(/\s+/g, '')}`}
                  onClick={handlePhoneClick}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-3 text-sm font-bold text-gray-800"
                >
                  <Phone className="h-4 w-4 text-emerald-600 stroke-[2.2]" />
                  <span>Call {siteSettings.standardPhone}</span>
                </a>
                <Link
                  href="/request-a-quote"
                  className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-emerald-600 py-3 text-sm font-bold text-white shadow-md shadow-emerald-600/10"
                >
                  <span>Request Free Quote</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

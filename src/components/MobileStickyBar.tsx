/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from '../lib/router';
import { siteSettings } from '../data/business';
import { trackEvent } from '../lib/analytics';
import { Phone, FileText, MessageCircle } from 'lucide-react';

export default function MobileStickyBar() {
  const handlePhoneClick = () => {
    trackEvent({ event: 'phone_click', phone_number: siteSettings.standardPhone, location_context: 'sticky_bar' });
  };

  const handleWhatsappClick = () => {
    trackEvent({ event: 'whatsapp_click', location_context: 'sticky_bar' });
  };

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white/95 px-4 py-3 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] backdrop-blur-md md:hidden"
      id="mobile-sticky-bar"
    >
      <div className="mx-auto flex max-w-lg items-center justify-between gap-2.5">
        
        {/* Call Button */}
        <a
          href={`tel:${siteSettings.standardPhone.replace(/\s+/g, '')}`}
          onClick={handlePhoneClick}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3.5 text-center text-sm font-bold text-white shadow-sm transition-all active:scale-95"
          aria-label="Call Greater London Pest Control immediately"
          id="sticky-call-btn"
        >
          <Phone className="h-4.5 w-4.5" />
          <span>Call Now</span>
        </a>

        {/* WhatsApp Button (conditional) */}
        {siteSettings.whatsappNumber && (
          <a
            href={`https://wa.me/${siteSettings.whatsappNumber.replace('+', '')}?text=Hi%2C%20I%20have%20a%20pest%20control%20enquiry%20for%20Greater%20London`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsappClick}
            className="flex h-12.5 w-12.5 items-center justify-center rounded-xl border border-gray-200 bg-white text-emerald-600 transition-all active:scale-95"
            aria-label="Chat with our technicians on WhatsApp"
            id="sticky-whatsapp-btn"
          >
            <MessageCircle className="h-5.5 w-5.5 fill-emerald-600/5 stroke-[2]" />
          </a>
        )}

        {/* Request Quote Button */}
        <Link
          href="/request-a-quote"
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-900 bg-gray-900 py-3.5 text-center text-sm font-bold text-white shadow-sm transition-all active:scale-95"
          aria-label="Request a detailed pest control quote"
          id="sticky-quote-btn"
        >
          <FileText className="h-4.5 w-4.5" />
          <span>Request Quote</span>
        </Link>

      </div>
    </div>
  );
}

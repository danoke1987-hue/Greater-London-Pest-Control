/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

declare global {
  interface Window {
    dataLayer?: any[];
  }
}

export type AnalyticsEvent =
  | { event: 'phone_click'; phone_number: string; location_context?: string }
  | { event: 'quote_form_start' }
  | { event: 'quote_form_submit'; property_type: string; pest_type: string }
  | { event: 'whatsapp_click'; location_context?: string }
  | { event: 'email_click'; location_context?: string }
  | { event: 'service_page_cta'; service_slug: string; cta_type: string }
  | { event: 'location_page_cta'; location_slug: string; cta_type: string }
  | { event: 'postcode_check'; postcode_district: string; result_status: string }
  | { event: 'form_error'; error_field: string; error_message: string };

/**
 * Safely tracks a conversion or interaction event.
 * Avoids exposing any personal details to Google Tag Manager or other trackers.
 */
export function trackEvent(payload: AnalyticsEvent) {
  // Push to GTM dataLayer if present
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      ...payload,
      timestamp: new Date().toISOString(),
    });

    // Logging in development/preview console
    console.log(`[Analytics Event Tracked]:`, payload);
  }
}

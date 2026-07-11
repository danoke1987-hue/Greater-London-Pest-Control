/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { activePostcodes } from '../data/locations';

export interface PostcodeCheckResult {
  status: 'confirmed' | 'partial' | 'outside' | 'invalid';
  outwardCode?: string;
  postcodeArea?: string;
  boroughSlug?: string;
  message: string;
}

/**
 * Normalises and validates a UK postcode.
 * Returns the parsed outward code and a status indicator.
 */
export function checkPostcodeCoverage(rawPostcode: string): PostcodeCheckResult {
  const clean = rawPostcode.replace(/\s+/g, '').toUpperCase();

  // Basic UK Postcode regex validation
  // Formats: AN NAA, ANN NAA, AAN NAA, AANN NAA, ANA NAA, AANA NAA
  const ukPostcodeRegex = /^[A-Z]{1,2}[0-9][A-Z0-9]?([0-9][A-Z]{2})?$/;
  
  if (!ukPostcodeRegex.test(clean)) {
    return {
      status: 'invalid',
      message: 'Postcode format not recognised. Please enter a valid UK postcode (e.g. SE1 1NP).'
    };
  }

  // Extract outward code:
  // For a full UK postcode, the inward part is always the last 3 characters.
  // The outward part is everything before that.
  let outward = '';
  if (clean.length >= 5) {
    outward = clean.slice(0, -3);
  } else {
    // If the user only entered the outward part (e.g. "SE1")
    outward = clean;
  }

  // Find match in approved dataset
  const match = activePostcodes.find(p => p.outwardCode === outward);

  if (match) {
    if (match.isActivelyServed) {
      return {
        status: 'confirmed',
        outwardCode: outward,
        postcodeArea: match.postcodeArea,
        boroughSlug: match.relevantBorough,
        message: `Confirmed service area! We have active coverage in ${match.postcodeArea} (${outward}).`
      };
    } else if (match.isPartlyInsideM25) {
      return {
        status: 'partial',
        outwardCode: outward,
        postcodeArea: match.postcodeArea,
        boroughSlug: match.relevantBorough,
        message: `Partially covered area (${outward}). Contact us to confirm availability at your exact address.`
      };
    }
  }

  // If the outward area matches known outer sectors but isn't actively served
  // List of outward codes inside/near M25 we don't serve: e.g. WD1, EN1, DA1 etc if marked draft
  const innerLondonPrefixes = ['SE', 'SW', 'NW', 'EC', 'WC', 'W', 'N', 'E', 'BR', 'CR', 'DA', 'EN', 'HA', 'IG', 'KT', 'RM', 'SM', 'TW', 'UB', 'WD'];
  const prefix = outward.replace(/[0-9].*$/, '');
  
  if (innerLondonPrefixes.includes(prefix)) {
    return {
      status: 'outside',
      outwardCode: outward,
      message: `Outside our current active service boundaries. We focus on specific inner boroughs of Greater London inside the M25.`
    };
  }

  return {
    status: 'outside',
    message: 'Outside our current service area. We currently serve specific boroughs within Greater London and the M25 boundary.'
  };
}

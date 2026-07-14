/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SiteSetting {
  siteName: string;
  domain: string;
  emergencyPhone: string;
  standardPhone: string;
  whatsappNumber?: string;
  email: string;
  operatingHours: string;
  insuranceInfo: string;
  companyNumber: string;
  vatNumber?: string;
  googleSearchConsoleVerification?: string;
  googleTagManagerId?: string;
}

export interface OfficeLocation {
  name: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  postcode: string;
  isStaffed: boolean;
  phone?: string;
}

export interface Business {
  name: string;
  legalName: string;
  registrationNumber: string;
  vatNumber?: string;
  mainOffice: OfficeLocation;
  additionalDepots: OfficeLocation[];
  insuranceDetails: string;
  accreditations: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  qualifications: string[];
  biography?: string;
  imageUrl?: string;
  isVerified: boolean;
}

export interface Accreditation {
  id: string;
  name: string;
  issuer: string;
  verificationUrl?: string;
  logoUrl?: string;
  description: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface PriceItem {
  serviceName: string;
  category: string;
  priceFrom: string;
  basis: string; // e.g. "per treatment", "from", "guaranteed"
}

export interface ContentMetadata {
  slug: string;
  title: string;
  summary: string;
  status: 'active' | 'inactive' | 'draft';
  indexability: boolean;
  canonicalOverride?: string;
  createdDate: string;
  modifiedDate: string;
  publishedDate: string;
  reviewer?: string;
  seoTitle?: string;
  metaDescription?: string;
  socialImage?: string;
  lastReviewed: string;
}

export interface Pest extends ContentMetadata {
  identificationGuide: string;
  commonSigns: string[];
  typicalHidingPlaces: string[];
  risksToHomeOrBusiness: string[];
  causesAndAttractants: string[];
  inspectionProcess: string[];
  treatmentOptions: string[];
  preparationRequired: string[];
  visitSequence: string[];
  afterTreatmentExpectations: string[];
  preventionGuidance: string[];
  whenProfessionalIsAppropriate: string;
  residentialConsiderations?: string;
  commercialConsiderations?: string;
  landlordTenantConsiderations?: string;
  faqs: FAQ[];
  relatedServices: string[]; // service slugs
  relatedAdvice: string[]; // advice slugs
}

export interface Service extends ContentMetadata {
  whoItIsFor: string;
  problemsAddressed: string[];
  inspectionMethodology: string[];
  treatmentProcess: string[];
  preparationRequired: string[];
  visitSequence: string[];
  followUp: string[];
  limitations: string[];
  safetyConsiderations: string[];
  pricingMethod: string;
  relevantPests: string[]; // pest slugs
  relevantIndustries: string[]; // industry slugs
  relevantLocations?: string[];
  faqs: FAQ[];
}

export interface Region {
  slug: string;
  name: string;
  description: string;
  subRegions: string[]; // borough slugs
}

export interface Borough {
  slug: string;
  name: string;
  broadRegion: string; // Region slug
  isServed: boolean;
  description: string;
}

export interface LocationEditorialQuality {
  isServed: boolean;
  publicationStatus: 'draft' | 'published';
  indexable: boolean;
  localIntroductionVerified: boolean;
  localPestObservationsVerified: boolean;
  localCaseStudiesCount: number;
  localReviewsCount: number;
  localImagesCount: number;
  localTechnicianNotesCount: number;
  nearbyAreasVerified: boolean;
  responseTimeVerified: boolean;
  uniqueFaqCount: number;
  wordCount: number;
  lastReviewed: string;
  reviewedBy: string;
}

export interface Location {
  slug: string;
  name: string;
  boroughSlug: string;
  isServed: boolean;
  regionSlug: string;
  postcodeDistricts: string[]; // e.g. ["E1", "E2"]
  editorialQuality: LocationEditorialQuality;
  
  // Content blocks - only populated if editorial is verified
  localIntroduction?: string;
  localPestObservations?: string;
  propertyConsiderations?: string;
  commercialConsiderations?: string;
  technicianNotes?: string;
  parkingAndAccessNotes?: string;
  nearbyAreas?: string[]; // nearby location slugs
  faqs?: FAQ[];
}

export interface PostcodeDistrict {
  outwardCode: string; // e.g. "E1"
  postcodeArea: string; // e.g. "London E"
  mainPostTown: string;
  relevantBorough: string; // Borough name or slug
  broadLondonRegion: string; // Region slug
  isWhollyInsideM25: boolean;
  isPartlyInsideM25: boolean;
  isActivelyServed: boolean;
  serviceLimitations?: string;
  neighbouringOutwardDistricts: string[];
  latitude: number;
  longitude: number;
  publicationStatus: 'draft' | 'published' | 'awaiting-data' | 'awaiting-review' | 'archived';
  indexable: boolean;
  
  // Enriched Local SEO fields
  postcodePrefix?: string; // e.g. "RM"
  verified?: boolean;
  qualityScore?: number; // 0 to 100
  nearbyAreas?: string[];
  relevantPests?: string[]; // pest slugs
  relevantServices?: string[]; // service slugs
  localCoverageNotes?: string;
  residentialPropertyContext?: string;
  commercialPropertyContext?: string;
  localPestContext?: string;
  technicianNotes?: string;
  genuineCaseStudyIds?: string[];
  genuineReviewIds?: string[];
  genuinePhotoIds?: string[];
  dateCreated?: string;
  dateReviewed?: string;
  reviewedBy?: string;
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  faqs?: FAQ[];
}

export interface Industry {
  slug: string;
  name: string;
  title: string;
  summary: string;
  inspectionProcess: string[];
  monitoringPrograms: string[];
  documentationAndAudits: string;
  pestPreventionPrograms: string[];
  proofingDetails: string;
  hygieneRecommendations: string[];
  contractCTA: string;
  relevantPests: string[]; // pest slugs
  relevantServices: string[]; // service slugs
}

export interface AdviceArticle extends ContentMetadata {
  author: string;
  content: string; // HTML or Markdown compatible structured body sections
  readingTime: string;
  topicCluster: 'RODENTS' | 'BED BUGS' | 'COCKROACHES' | 'WASPS' | 'MOTHS AND BEETLES' | 'LANDLORDS AND TENANTS';
  headings: { level: number; text: string }[];
  relatedPest?: string; // slug
  relatedService?: string; // slug
}

export interface CaseStudy {
  slug: string;
  title: string;
  dateOrMonth: string;
  broadLocation: string; // e.g. "Hampstead"
  postcodeDistrict: string; // e.g. "NW3"
  propertyType: string; // e.g. "Terraced Residential House"
  pest: string; // pest slug
  customerType: 'Residential' | 'Commercial' | 'Landlord';
  initialSigns: string[];
  inspectionFindings: string[];
  contributingConditions: string[];
  actionsCompleted: string[];
  followUp: string[];
  outcome: string;
  preventionRecommendations: string[];
  imageUrl?: string;
  imageAlt?: string;
  imageConsentStatus: boolean;
  customerQuotation?: string;
  customerQuotationConsent: boolean;
  technicianName: string;
  relatedPest: string; // slug
  relatedService: string; // slug
  relatedLocation: string; // slug
  privacyRedactionStatus: boolean;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  content: string;
  serviceSlug?: string;
  locationSlug?: string;
  source: 'Google' | 'Trustpilot' | 'Self-Hosted';
  isVerified: boolean;
}

export interface Redirect {
  source: string;
  destination: string;
  statusCode: 301 | 302;
}

export interface CoverageRule {
  postcodePrefix: string;
  isServed: boolean;
  limitations?: string;
}

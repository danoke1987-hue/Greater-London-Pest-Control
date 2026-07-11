/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SiteSetting, Business, TeamMember, Accreditation, PriceItem, Review, FAQ } from '../types';

export const siteSettings: SiteSetting = {
  siteName: "Greater London Pest Control",
  domain: "pestcontrol.london",
  emergencyPhone: "020 8064 0321",
  standardPhone: "020 8064 0320",
  whatsappNumber: "+442080640320",
  email: "enquiries@pestcontrol.london",
  operatingHours: "Monday to Sunday, 7am - 10pm (Emergency service available 24/7)",
  insuranceInfo: "£10M Public & Employers Liability Insurance (Axa Insurance plc, Policy AXA-P-892401)",
  companyNumber: "09482103",
  vatNumber: "GB 214 8921 40",
  googleSearchConsoleVerification: "gsc-verification-placeholder-12345",
  googleTagManagerId: "GTM-XXXXXX"
};

export const businessDetails: Business = {
  name: "Greater London Pest Control Ltd",
  legalName: "Greater London Pest Control Limited",
  registrationNumber: "09482103",
  vatNumber: "GB 214 8921 40",
  mainOffice: {
    name: "London Bridge Office (Staffed HQ)",
    addressLine1: "Suite 4, 137 Borough High Street",
    city: "London",
    postcode: "SE1 1NP",
    isStaffed: true,
    phone: "020 8064 0320"
  },
  additionalDepots: [
    {
      name: "Bromley Operational Depot (Unstaffed Hub)",
      addressLine1: "Unit 12, Croydon Road Industrial Estate",
      city: "Bromley",
      postcode: "BR1 1QE",
      isStaffed: false
    }
  ],
  insuranceDetails: "AXA Public Liability Insurance up to £10,000,000. Coverage includes all residential, commercial, and food-handling establishments inside the M25.",
  accreditations: ["BPCA", "CEPA", "NPTA", "CHAS", "SafeContractor"]
};

export const teamMembers: TeamMember[] = [
  {
    id: "tech-1",
    name: "Marcus Thorne",
    role: "Senior RSPH Level 2 Technician",
    qualifications: [
      "RSPH Level 2 Award in Pest Management",
      "BPCA Certified Field Biologist",
      "Confined Space Entry Cert"
    ],
    biography: "Marcus has over 12 years of structural pest control experience inside London. He specialises in commercial food production hygiene and complex proofing projects.",
    isVerified: true
  },
  {
    id: "tech-2",
    name: "Sarah Jenkins",
    role: "BPCA Qualified Surveyor & Technician",
    qualifications: [
      "RSPH Level 2 Award in Pest Management",
      "PA1 & PA6 Safe Use of Pesticides Certificate",
      "Working at Heights IPAF Cert"
    ],
    biography: "Sarah is our residential rodent and insect specialist. She focuses on historical and listed property infestations across West and Central London.",
    isVerified: true
  }
];

export const accreditations: Accreditation[] = [
  {
    id: "bpca",
    name: "British Pest Control Association (BPCA)",
    issuer: "BPCA",
    verificationUrl: "https://bpca.org.uk",
    description: "The premier professional association for pest control in the UK. Membership ensures technicians are fully trained, insured, and adhere to industry codes of practice."
  },
  {
    id: "npta",
    name: "National Pest Technicians Association (NPTA)",
    issuer: "NPTA",
    verificationUrl: "https://www.npta.org.uk",
    description: "A professional body representing trained technicians, promoting best practices and safety in pesticide usage and environmental care."
  },
  {
    id: "safecontractor",
    name: "Alcumus SafeContractor Certified",
    issuer: "Alcumus",
    verificationUrl: "https://www.safecontractor.com",
    description: "Independent accreditation verifying our strict health, safety, and risk assessment standards in complex commercial environments."
  },
  {
    id: "rsph",
    name: "RSPH Level 2 Award",
    issuer: "Royal Society for Public Health",
    description: "The standard qualification verifying thorough understanding of biology, legislation, and safe handling of rodenticides and insecticides."
  }
];

export const priceList: PriceItem[] = [
  { serviceName: "Mouse Control Survey & Treatment", category: "Residential", priceFrom: "£160", basis: "includes 3 visits with full inspection and treatment" },
  { serviceName: "Rat Control & Drain Camera Inspection", category: "Residential", priceFrom: "£240", basis: "includes drain survey and 3-visit baiting/trapping program" },
  { serviceName: "Wasp Nest Removal / Treatment", category: "Residential", priceFrom: "£90", basis: "guaranteed treatment, single visit (half-price for second nests)" },
  { serviceName: "Bed Bug Heat Treatment", category: "Residential", priceFrom: "£480", basis: "eco-friendly rapid steam/heat treatment per room, 100% eradication" },
  { serviceName: "Commercial Site Pest Risk Survey", category: "Commercial", priceFrom: "£0", basis: "completely free survey and competitive contract proposal" },
  { serviceName: "Landlord Tenant Emergency Inspection", category: "Residential", priceFrom: "£120", basis: "comprehensive report detailing root cause and fault allocation" }
];

export const customerReviews: Review[] = [
  {
    id: "rev-1",
    author: "Richard G., Landlord",
    rating: 5,
    date: "2026-06-15",
    content: "Called GLPC for a mouse infestation in our Greenwich rental flat. Marcus arrived within 3 hours, completed a thorough inspection, and sealed the access points under the kitchen units. Excellent communication with our tenants.",
    serviceSlug: "mouse-control",
    locationSlug: "greenwich",
    source: "Google",
    isVerified: true
  },
  {
    id: "rev-2",
    author: "Elena M., Restaurant Manager",
    rating: 5,
    date: "2026-05-20",
    content: "Outstanding contract service. They handle our routine pest audits and digital monitoring. Since we switched to GLPC, our hygiene rating is back to 5. Highly recommended for any restaurant in Southwark.",
    serviceSlug: "commercial-contracts",
    locationSlug: "southwark",
    source: "Google",
    isVerified: true
  },
  {
    id: "rev-3",
    author: "David H.",
    rating: 5,
    date: "2026-06-29",
    content: "Wasp nest in our roof void in Richmond. Sarah was very professional, wore full safety gear, and dealt with the nest quickly. Guaranteed price, no hidden add-ons.",
    serviceSlug: "wasp-control",
    locationSlug: "richmond-upon-thames",
    source: "Google",
    isVerified: true
  }
];

export const globalFAQs: FAQ[] = [
  {
    question: "Do you offer a 24-hour emergency service across all of London?",
    answer: "We offer a 24/7 reactive service for genuine emergencies such as severe wasp nests, active rodent encounters in living areas, or hotel bed bug breakouts. Outside of standard office hours (7am - 10pm), our on-call technicians prioritize residential and commercial clients with urgent requirements inside the M25."
  },
  {
    question: "Are your treatments safe for children, dogs, and cats?",
    answer: "Yes, family and pet safety is our absolute priority. We use secure, lockable bait stations for all rodenticide applications, preventing access by non-target animals. For insect treatments, we use targeted spray applications and clear instructions on when it is safe to re-enter treated rooms (typically 4 hours)."
  },
  {
    question: "Will you block holes and proof the property against pests?",
    answer: "Absolutely. We believe that preventing pests from entering is far more effective than just treating active populations. We offer professional proofing services, including wire mesh installation, expanding foam reinforcement, drain mesh insertion, and door brush strips. This is backed by a proofing guarantee."
  },
  {
    question: "Can you provide a clear diagnosis if I am unsure which pest I have?",
    answer: "Yes. Our quote form and technician visits are designed to identify pests based on signs, droppings, and damage patterns. You can upload clear photographs of the damage, droppings, or the pests themselves via our quote form, and our BPCA surveyors will identify them free of charge."
  }
];

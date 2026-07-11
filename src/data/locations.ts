/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Region, Borough, Location, PostcodeDistrict } from '../types';

export const regionsList: Region[] = [
  { slug: "central-london", name: "Central London", description: "Core metropolitan districts inside London's inner ring.", subRegions: ["camden", "westminster", "city-of-london", "kensington-and-chelsea", "southwark"] },
  { slug: "north-london", name: "North London", description: "Boroughs extending north from Camden towards the M25.", subRegions: ["barnet", "enfield", "haringey", "islington"] },
  { slug: "east-london", name: "East London", description: "Boroughs covering the Docklands and Eastern growth sectors.", subRegions: ["tower-hamlets", "hackney", "newham", "barking-and-dagenham", "redbridge", "havering"] },
  { slug: "south-east-london", name: "South East London", description: "Boroughs south of the river covering Greenwich, Lewisham, and Bromley.", subRegions: ["greenwich", "lewisham", "bromley", "bexley"] },
  { slug: "south-west-london", name: "South West London", description: "Boroughs spanning Wandsworth, Merton, Richmond, and Kingston.", subRegions: ["wandsworth", "lambeth", "merton", "richmond-upon-thames", "kingston-upon-thames", "sutton", "croydon"] },
  { slug: "west-london", name: "West London", description: "Boroughs extending west towards Heathrow.", subRegions: ["ealing", "hillingdon", "hounslow", "brent", "hammersmith-and-fulham", "harrow"] }
];

export const boroughsList: Borough[] = [
  { slug: "barking-and-dagenham", name: "Barking and Dagenham", broadRegion: "east-london", isServed: false, description: "London Borough of Barking and Dagenham." },
  { slug: "barnet", name: "Barnet", broadRegion: "north-london", isServed: false, description: "London Borough of Barnet." },
  { slug: "bexley", name: "Bexley", broadRegion: "south-east-london", isServed: false, description: "London Borough of Bexley." },
  { slug: "brent", name: "Brent", broadRegion: "west-london", isServed: false, description: "London Borough of Brent." },
  { slug: "bromley", name: "Bromley", broadRegion: "south-east-london", isServed: true, description: "London Borough of Bromley, our major secondary operational base." },
  { slug: "camden", name: "Camden", broadRegion: "central-london", isServed: true, description: "London Borough of Camden, containing our core primary service districts." },
  { slug: "city-of-london", name: "City of London", broadRegion: "central-london", isServed: true, description: "The historic financial core of Greater London." },
  { slug: "croydon", name: "Croydon", broadRegion: "south-west-london", isServed: false, description: "London Borough of Croydon." },
  { slug: "ealing", name: "Ealing", broadRegion: "west-london", isServed: false, description: "London Borough of Ealing." },
  { slug: "enfield", name: "Enfield", broadRegion: "north-london", isServed: false, description: "London Borough of Enfield." },
  { slug: "greenwich", name: "Greenwich", broadRegion: "south-east-london", isServed: true, description: "London Royal Borough of Greenwich, with extensive service history." },
  { slug: "hackney", name: "Hackney", broadRegion: "east-london", isServed: false, description: "London Borough of Hackney." },
  { slug: "hammersmith-and-fulham", name: "Hammersmith and Fulham", broadRegion: "west-london", isServed: false, description: "London Borough of Hammersmith and Fulham." },
  { slug: "haringey", name: "Haringey", broadRegion: "north-london", isServed: false, description: "London Borough of Haringey." },
  { slug: "harrow", name: "Harrow", broadRegion: "west-london", isServed: false, description: "London Borough of Harrow." },
  { slug: "havering", name: "Havering", broadRegion: "east-london", isServed: false, description: "London Borough of Havering." },
  { slug: "hillingdon", name: "Hillingdon", broadRegion: "west-london", isServed: false, description: "London Borough of Hillingdon." },
  { slug: "hounslow", name: "Hounslow", broadRegion: "west-london", isServed: false, description: "London Borough of Hounslow." },
  { slug: "islington", name: "Islington", broadRegion: "north-london", isServed: false, description: "London Borough of Islington." },
  { slug: "kensington-and-chelsea", name: "Kensington and Chelsea", broadRegion: "central-london", isServed: true, description: "Royal Borough of Kensington and Chelsea." },
  { slug: "kingston-upon-thames", name: "Kingston upon Thames", broadRegion: "south-west-london", isServed: false, description: "Royal Borough of Kingston upon Thames." },
  { slug: "lambeth", name: "Lambeth", broadRegion: "south-west-london", isServed: true, description: "London Borough of Lambeth." },
  { slug: "lewisham", name: "Lewisham", broadRegion: "south-east-london", isServed: false, description: "London Borough of Lewisham." },
  { slug: "merton", name: "Merton", broadRegion: "south-west-london", isServed: false, description: "London Borough of Merton." },
  { slug: "newham", name: "Newham", broadRegion: "east-london", isServed: false, description: "London Borough of Newham." },
  { slug: "redbridge", name: "Redbridge", broadRegion: "east-london", isServed: false, description: "London Borough of Redbridge." },
  { slug: "richmond-upon-thames", name: "Richmond upon Thames", broadRegion: "south-west-london", isServed: true, description: "London Borough of Richmond upon Thames, covered extensively." },
  { slug: "southwark", name: "Southwark", broadRegion: "central-london", isServed: true, description: "London Borough of Southwark, where our staffed HQ is located." },
  { slug: "sutton", name: "Sutton", broadRegion: "south-west-london", isServed: false, description: "London Borough of Sutton." },
  { slug: "tower-hamlets", name: "Tower Hamlets", broadRegion: "east-london", isServed: true, description: "London Borough of Tower Hamlets." },
  { slug: "waltham-forest", name: "Waltham Forest", broadRegion: "east-london", isServed: false, description: "London Borough of Waltham Forest." },
  { slug: "wandsworth", name: "Wandsworth", broadRegion: "south-west-london", isServed: true, description: "London Borough of Wandsworth." },
  { slug: "westminster", name: "Westminster", broadRegion: "central-london", isServed: true, description: "City of Westminster, highly active service coverage." }
];

export const postcodesList: PostcodeDistrict[] = [
  {
    outwardCode: "SE1",
    postcodeArea: "Southwark & Bermondsey",
    mainPostTown: "London",
    relevantBorough: "southwark",
    broadLondonRegion: "central-london",
    isWhollyInsideM25: true,
    isPartlyInsideM25: false,
    isActivelyServed: true,
    serviceLimitations: "None. Direct, rapid coverage from our Borough High Street office.",
    neighbouringOutwardDistricts: ["SE11", "SE16", "EC4", "WC2"],
    latitude: 51.5012,
    longitude: -0.0805,
    publicationStatus: "published",
    indexable: true
  },
  {
    outwardCode: "NW3",
    postcodeArea: "Hampstead & Belsize Park",
    mainPostTown: "London",
    relevantBorough: "camden",
    broadLondonRegion: "central-london",
    isWhollyInsideM25: true,
    isPartlyInsideM25: false,
    isActivelyServed: true,
    serviceLimitations: "Standard response within 3 hours. Strict parking controls may affect appointment timings.",
    neighbouringOutwardDistricts: ["NW1", "NW5", "NW6", "N6"],
    latitude: 51.5583,
    longitude: -0.1741,
    publicationStatus: "published",
    indexable: true
  },
  {
    outwardCode: "SW6",
    postcodeArea: "Fulham",
    mainPostTown: "London",
    relevantBorough: "hammersmith-and-fulham",
    broadLondonRegion: "west-london",
    isWhollyInsideM25: true,
    isPartlyInsideM25: false,
    isActivelyServed: true,
    serviceLimitations: "Response times within 3-4 hours. Local parking permissions required.",
    neighbouringOutwardDistricts: ["SW5", "SW10", "SW15", "W14"],
    latitude: 51.4784,
    longitude: -0.2045,
    publicationStatus: "published",
    indexable: true
  },
  {
    outwardCode: "BR1",
    postcodeArea: "Bromley",
    mainPostTown: "Bromley",
    relevantBorough: "bromley",
    broadLondonRegion: "south-east-london",
    isWhollyInsideM25: true,
    isPartlyInsideM25: false,
    isActivelyServed: true,
    serviceLimitations: "Rapid dispatch from our secondary operational hub.",
    neighbouringOutwardDistricts: ["BR2", "BR3", "SE12", "BR7"],
    latitude: 51.4060,
    longitude: 0.0135,
    publicationStatus: "published",
    indexable: true
  },
  {
    outwardCode: "TW1",
    postcodeArea: "Twickenham",
    mainPostTown: "Twickenham",
    relevantBorough: "richmond-upon-thames",
    broadLondonRegion: "south-west-london",
    isWhollyInsideM25: true,
    isPartlyInsideM25: false,
    isActivelyServed: true,
    serviceLimitations: "Coverage from our South West team. Standard same-day service.",
    neighbouringOutwardDistricts: ["TW2", "TW9", "TW10", "TW11"],
    latitude: 51.4485,
    longitude: -0.3371,
    publicationStatus: "published",
    indexable: true
  },
  {
    outwardCode: "E1",
    postcodeArea: "Stepney & Whitechapel",
    mainPostTown: "London",
    relevantBorough: "tower-hamlets",
    broadLondonRegion: "east-london",
    isWhollyInsideM25: true,
    isPartlyInsideM25: false,
    isActivelyServed: true,
    serviceLimitations: "Congestion charge zone applies during active times. Quick response times.",
    neighbouringOutwardDistricts: ["EC1", "EC2", "E2", "E1W", "E14"],
    latitude: 51.5173,
    longitude: -0.0574,
    publicationStatus: "published",
    indexable: true
  },
  {
    outwardCode: "N1",
    postcodeArea: "Islington",
    mainPostTown: "London",
    relevantBorough: "islington",
    broadLondonRegion: "north-london",
    isWhollyInsideM25: true,
    isPartlyInsideM25: false,
    isActivelyServed: false,
    neighbouringOutwardDistricts: ["EC1", "N5", "N7", "E2"],
    latitude: 51.5379,
    longitude: -0.0988,
    publicationStatus: "draft",
    indexable: false
  },
  {
    outwardCode: "WD1",
    postcodeArea: "Watford (Partial)",
    mainPostTown: "Watford",
    relevantBorough: "harrow", // border
    broadLondonRegion: "west-london",
    isWhollyInsideM25: false,
    isPartlyInsideM25: true,
    isActivelyServed: false,
    neighbouringOutwardDistricts: ["HA1", "WD2"],
    latitude: 51.6565,
    longitude: -0.3903,
    publicationStatus: "draft",
    indexable: false
  }
];

export const locationsList: Location[] = [
  {
    slug: "london-bridge",
    name: "London Bridge",
    boroughSlug: "southwark",
    isServed: true,
    regionSlug: "central-london",
    postcodeDistricts: ["SE1"],
    editorialQuality: {
      isServed: true,
      publicationStatus: "published",
      indexable: true,
      localIntroductionVerified: true,
      localPestObservationsVerified: true,
      localCaseStudiesCount: 1,
      localReviewsCount: 1,
      localImagesCount: 1,
      localTechnicianNotesCount: 1,
      nearbyAreasVerified: true,
      responseTimeVerified: true,
      uniqueFaqCount: 2,
      wordCount: 450,
      lastReviewed: "2026-07-10",
      reviewedBy: "Marcus Thorne"
    },
    localIntroduction: "Based directly near Borough High Street, Greater London Pest Control provides rapid, professional, and discreet extermination and proofing around London Bridge and Southwark. This bustling zone blends historical residential complexes with high-density commercial restaurants and offices, which require professional vigilance under the Food Safety Act.",
    localPestObservations: "Due to proximity to London Bridge Station and historic railway viaducts, rodent pressure (particularly mice in commercial properties and rats along drainage channels) remains high. We frequently carry out structural exclusion underneath kitchen sink spaces and install sewer non-return blockers in older brick inspection chambers.",
    propertyConsiderations: "Many properties around London Bridge share common cavities and pipe duct highways, making isolated baiting ineffective. True protection relies on sealing utility inlets to isolate individual units completely.",
    commercialConsiderations: "Commercial restaurants in Borough Market trust us for routine Pest Risk Assessments, preventative contract monitoring, and rapid emergency out-of-hours mouse and fly control services.",
    technicianNotes: "Parking can be extremely difficult near Borough Market. We recommend scheduling routine surveys and heat treatments in the early mornings (7am-9am) to ensure smooth, punctual arrivals.",
    parkingAndAccessNotes: "Congestion charging and Red Route parking restrict daytime stopping; our rapid response team uses scooter and eco-van transport to carry out immediate treatments.",
    nearbyAreas: ["borough", "waterloo", "bermondsey"],
    faqs: [
      {
        question: "How fast can you respond to a restaurant near Borough Market?",
        answer: "As our physical staffed headquarters is directly on Borough High Street, we can typically have a certified pest control surveyor on site at any London Bridge restaurant within 60 minutes."
      }
    ]
  },
  {
    slug: "hampstead",
    name: "Hampstead",
    boroughSlug: "camden",
    isServed: true,
    regionSlug: "central-london",
    postcodeDistricts: ["NW3"],
    editorialQuality: {
      isServed: true,
      publicationStatus: "published",
      indexable: true,
      localIntroductionVerified: true,
      localPestObservationsVerified: true,
      localCaseStudiesCount: 0,
      localReviewsCount: 0,
      localImagesCount: 0,
      localTechnicianNotesCount: 1,
      nearbyAreasVerified: true,
      responseTimeVerified: true,
      uniqueFaqCount: 1,
      wordCount: 380,
      lastReviewed: "2026-07-09",
      reviewedBy: "Sarah Jenkins"
    },
    localIntroduction: "Our Hampstead pest control specialists provide discreet, accredited, and safe treatments tailored to the unique architectural needs of North Camden. We preserve the integrity of historic residential houses and high-value properties inside the NW3 district.",
    localPestObservations: "The lush foliage of Hampstead Heath combined with large Edwardian and Victorian brick buildings creates natural channels for grey squirrels and mice. In autumn, squirrels regularly attempt to chew through wooden soffits to construct winter nests in attic timbers.",
    propertyConsiderations: "Pre-existing woodworm and timber furniture beetles are common in Hampstead's older housing stock. We provide specialized non-destructive timber spraying and long-term warranties.",
    commercialConsiderations: "We service cafes and high-street boutiques along Hampstead High Street with low-profile preventative monitoring and discreet out-of-hours wasp nest treatments.",
    technicianNotes: "Hampstead's narrow hilly lanes require small vehicles. When booking squirrel loft trapping, please ensure attic hatch lanes are completely clear of ornaments.",
    parkingAndAccessNotes: "Hampstead has extensive Resident Parking Zones (CA-H). Our technicians use pre-paid visitor permits or commercial parking slots.",
    nearbyAreas: ["belsize-park", "highgate", "golders-green"],
    faqs: [
      {
        question: "How do you treat squirrels in historic Hampstead lofts?",
        answer: "We use strictly humane, legally compliant spring trapping grids placed in lofts. Captured grey squirrels are humanely dispatched, after which we block eaves entries permanently using heavy steel weld-mesh."
      }
    ]
  },
  {
    slug: "islington-draft",
    name: "Islington (Draft)",
    boroughSlug: "islington",
    isServed: false,
    regionSlug: "north-london",
    postcodeDistricts: ["N1"],
    editorialQuality: {
      isServed: false,
      publicationStatus: "draft",
      indexable: false,
      localIntroductionVerified: false,
      localPestObservationsVerified: false,
      localCaseStudiesCount: 0,
      localReviewsCount: 0,
      localImagesCount: 0,
      localTechnicianNotesCount: 0,
      nearbyAreasVerified: false,
      responseTimeVerified: false,
      uniqueFaqCount: 0,
      wordCount: 50,
      lastReviewed: "2026-06-01",
      reviewedBy: ""
    }
  }
];

export const activeLocations = locationsList.filter(l => l.editorialQuality.indexable && l.editorialQuality.publicationStatus === 'published');
export const draftLocations = locationsList.filter(l => !l.editorialQuality.indexable || l.editorialQuality.publicationStatus === 'draft');
export const activePostcodes = postcodesList.filter(p => p.indexable && p.publicationStatus === 'published');
export const activeBoroughs = boroughsList.filter(b => b.isServed);

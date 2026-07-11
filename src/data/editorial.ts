/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AdviceArticle, CaseStudy, Industry } from '../types';

export const industriesList: Industry[] = [
  {
    slug: "restaurants",
    name: "Restaurants & Cafés",
    title: "Commercial Pest Control for London Restaurants & Cafés",
    summary: "Preventative pest monitoring, full audit compliance (BRC, SALSA), and rapid 2-hour emergency response to protect your food hygiene rating.",
    inspectionProcess: [
      "Detail-focused audit of all high-risk food prep zones, cooking lines, and storage shelves",
      "Endoscopic camera checks behind stainless steel prep panels and under cooking ranges",
      "Inspection of waste disposal corridors and grease traps for rodent or fly entry points"
    ],
    monitoringPrograms: [
      "Routine placement of non-toxic digital monitoring sensors to log mouse or cockroach activity",
      "Pheromone insect sticky boards and professional electronic glue-board fly catchers (EFKs)"
    ],
    documentationAndAudits: "We supply a physical and digital Commercial Pest Folder on-site containing COSHH safety logs, risk mappings, treatment certificates, and technician qualifications required to satisfy Environmental Health Officers (EHO) and food audits.",
    pestPreventionPrograms: [
      "Quarterly site audits by BPCA certified technicians",
      "Staff training on waste management and early pest identification"
    ],
    proofingDetails: "Applying high-temperature structural expansion silicone, fitting heavy-duty metal mesh behind ventilation units, and installing metal door sweeps on kitchen loading portals.",
    hygieneRecommendations: [
      "Clear kitchen ranges and grease pools from underneath stoves daily.",
      "Never leave rubbish bags standing on the floor of internal corridors overnight.",
      "Maintain kitchen drain lines with professional bio-foaming cleaners."
    ],
    contractCTA: "Schedule a completely free, confidential Pest Audit and contract proposal on your premises.",
    relevantPests: ["mice", "cockroaches", "flies", "rats", "fruit-flies"],
    relevantServices: ["commercial-contracts", "mouse-control", "wasp-control"]
  },
  {
    slug: "hotels",
    name: "Hotels & Hospitality",
    title: "Hotel Pest Control & Bed Bug Solutions London",
    summary: "Discreet, high-speed bed bug heat treatment, preventative room inspections, and complete documentation with rapid 24-hour response.",
    inspectionProcess: [
      "Routine headboard, mattress seam, and sofa inspection across high-occupancy guest rooms",
      "Check of laundry transit lines and staff luggage holding zones"
    ],
    monitoringPrograms: [
      "Placing low-profile active bed bug monitoring trap arrays beneath bed structures",
      "Continuous rodent and insect check lines in hotel basement kitchens"
    ],
    documentationAndAudits: "Every hotel contract includes digital audit reporting, and our bed-bug-free certification to protect brand equity against reviews.",
    pestPreventionPrograms: [
      "Routine bed bug spot sweeps by qualified surveyors",
      "Immediate rapid out-of-hours room heat treatment cover"
    ],
    proofingDetails: "Isolation sealing of service conduits and wire pathways running between guest rooms to prevent spread.",
    hygieneRecommendations: [
      "Wash and dry guest linens on high-temperature cycles (60°C).",
      "Ensure luggage storage bins are vacuumed and treated periodically."
    ],
    contractCTA: "Request an audit of your guest rooms and custom hotel protection contract.",
    relevantPests: ["bed-bugs", "mice", "cockroaches", "silverfish"],
    relevantServices: ["bed-bug-treatment", "commercial-contracts"]
  },
  {
    slug: "property-management",
    name: "Property Management & Landlords",
    title: "Pest Management for London Property Managers & Landlords",
    summary: "Professional root-cause investigation, rapid tenant communication, and comprehensive treatment reports to resolve disputes and secure flats.",
    inspectionProcess: [
      "Tenant property survey to diagnose active infestations and identify structural ingress corridors",
      "Drain camera checks to identify sewer cracks before tenancy handovers"
    ],
    monitoringPrograms: [
      "Placement of secure, locked baiting arrays in communal basements and bin stores"
    ],
    documentationAndAudits: "We provide comprehensive written reports diagnosing whether a pest problem is due to structural wear (landlord duty) or lack of cleanliness (tenant issue).",
    pestPreventionPrograms: [
      "Pre-tenancy structural proofing and rodent-free certifications"
    ],
    proofingDetails: "Sealing shared floor and utility voids inside multi-unit terrace buildings with steel wire mesh.",
    hygieneRecommendations: [
      "Address minor water leaks under sinks and showers immediately.",
      "Ensure communal bin doors are fitted with automatic self-closing systems."
    ],
    contractCTA: "Enquire about building-wide contract pricing or single-flat emergency inspections.",
    relevantPests: ["mice", "rats", "bed-bugs", "fleas", "carpet-beetles"],
    relevantServices: ["mouse-control", "rat-control", "bed-bug-treatment"]
  },
  {
    slug: "offices",
    name: "Offices & Corporate",
    title: "Commercial Pest Control for London Offices",
    summary: "Discreet, non-chemical preventative pest monitoring to safeguard employee wellness and protect electronic communications infrastructure.",
    inspectionProcess: [
      "Checking riser cupboards, floor cabling voids, and kitchen breakout areas",
      "Assessing building envelopes for bird nesting or squirrel roof entry points"
    ],
    monitoringPrograms: [
      "Using non-toxic digital monitoring traps linked to local tech zones for immediate alert"
    ],
    documentationAndAudits: "Full COSHH and risk assessment registers designed to satisfy corporate facility audits.",
    pestPreventionPrograms: [
      "Scheduled quarterly inspections with complete, discrete reporting"
    ],
    proofingDetails: "Precision exclusion around server cabling pathways and steel-mesh vent protection on sub-floors.",
    hygieneRecommendations: [
      "Ensure kitchen breakout bins are emptied at the end of every business day.",
      "Deter employees from keeping loose open foodstuffs at desks."
    ],
    contractCTA: "Request a free corporate site survey and tailored preventative contract quote.",
    relevantPests: ["mice", "spiders", "flies", "carpet-beetles"],
    relevantServices: ["commercial-contracts", "mouse-control"]
  },
  {
    slug: "warehouses",
    name: "Warehouses & Logistics",
    title: "Industrial Pest Control for London Warehouses",
    summary: "Heavy-duty rodent exclusion, bird netting, and BRC/SALSA audit compliant pest control programs for storage and logistics hubs.",
    inspectionProcess: [
      "Perimeter border checks, inspecting raw pallet goods, and looking for bird or squirrel entries in roof structures",
      "Tracking rodent runways across warehouse floor borders"
    ],
    monitoringPrograms: [
      "Permanent external bait grids and high-reach interior moth monitoring networks"
    ],
    documentationAndAudits: "Full compliance documentation, pesticide use records, and annual biologist audits.",
    pestPreventionPrograms: [
      "Preventative rodent exclusion and continuous site monitor schedules"
    ],
    proofingDetails: "Steel wire mesh over loading dock gaps, heavy bird netting over eaves, and fitting industrial brush strips to roller shutters.",
    hygieneRecommendations: [
      "Ensure spilled products (flours, seeds) are vacuumed and removed immediately.",
      "Maintain a 1-metre clear barrier between pallet storage stacks and interior walls."
    ],
    contractCTA: "Schedule an industrial pest risk survey for your storage or logistics facility.",
    relevantPests: ["rats", "mice", "pigeons", "stored-product-moths", "beetles"],
    relevantServices: ["commercial-contracts", "rat-control", "bird-proofing"]
  }
];

export const adviceArticles: AdviceArticle[] = [
  {
    slug: "signs-of-rats",
    title: "Common Signs of Rats in London Properties",
    summary: "Learn how to identify brown rats, recognize active signs like droppings and smear marks, and understand when to call a professional.",
    status: "active",
    indexability: true,
    createdDate: "2026-06-10",
    modifiedDate: "2026-07-09",
    publishedDate: "2026-06-12",
    reviewer: "Marcus Thorne (Senior Field Biologist)",
    seoTitle: "Signs of Rats | How to Detect Rat Activity | GLPC Advice",
    metaDescription: "Step-by-step guide on detecting rats in London homes. Spot droppings, smear marks, gnaw tracks, and explore professional proofing options.",
    lastReviewed: "2026-07-09",
    author: "Sarah Jenkins (Surveyor)",
    readingTime: "4 mins",
    topicCluster: "RODENTS",
    headings: [
      { level: 2, text: "How to Spot Rat Droppings" },
      { level: 2, text: "Grease Smear Marks and Footprints" },
      { level: 2, text: "Active Scratching and Chewing Sounds" },
      { level: 2, text: "Burrows and Runways Near Drains" },
      { level: 2, text: "When to Contact a Certified Pest Controller" }
    ],
    content: "Identifying a rat issue early is vital to prevent structural damage and disease transmission. Unlike mice, rats are generally nocturnal and highly cautious (neophobic), meaning you are likely to notice signs of their presence long before seeing a live rodent. This guide details the five primary indicators of rat activity inside London properties.\n\n### How to Spot Rat Droppings\nRat droppings are a definitive indicator of an active infestation. Brown rat droppings are typically dark brown, spindle-shaped, tapered at both ends, and measure between 12mm and 15mm in length (resembling a large olive stone). They are usually found clustered in active feeding zones, loft cavities, or behind kitchen baseboards.\n\n### Grease Smear Marks and Footprints\nRats have poor eyesight and navigate by pressing their whiskers against wall junctions and skirting boards. Over time, the natural oils, dirt, and grease in their fur leave dark, smudge-like smear marks on painted plaster and timber. Fresh smear marks are soft and oily, whereas older ones are dry and flaky.\n\n### Active Scratching and Chewing Sounds\nBecause rats possess continuously growing incisors, they must chew hard materials (timber, soft metals, plastics) to keep them trimmed. Hearing scratching, gnawing, or deep thumping noises in ceilings, wall cavities, or sub-floor boards at night is a strong indicator of rat movement.\n\n### Burrows and Runways Near Drains\nIn outdoor garden areas, rats construct burrow networks with round entry holes about 8-10cm wide, typically under decking, concrete bases, or compost heaps. If burrows are found near sewer inspection chambers, it indicates they are emerging from sewer pipelines via defective joints.\n\n### When to Contact a Certified Pest Controller\nIf you detect any of these signs, professional remediation is strongly recommended. Rats carry pathogens such as Leptospirosis (Weil's Disease) which can be transmitted through contact with surfaces contaminated with urine. Our BPCA-certified surveyors can execute diagnostic CCTV drain surveys and apply safe, locked rodent bait grids to resolve infestations permanently."
  },
  {
    slug: "signs-of-bed-bugs",
    title: "Signs of Bed Bugs & How to Inspect a Mattress",
    summary: "Discover the tell-tale indicators of a bed bug infestation, including fecal spotting, bites, and mattress check techniques.",
    status: "active",
    indexability: true,
    createdDate: "2026-06-15",
    modifiedDate: "2026-07-10",
    publishedDate: "2026-06-18",
    reviewer: "Marcus Thorne (Senior Field Biologist)",
    seoTitle: "Signs of Bed Bugs | Mattress Inspection Guide | GLPC",
    metaDescription: "Learn how to inspect mattresses for bed bugs. Spot fecal spots, blood traces, skins, and understand the limits of using bites for identification.",
    lastReviewed: "2026-07-10",
    author: "Marcus Thorne",
    readingTime: "5 mins",
    topicCluster: "BED BUGS",
    headings: [
      { level: 2, text: "Understanding Bed Bug Bites" },
      { level: 2, text: "Fecal Spotting and Blood Traces" },
      { level: 2, text: "Step-by-step Mattress Inspection" },
      { level: 2, text: "Checking the Bed Frame and Headboard" },
      { level: 2, text: "What to Do If Bed Bug Signs are Discovered" }
    ],
    content: "Bed bug outbreaks have surged across London, affecting homes, luxury apartments, and boutique hotels alike. Because these insects are microscopic as nymphs and highly adept at hiding in tiny seams, spotting them requires a methodical inspection process. This guide shows you exactly what to look for.\n\n### Understanding Bed Bug Bites\nWhile bites are often the first sign, they are unreliable as sole proof of bed bugs. Bites appear as tiny, itchy red spots, frequently in a line or group of three (sometimes referred to as 'breakfast, lunch, and dinner'). However, reaction times vary; some people develop itchy wheals within hours, while others show no skin response at all. Clinical identification requires finding physical insect evidence.\n\n### Fecal Spotting and Blood Traces\nBed bugs feed on blood and deposit digested waste while moving. This appears as tiny, dark brown or black spots (fecal spotting) on sheets, pillowcases, or mattress covers, resembling black pepper. You may also notice small, faint smudges of fresh blood on bedding where bugs were accidentally crushed.\n\n### Step-by-step Mattress Inspection\nTo inspect a mattress:\n1. Strip the bed completely of all sheets, protectors, and pillowcases.\n2. Using a high-powered torch and magnifying glass, inspect the mattress seams, tufts, and buttons.\n3. Pull the fabric folds of the seams outward; bed bugs, eggs (tiny white cylinders), and cream-colored shed skins (exuviae) often pack tightly inside these folds.\n4. Check the underside of the mattress, focusing on where it rests on the bed base.\n\n### Checking the Bed Frame and Headboard\nOver 80% of bed bugs nest within 1.5 metres of the sleeping head area. Dismantle wooden slatted bases and inspect screw holes, brackets, and joint voids. If your headboard is wall-mounted, lift it off and check the rear seams.\n\n### What to Do If Bed Bug Signs are Discovered\nIf you find active signs, do not panic and avoid moving items (such as pillows or clothes) out of the room, as this spreads the infestation to other areas. Standard consumer aerosol insect sprays are generally ineffective and trigger a repellency response, scattering the colony deeper into the plasterboard. Professional dry steam or thermal heat treatment is required to kill all life stages, including eggs, in a single application."
  },
  {
    slug: "landlord-responsibility-pests",
    title: "Pest Outbreaks in Rentals: Landlord & Tenant Guidelines",
    summary: "Clear guidance on who is responsible for resolving pest infestations under UK tenancy laws, without presenting formal legal advice.",
    status: "active",
    indexability: true,
    createdDate: "2026-06-20",
    modifiedDate: "2026-07-09",
    publishedDate: "2026-06-22",
    reviewer: "Marcus Thorne (Senior Field Biologist)",
    seoTitle: "Pest Responsibility in London Rentals | Landlord vs Tenant",
    metaDescription: "Understand landlord and tenant responsibilities for pests in London. Guidance on reporting, documentation, and structural wear under UK rules.",
    lastReviewed: "2026-07-09",
    author: "Sarah Jenkins (Pest Surveyor)",
    readingTime: "5 mins",
    topicCluster: "LANDLORDS AND TENANTS",
    headings: [
      { level: 2, text: "The Structural Integrity Factor (Landlord Duty)" },
      { level: 2, text: "The Hygiene and Housekeeping Factor (Tenant Duty)" },
      { level: 2, text: "How to Properly Document Pest Evidence" },
      { level: 2, text: "How to Prepare for Professional Treatment Access" },
      { level: 2, text: "Disclaimer: General Information Only" }
    ],
    content: "Pest outbreaks in rented properties can lead to stressful disputes between landlords and tenants. Resolving these issues quickly requires clear communication, understanding who handles what under general UK housing standards, and professional evidence-gathering. This guide explains how responsibilities are typically evaluated.\n\n### The Structural Integrity Factor (Landlord Duty)\nUnder the Landlord and Tenant Act 1985, landlords must ensure the property is fit for human habitation. This includes keeping the exterior shell, drains, and roof timbers in good repair. If pests (such as rats or squirrels) enter due to structural defects—like a cracked sewer pipe, rotten fascia boards, or unsealed brick holes—the landlord is generally responsible for arranging and paying for professional extermination and proofing.\n\n### The Hygiene and Housekeeping Factor (Tenant Duty)\nTenants are expected to use the property in a tenant-like manner. This includes maintaining cleanliness, disposing of food wastes in sealed bins, and preventing conditions that attract pests. If an infestation (such as mice or cockroaches) is caused by food wastes being left exposed, unmanaged domestic debris, or failing to report issues promptly, the tenant may be held responsible for treatment costs.\n\n### How to Properly Document Pest Evidence\nTo prevent disputes, both parties should document evidence immediately:\n- Tenants should take clear photographs of droppings, damage, or entry gaps as soon as they are noticed.\n- Report the issue in writing (email or SMS) to the landlord or managing agent, documenting the exact date of discovery.\n- Avoid trying to seal holes yourself with improper materials, as this can trap rodents inside and hinder professional inspection.\n\n### How to Prepare for Professional Treatment Access\nOnce a pest controller is booked:\n- Tenants must grant access for all scheduled visits (typically 2-3 visits for rodents) to ensure treatments are complete and successful.\n- Follow the preparation sheet provided by the technician (such as emptying kitchen cupboards or hot washing clothing for bed bugs) to guarantee chemical or steam efficacy.\n\n### Disclaimer: General Information Only\nThe content of this article is provided as general informational guidance and does not constitute formal legal advice. Renters and landlords seeking specific legal rulings should consult Citizens Advice, their local borough council's Environmental Health department, or a qualified housing solicitor."
  }
];

export const caseStudiesList: CaseStudy[] = [
  {
    slug: "hampstead-loft-squirrel-proofing",
    title: "Structural Loft Squirrel Exclusion in Hampstead Residence",
    dateOrMonth: "June 2026",
    broadLocation: "Hampstead",
    postcodeDistrict: "NW3",
    propertyType: "Victorian Semi-Detached House",
    pest: "squirrels",
    customerType: "Residential",
    initialSigns: [
      "Extremely loud thumping and scratching noises in the loft ceiling at 5:30am daily",
      "Wood shavings falling through a ceiling spotlight fixture",
      "Debris on the lawn under the roof eaves line"
    ],
    inspectionFindings: [
      "Invasive Grey Squirrel drey constructed inside the loft insulation layers",
      "Roof soffit fascia timber rotted and chewed through, creating a 12cm ingress gap",
      "Mains electrical lighting cable chewed clean to copper wiring cores (severe fire risk)"
    ],
    contributingConditions: [
      "Large oak tree branches overhanging the roof line, creating an easy climbing path for squirrels",
      "Degraded wooden fascia boards showing wet rot"
    ],
    actionsCompleted: [
      "Setup legal spring traps in the loft, checked every 24 hours in compliance with UK law",
      "Safely dispatched 3 invasive grey squirrels",
      "Constructed a high-tensile heavy galvanized wire mesh frame across the entire soffit line",
      "Applied weather-proof structural timber repairs to seal the entry gap permanently"
    ],
    followUp: [
      "Inspected loft rafters 7 days later; confirmed zero noises and zero additional drey building activity",
      "Customer advised to trim tree branches back by 2.5 metres"
    ],
    outcome: "Complete elimination of active squirrel colony and permanent structural protection backed by our 10-year proofing warranty. Fire hazard resolved by building electrician.",
    preventionRecommendations: [
      "Trim overhanging branches at least 2.5 metres away from the roof tile margins.",
      "Inspect roof soffits and gutters annually for timber rot."
    ],
    imageConsentStatus: true,
    imageAlt: "Upload actual rodent proofing before-and-after photographs showing high-tensile wire mesh installation on eaves",
    customerQuotation: "The noise at dawn was unbearable, and the discovery of the chewed electrical cables was terrifying. GLPC resolved the issue quickly, repaired our rotten roof soffits, and sealed the gaps permanently. Extremely professional service.",
    customerQuotationConsent: true,
    technicianName: "Marcus Thorne (Senior Technician)",
    relatedPest: "squirrels",
    relatedService: "squirrel-control",
    relatedLocation: "hampstead",
    privacyRedactionStatus: true
  },
  {
    slug: "london-bridge-restaurant-mouse-proofing",
    title: "SALSA Audit Compliant Rodent Sealing for London Bridge Restaurant",
    dateOrMonth: "May 2026",
    broadLocation: "London Bridge",
    postcodeDistrict: "SE1",
    propertyType: "Commercial Restaurant Premises",
    pest: "mice",
    customerType: "Commercial",
    initialSigns: [
      "Mouse droppings detected behind stainless steel prep lines during kitchen close",
      "Gnawed cardboard dry-stock packaging in basement dry storeroom",
      "EHO inspection warning of potential hygiene rating downgrade"
    ],
    inspectionFindings: [
      "Multiple mouse entry holes under kitchen kickboards where gas pipes penetrated the sub-floor",
      "Defective structural mortar gaps in historic brick basement foundation shared with adjoining units",
      "No pre-existing preventative monitoring system in place"
    ],
    contributingConditions: [
      "Shared subterranean basement layout in a historic brick terrace block",
      "Accumulated grease behind heavy cooking lines acting as food attractant"
    ],
    actionsCompleted: [
      "Executed a comprehensive night-time diagnostic survey with fluorescent tracer powders",
      "Precision sealed every single pipe penetration using heavy stainless steel wire wool backed with high-expansion mastic",
      "Placed highly palatable professional gel and trap monitors in non-exposed cavities",
      "Supplied physical Pest Log Folder containing RAMS, qualifications, and COSHH compliance sheets"
    ],
    followUp: [
      "Completed 2 weekly follow-up audits; cleared dead rodent material and verified zero new droppings",
      "Assisted restaurant during EHO visit, securing an immediate 5-star hygiene rating"
    ],
    outcome: "Complete mouse eradication, 100% structural exclusion of the kitchen perimeter, and establishment of a compliant quarterly Pest Prevention Contract.",
    preventionRecommendations: [
      "Clean heavy cooking lines and sweep grease pools daily.",
      "Store dry grains and pasta in sturdy hard plastic air-tight tubs."
    ],
    imageConsentStatus: true,
    imageAlt: "Upload authorised commercial monitoring-station photograph under kitchen counters",
    customerQuotation: "GLPC saved our restaurant from a hygiene rating disaster. Marcus came out at midnight, diagnosed the exact gaps, sealed our kitchen completely, and set up our pest folders. Our food rating is back to 5 stars.",
    customerQuotationConsent: true,
    technicianName: "Marcus Thorne",
    relatedPest: "mice",
    relatedService: "commercial-contracts",
    relatedLocation: "london-bridge",
    privacyRedactionStatus: true
  }
];

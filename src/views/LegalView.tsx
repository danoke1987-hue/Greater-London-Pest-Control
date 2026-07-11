/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { updatePageMetadata, Link } from '../lib/router';
import { siteSettings } from '../data/business';
import { Shield } from 'lucide-react';

interface LegalViewProps {
  page: 'privacy' | 'cookies' | 'terms' | 'complaints' | 'accessibility' | 'disclaimer';
}

export default function LegalView({ page }: LegalViewProps) {
  
  const getPageData = () => {
    switch (page) {
      case 'privacy':
        return {
          title: "Privacy Policy",
          seoTitle: "GDPR Privacy Policy | Greater London Pest Control",
          metaDesc: "How Greater London Pest Control processes customer data under GDPR and the Data Protection Act 2018. Read our data protection standards.",
          canonical: `https://${siteSettings.domain}/privacy-policy`,
          content: `
### 1. Introduction and General Policy
Greater London Pest Control ("we", "us", or "our") is committed to protecting and respecting your data privacy. This Privacy Policy explains how we collect, store, use, and process your personal data in compliance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.

### 2. Information We Collect
We collect personal information that you provide voluntarily when using our postcode checker, submitting contact or quote request forms, or booking services. This information may include:
- Your name, phone number, and email address.
- Your residential or commercial physical address (necessary to dispatch field technicians).
- Description of your structural pest concerns, and any photographs uploaded via our forms.

### 3. How We Use Your Personal Data
We process your personal information strictly on legitimate legal bases to fulfill our contractual commitments to you, including:
- Booking diagnostic surveys and active pest treatments.
- Coordinating with tenants regarding preparation, access, and appointment times.
- Documenting safety audits, COSHH registers, and treatment warranties.
- Responding to enquiries and service feedback.

### 4. Data Sharing and Privacy Limits
We do not sell, rent, or trade your personal data to third parties. We may disclose your data to certified subcontractor technicians under strict data-protection agreements, solely to perform structural physical treatment works on your behalf.
          `
        };
      case 'cookies':
        return {
          title: "Cookie Policy",
          seoTitle: "Cookie Policy & Privacy Preferences | GLPC London",
          metaDesc: "Information about how we use cookies and tracking scripts on our Greater London pest control website. Read our ICO compliance parameters.",
          canonical: `https://${siteSettings.domain}/cookie-policy`,
          content: `
### 1. What Are Cookies
Cookies are small text files stored on your computer or mobile device when you visit websites. They are widely used to make websites work more efficiently and to provide statistical traffic reports to site owners.

### 2. How We Use Cookies
We utilize standard, secure cookies to optimize your browsing experience on our platform, specifically:
- **Strictly Necessary Cookies:** Essential to let you navigate the site, complete forms, and verify postcode serviceability.
- **Performance Cookies:** To monitor aggregated, completely anonymous site traffic (via Google Analytics / GTM) to evaluate page speeds, user pathways, and site performance. We never associate cookie traffic with private customer addresses or names.

### 3. Managing Cookie Preferences
You can control, block, or delete cookies at any time via your browser settings. Please note that disabling strictly necessary cookies may prevent our postcode checker and callback scheduler from functioning as intended.
          `
        };
      case 'terms':
        return {
          title: "Terms and Conditions",
          seoTitle: "Terms and Conditions of Service | GLPC London",
          metaDesc: "Read our official terms of service, payment parameters, booking cancellation policies, and treatment guarantees. Fully BPCA compliant.",
          canonical: `https://${siteSettings.domain}/terms-and-conditions`,
          content: `
### 1. Formation of Contract and Bookings
These Terms and Conditions govern all diagnostic surveys, preventative contracts, and active physical pest treatments provided by Greater London Pest Control. A binding contract is formed when you confirm a survey booking either in writing or verbally.

### 2. Pricing and Surveys
Our standard inspection and diagnostic survey fee is £120. This fee is fully deductible from any subsequent treatment package agreed. All treatment prices are agreed upon in writing prior to active treatments. Standard prices depend on property structure size and proofing levels.

### 3. Treatment and Exclusion Guarantees
Structural proofing works are backed by written warranties, valid for the duration specified in your service contract. Warranties are conditional on occupant compliance with mandatory preparation sheets and hygiene recommendations. If a warranty claim is validated, we will return and re-treat at no additional cost.

### 4. Cancellations and Access
If you need to reschedule or cancel an appointment, please provide at least 24 hours' written or verbal notice. If our technicians cannot gain safe access to your property at the scheduled time, a standard missed-visit charge may apply.
          `
        };
      case 'complaints':
        return {
          title: "Complaints Procedure",
          seoTitle: "Complaints Handling & Resolutions Procedure",
          metaDesc: "Our official, structured complaints handling process. How to report service issues and escalate matters to the British Pest Control Association.",
          canonical: `https://${siteSettings.domain}/complaints-procedure`,
          content: `
### 1. Our Commitment to Resolutions
Greater London Pest Control is dedicated to providing accredited, professional structural treatments. If we fail to meet your expectations, we want to know so we can resolve the issue immediately. This complaints procedure outlines how to report concerns.

### 2. How to File a Complaint
If you are dissatisfied with a service, survey, or treatment outcome, please contact us directly:
- **By Email:** ${siteSettings.email}
- **By Phone:** ${siteSettings.standardPhone}
Please include your reference number, property address, and a clear description of your concerns.

### 3. Investigation and Response Timeline
Upon receiving a formal complaint, we will:
1. Issue a written acknowledgment of your complaint within 2 business days.
2. Direct a senior field biologist to review your case logs, site RAMS, and treatment records.
3. Deliver a complete written investigation outcome and proposed resolution within 10 business days.

### 4. BPCA Arbitration Escalation
If our internal investigation does not resolve your concerns to your satisfaction, you may escalate the dispute to the British Pest Control Association (BPCA) for independent, certified arbitration.
          `
        };
      case 'accessibility':
        return {
          title: "Accessibility Statement",
          seoTitle: "Web Accessibility Statement | WCAG 2.2 AA",
          metaDesc: "Greater London Pest Control's commitment to web accessibility. Our conformance status under WCAG 2.2 AA design guidelines.",
          canonical: `https://${siteSettings.domain}/accessibility-statement`,
          content: `
### 1. Commitment to Accessibility
Greater London Pest Control is committed to ensuring that our website is accessible to everyone, including individuals with visual, auditory, cognitive, or motor impairments. We aim for full WCAG 2.2 Level AA conformance.

### 2. Accessibility Features Implemented
This website has been built to support accessibility by default, utilizing:
- High contrast, legible typography (Inter and monospace system accents) meeting strict color-contrast guidelines.
- Clean, semantic HTML tags, ARIA labels, and logical page hierarchies to ensure compatibility with screen readers.
- Fully keyboard-navigable controls, with skip links to easily bypass navigation menus.
- Clear, ungrotesque labels and accessible form error validations.

### 3. Feedback and Support
If you encounter any accessibility barriers on our platform, please let us know. We welcome your feedback to help us maintain WCAG compliance:
- **Email:** ${siteSettings.email}
          `
        };
      case 'disclaimer':
        return {
          title: "Website Disclaimer",
          seoTitle: "Website & Information Liability Disclaimer | GLPC",
          metaDesc: "Website disclaimer regarding general info and advice. Read our liability bounds and council alignment details.",
          canonical: `https://${siteSettings.domain}/website-disclaimer`,
          content: `
### 1. Accuracy of Information
The material and advice contained on this website are provided for general informational purposes only. While we make every effort to ensure the accuracy and reliability of the information, we make no guarantees, express or implied, regarding its completeness or applicability to your unique structural circumstances.

### 2. Professional Boundaries
Pest eradication and structural proofing require specialized training, certified chemical applications, and RSPH Level 2 qualifications. Do not attempt hazardous biological treatments or structural exclusions without professional equipment. Greater London Pest Control accepts no liability for injury, damage, or data loss arising from reliance on general web articles.

### 3. External Links
Our website contains reference links to external third-party sites, including municipal London Borough Council environmental health departments. We do not control or endorse the content, safety, or privacy policies of these external websites.
          `
        };
    }
  };

  const data = getPageData();

  useEffect(() => {
    updatePageMetadata(data.seoTitle, data.metaDesc, data.canonical);
  }, [page]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 text-left" id={`legal-page-${page}`}>
      
      {/* 1. Header Navigation & Main Titles */}
      <div className="border-b border-gray-100 pb-8">
        <nav className="flex text-xs font-semibold text-gray-400 gap-1.5 mb-4">
          <Link href="/" className="hover:text-gray-600">Home</Link>
          <span>/</span>
          <span className="text-gray-600">{data.title}</span>
        </nav>
        
        <div className="flex flex-col gap-3">
          <div className="inline-flex max-w-max items-center gap-1.5 rounded bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
            <Shield className="h-3.5 w-3.5" />
            <span>Official Corporate Policy</span>
          </div>
          <h1 className="font-sans text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl">
            {data.title}
          </h1>
          <p className="text-xs text-gray-400 font-semibold mt-1">
            Effective Date: July 11, 2026 &bull; Greater London Pest Control Ltd.
          </p>
        </div>
      </div>

      {/* 2. Structured Policy Text Block */}
      <div className="mt-12 prose prose-sm prose-emerald text-gray-700 leading-relaxed max-w-none text-xs sm:text-sm flex flex-col gap-6">
        {data.content.split('\n\n').filter(p => p.trim() !== '').map((paragraph, idx) => {
          if (paragraph.startsWith('###')) {
            return (
              <h2 key={idx} className="font-sans text-lg font-bold text-gray-950 mt-6 border-l-4 border-emerald-500 pl-3">
                {paragraph.replace('###', '').trim()}
              </h2>
            );
          }
          if (paragraph.startsWith('1.') || paragraph.startsWith('-')) {
            const items = paragraph.split('\n');
            return (
              <ul key={idx} className="list-inside list-disc flex flex-col gap-1.5 pl-2">
                {items.map((item, itemIdx) => (
                  <li key={itemIdx}>{item.replace(/^[-1.]\s*/, '').trim()}</li>
                ))}
              </ul>
            );
          }
          return (
            <p key={idx} className="leading-relaxed">
              {paragraph}
            </p>
          );
        })}
      </div>

    </div>
  );
}

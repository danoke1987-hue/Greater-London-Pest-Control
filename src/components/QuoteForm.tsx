/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { trackEvent } from '../lib/analytics';
import { siteSettings } from '../data/business';
import { Upload, AlertCircle, CheckCircle, ArrowRight, Phone } from 'lucide-react';

export default function QuoteForm() {
  // Form Fields State
  const [formData, setFormData] = useState({
    name: '',
    telephone: '',
    email: '',
    postcode: '',
    propertyType: 'Flat',
    customerType: 'Residential',
    pestType: 'Unsure',
    location: 'Kitchen',
    firstNoticed: 'This week',
    preferredContact: 'Telephone',
    preferredTiming: 'As soon as possible',
    details: '',
    privacyConsent: false,
    honeypot: '', // Spam protection
  });

  // Client-side File Upload State
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Validation / Submission State
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formStarted, setFormStarted] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const errorSummaryRef = useRef<HTMLDivElement>(null);

  // Trigger form_start analytics safely on first focus
  const handleFormStart = () => {
    if (!formStarted) {
      setFormStarted(true);
      trackEvent({ event: 'quote_form_start' });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Drag and Drop File Handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Only image files (JPEG, PNG, WEBP) are supported for verification.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('Maximum file size is 5MB.');
      return;
    }
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  // Validation Rules
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Name
    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your full name.';
    }

    // Phone: sensible UK phone check
    const cleanPhone = formData.telephone.replace(/[\s()-]/g, '');
    const ukPhoneRegex = /^(?:(?:\+44\s?|0)7[5-9]\d{8}|(?:\+44\s?|0)[12389]\d{8,9})$/;
    if (!cleanPhone) {
      newErrors.telephone = 'Please enter a contact telephone number.';
    } else if (!ukPhoneRegex.test(cleanPhone)) {
      newErrors.telephone = 'Please enter a valid UK telephone number (e.g. 020 8064 0320).';
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address.';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    // Postcode: sensible UK outward postcode validation
    const cleanPostcode = formData.postcode.replace(/\s+/g, '').toUpperCase();
    const outwardRegex = /^[A-Z]{1,2}[0-9][A-Z0-9]?([0-9][A-Z]{2})?$/;
    if (!cleanPostcode) {
      newErrors.postcode = 'Please enter a UK postcode.';
    } else if (!outwardRegex.test(cleanPostcode)) {
      newErrors.postcode = 'Please enter a valid UK postcode (e.g. SE1 1NP).';
    }

    // Consent
    if (!formData.privacyConsent) {
      newErrors.privacyConsent = 'You must review and accept the privacy policy to submit an enquiry.';
    }

    setErrors(newErrors);

    // Track validation errors in analytics safely
    Object.entries(newErrors).forEach(([field, msg]) => {
      trackEvent({
        event: 'form_error',
        error_field: field,
        error_message: msg,
      });
    });

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot spam trap
    if (formData.honeypot) {
      console.warn('Spam submission detected and discarded via honeypot.');
      return;
    }

    if (!validateForm()) {
      // Focus error summary for accessibility screen readers
      setTimeout(() => {
        errorSummaryRef.current?.focus();
      }, 100);
      return;
    }

    setIsSubmitting(true);

    // Simulate submission to server (as standard SPA backend pipeline placeholder)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      // Track successful form submission safely (NEVER include names or phone numbers in event!)
      trackEvent({
        event: 'quote_form_submit',
        property_type: formData.propertyType,
        pest_type: formData.pestType,
      });
    }, 1500);
  };

  return (
    <div className="w-full rounded-2xl border border-gray-100 bg-white p-6 shadow-xl shadow-gray-100/30 sm:p-8" id="quote-form-container">
      {/* Success View */}
      {isSuccess ? (
        <div className="flex flex-col items-center justify-center text-center py-12" id="quote-success-panel">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <CheckCircle className="h-10 w-10" />
          </div>
          <h3 className="mt-5 font-sans text-xl font-bold tracking-tight text-gray-950 sm:text-2xl">
            Enquiry Received Successfully
          </h3>
          <p className="mt-3 max-w-md text-sm text-gray-600 leading-relaxed">
            Thank you, <strong>{formData.name}</strong>. Your enquiry details have been routed to our on-call technician for <strong>{formData.postcode.toUpperCase()}</strong>. We will contact you via {formData.preferredContact} within 30 minutes to confirm your scheduling options.
          </p>
          <div className="mt-8 rounded-xl bg-gray-50 p-5 border border-gray-100 w-full max-w-sm">
            <span className="font-mono text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
              Reference Code
            </span>
            <span className="font-mono text-base font-bold text-gray-900 mt-1 block">
              GLPC-Q-{Math.floor(100000 + Math.random() * 900000)}
            </span>
          </div>
          <button
            onClick={() => {
              setIsSuccess(false);
              setFormData({
                name: '',
                telephone: '',
                email: '',
                postcode: '',
                propertyType: 'Flat',
                customerType: 'Residential',
                pestType: 'Unsure',
                location: 'Kitchen',
                firstNoticed: 'This week',
                preferredContact: 'Telephone',
                preferredTiming: 'As soon as possible',
                details: '',
                privacyConsent: false,
                honeypot: '',
              });
              setImageFile(null);
              setImagePreview(null);
            }}
            className="mt-8 flex items-center justify-center gap-1.5 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-xs font-bold text-gray-700 hover:bg-gray-50"
          >
            Submit Another Enquiry
          </button>
        </div>
      ) : (
        /* Form View */
        <form onSubmit={handleSubmit} onFocus={handleFormStart} className="flex flex-col gap-6" noValidate>
          
          {/* Emergency Alert Box */}
          <div className="rounded-xl border border-red-100 bg-red-50/60 p-4.5 text-red-950 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
            <div className="flex flex-col gap-1.5 text-xs">
              <span className="font-bold uppercase tracking-wider text-red-700">
                Is this a structural emergency?
              </span>
              <p className="leading-relaxed">
                If you have active wasps inside a school zone, severe residential bed bugs, or rats running inside active food zones, please call our 24H priority line immediately.
              </p>
              <div>
                <a href={`tel:${siteSettings.emergencyPhone.replace(/\s+/g, '')}`} className="font-bold underline text-red-700 hover:text-red-900 flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  <span>Call {siteSettings.emergencyPhone} Now &rarr;</span>
                </a>
              </div>
            </div>
          </div>

          {/* Accessibility Error Summary */}
          {Object.keys(errors).length > 0 && (
            <div
              ref={errorSummaryRef}
              tabIndex={-1}
              className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-900 focus:outline-none focus:ring-2 focus:ring-red-600"
              aria-label="Form validation error summary"
            >
              <h4 className="font-bold">Please correct the following errors before submitting:</h4>
              <ul className="mt-2 list-inside list-disc flex flex-col gap-1">
                {Object.entries(errors).map(([field, msg]) => (
                  <li key={field}>{msg}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Spam Prevention Honeypot (Hidden) */}
          <div className="absolute opacity-0 -z-50 pointer-events-none" aria-hidden="true">
            <label htmlFor="form-honeypot-input">Do not fill this if you are human</label>
            <input
              id="form-honeypot-input"
              type="text"
              name="honeypot"
              value={formData.honeypot}
              onChange={handleInputChange}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* 1. Personal & Location Basics */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            
            {/* Full Name */}
            <div className="flex flex-col gap-2">
              <label htmlFor="quote-name" className="text-xs font-bold text-gray-800 uppercase tracking-wide">
                Full Name <span className="text-red-600" aria-hidden="true">*</span>
              </label>
              <input
                id="quote-name"
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full rounded-xl border px-4 py-3 text-sm font-semibold text-gray-900 focus:border-emerald-600 focus:outline-none focus:ring-3 focus:ring-emerald-600/15 ${
                  errors.name ? 'border-red-300 bg-red-50/20' : 'border-gray-200 bg-gray-50/30'
                }`}
              />
            </div>

            {/* Telephone */}
            <div className="flex flex-col gap-2">
              <label htmlFor="quote-telephone" className="text-xs font-bold text-gray-800 uppercase tracking-wide">
                UK Contact Phone <span className="text-red-600" aria-hidden="true">*</span>
              </label>
              <input
                id="quote-telephone"
                type="tel"
                name="telephone"
                required
                placeholder="e.g. 07700 900077"
                value={formData.telephone}
                onChange={handleInputChange}
                className={`w-full rounded-xl border px-4 py-3 text-sm font-semibold text-gray-900 focus:border-emerald-600 focus:outline-none focus:ring-3 focus:ring-emerald-600/15 ${
                  errors.telephone ? 'border-red-300 bg-red-50/20' : 'border-gray-200 bg-gray-50/30'
                }`}
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label htmlFor="quote-email" className="text-xs font-bold text-gray-800 uppercase tracking-wide">
                Email Address <span className="text-red-600" aria-hidden="true">*</span>
              </label>
              <input
                id="quote-email"
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full rounded-xl border px-4 py-3 text-sm font-semibold text-gray-900 focus:border-emerald-600 focus:outline-none focus:ring-3 focus:ring-emerald-600/15 ${
                  errors.email ? 'border-red-300 bg-red-50/20' : 'border-gray-200 bg-gray-50/30'
                }`}
              />
            </div>

            {/* Postcode */}
            <div className="flex flex-col gap-2">
              <label htmlFor="quote-postcode" className="text-xs font-bold text-gray-800 uppercase tracking-wide">
                UK Postcode <span className="text-red-600" aria-hidden="true">*</span>
              </label>
              <input
                id="quote-postcode"
                type="text"
                name="postcode"
                required
                placeholder="e.g. SE1 1NP"
                value={formData.postcode}
                onChange={handleInputChange}
                className={`w-full rounded-xl border px-4 py-3 text-sm font-semibold text-gray-900 focus:border-emerald-600 focus:outline-none focus:ring-3 focus:ring-emerald-600/15 ${
                  errors.postcode ? 'border-red-300 bg-red-50/20' : 'border-gray-200 bg-gray-50/30'
                }`}
              />
            </div>

          </div>

          {/* 2. Property & Client Details */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            
            {/* Customer Type */}
            <div className="flex flex-col gap-2">
              <label htmlFor="quote-customer-type" className="text-xs font-bold text-gray-800 uppercase tracking-wide">
                Client Sector
              </label>
              <select
                id="quote-customer-type"
                name="customerType"
                value={formData.customerType}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm font-semibold text-gray-900 focus:border-emerald-600 focus:outline-none focus:ring-3 focus:ring-emerald-600/15"
              >
                <option value="Residential">Residential Homeowner</option>
                <option value="Commercial">Commercial Business</option>
                <option value="Landlord">Landlord / Property Manager</option>
              </select>
            </div>

            {/* Property Structure */}
            <div className="flex flex-col gap-2">
              <label htmlFor="quote-property-type" className="text-xs font-bold text-gray-800 uppercase tracking-wide">
                Property Type
              </label>
              <select
                id="quote-property-type"
                name="propertyType"
                value={formData.propertyType}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm font-semibold text-gray-900 focus:border-emerald-600 focus:outline-none focus:ring-3 focus:ring-emerald-600/15"
              >
                <option value="Flat">Flat / Apartment</option>
                <option value="Terraced">Terraced House</option>
                <option value="Semi-Detached">Semi-Detached House</option>
                <option value="Detached">Detached House</option>
                <option value="Restaurant">Restaurant / Café</option>
                <option value="Office">Commercial Office</option>
                <option value="Retail">Retail Store</option>
                <option value="Warehouse">Industrial Warehouse</option>
                <option value="Other">Other Structure</option>
              </select>
            </div>

            {/* Pest Type */}
            <div className="flex flex-col gap-2">
              <label htmlFor="quote-pest-type" className="text-xs font-bold text-gray-800 uppercase tracking-wide">
                Pest Problem
              </label>
              <select
                id="quote-pest-type"
                name="pestType"
                value={formData.pestType}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm font-semibold text-gray-900 focus:border-emerald-600 focus:outline-none focus:ring-3 focus:ring-emerald-600/15"
              >
                <option value="Unsure">Unsure (Free Diagnosis Required)</option>
                <option value="Mice">House Mice</option>
                <option value="Rats">Rats (Brown/Black)</option>
                <option value="Bed Bugs">Bed Bugs</option>
                <option value="Cockroaches">Cockroaches</option>
                <option value="Wasps">Wasps / Hornets</option>
                <option value="Ants">Garden Ants</option>
                <option value="Fleas">Fleas</option>
                <option value="Moths">Clothes Moths</option>
                <option value="Squirrels">Grey Squirrels</option>
                <option value="Pigeons">Feral Pigeons</option>
                <option value="Other">Other / Biting Insects</option>
              </select>
            </div>

          </div>

          {/* 3. Infestation Details */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            
            {/* Infestation Location */}
            <div className="flex flex-col gap-2">
              <label htmlFor="quote-location" className="text-xs font-bold text-gray-800 uppercase tracking-wide">
                Pest Location
              </label>
              <select
                id="quote-location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm font-semibold text-gray-900 focus:border-emerald-600 focus:outline-none focus:ring-3 focus:ring-emerald-600/15"
              >
                <option value="Kitchen">Kitchen area</option>
                <option value="Bedroom">Bedroom area</option>
                <option value="Loft">Loft space / Rafters</option>
                <option value="Boiler Room">Boiler room / Utility</option>
                <option value="Garden">Outside / Garden borders</option>
                <option value="Sewer/Drain">Drain lines / Sewer chambers</option>
                <option value="Commercial Prep">Commercial Prep Kitchen</option>
                <option value="Other">Other Area</option>
              </select>
            </div>

            {/* First Noticed */}
            <div className="flex flex-col gap-2">
              <label htmlFor="quote-first-noticed" className="text-xs font-bold text-gray-800 uppercase tracking-wide">
                First Noticed
              </label>
              <select
                id="quote-first-noticed"
                name="firstNoticed"
                value={formData.firstNoticed}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm font-semibold text-gray-900 focus:border-emerald-600 focus:outline-none focus:ring-3 focus:ring-emerald-600/15"
              >
                <option value="Today">Today (Immediate Action Needed)</option>
                <option value="This week">This week</option>
                <option value="Last 2 weeks">Within last 2 weeks</option>
                <option value="Over a month ago">Over a month ago</option>
              </select>
            </div>

            {/* Contact Method */}
            <div className="flex flex-col gap-2">
              <label htmlFor="quote-contact-method" className="text-xs font-bold text-gray-800 uppercase tracking-wide">
                Preferred Callback
              </label>
              <select
                id="quote-contact-method"
                name="preferredContact"
                value={formData.preferredContact}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm font-semibold text-gray-900 focus:border-emerald-600 focus:outline-none focus:ring-3 focus:ring-emerald-600/15"
              >
                <option value="Telephone">Telephone Call</option>
                <option value="Email">Email Message</option>
                <option value="SMS">SMS Text Message</option>
                <option value="WhatsApp">WhatsApp Chat</option>
              </select>
            </div>

          </div>

          {/* Timing & Long Details */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            
            {/* Preferred Timing */}
            <div className="flex flex-col gap-2 md:col-span-1">
              <label htmlFor="quote-timing" className="text-xs font-bold text-gray-800 uppercase tracking-wide">
                Preferred Appointment
              </label>
              <select
                id="quote-timing"
                name="preferredTiming"
                value={formData.preferredTiming}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm font-semibold text-gray-900 focus:border-emerald-600 focus:outline-none focus:ring-3 focus:ring-emerald-600/15"
              >
                <option value="As soon as possible">As soon as possible</option>
                <option value="Morning 7am-12pm">Morning (7am - 12pm)</option>
                <option value="Afternoon 12pm-5pm">Afternoon (12pm - 5pm)</option>
                <option value="Evening 5pm-10pm">Evening (5pm - 10pm)</option>
              </select>
            </div>

            {/* Additional Details */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <label htmlFor="quote-details" className="text-xs font-bold text-gray-800 uppercase tracking-wide">
                Brief Infestation Details
              </label>
              <textarea
                id="quote-details"
                name="details"
                placeholder="Please describe any scratching sounds, specific droppings seen, or biting activities..."
                rows={3}
                value={formData.details}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-gray-200 bg-gray-50/30 px-4 py-3.5 text-sm font-semibold text-gray-900 focus:border-emerald-600 focus:outline-none focus:ring-3 focus:ring-emerald-600/15"
              />
            </div>

          </div>

          {/* Drag and Drop Image Upload */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-gray-800 uppercase tracking-wide block">
              Upload Verification Photograph (Optional)
            </span>
            
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={triggerFileSelect}
              className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                isDragging
                  ? 'border-emerald-600 bg-emerald-50/40'
                  : imageFile
                  ? 'border-emerald-500 bg-emerald-50/10'
                  : 'border-gray-200 bg-gray-50/20 hover:border-emerald-500 hover:bg-gray-50/40'
              }`}
              id="quote-image-dropzone"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                id="quote-image-input"
              />
              
              {imagePreview ? (
                <div className="flex flex-col items-center gap-3">
                  <img
                    src={imagePreview}
                    alt="Uploaded pest verification preview"
                    className="h-28 w-28 rounded-lg object-cover border border-emerald-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="text-xs text-gray-600">
                    <span className="font-bold text-emerald-800">{imageFile?.name}</span> ({( (imageFile?.size || 0) / (1024 * 1024) ).toFixed(2)} MB)
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setImageFile(null);
                      setImagePreview(null);
                    }}
                    className="text-xs font-bold text-red-600 hover:underline"
                  >
                    Clear Selected Image
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white shadow-sm text-gray-400">
                    <Upload className="h-5.5 w-5.5 stroke-[2.2]" />
                  </div>
                  <p className="text-sm font-semibold text-gray-800">
                    Drag and drop your pest photo here, or <span className="text-emerald-700 underline">browse computer</span>
                  </p>
                  <p className="text-xs text-gray-500 leading-normal">
                    JPG, PNG, or WEBP. Max size 5MB. Photo will be reviewed by a BPCA entomologist for free diagnosis.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Privacy Consent Checkbox (REQUIRED, NOT PRESELECTED) */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-start gap-3">
              <input
                id="quote-privacy"
                type="checkbox"
                name="privacyConsent"
                checked={formData.privacyConsent}
                onChange={handleInputChange}
                className={`h-5 w-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-600 mt-0.5 ${
                  errors.privacyConsent ? 'ring-2 ring-red-500' : ''
                }`}
              />
              <label htmlFor="quote-privacy" className="text-xs text-gray-600 leading-relaxed">
                I hereby consent to GLPC Limited storing my contact information securely to coordinate my pest control callback and survey. I understand that my private personal details are never processed for advertising, sold, or shared with third parties. <span className="text-red-600 font-bold" aria-hidden="true">*</span>
              </label>
            </div>
            {errors.privacyConsent && (
              <span className="text-xs font-bold text-red-600 flex items-center gap-1">
                <AlertCircle className="h-3.5 w-3.5" />
                <span>{errors.privacyConsent}</span>
              </span>
            )}
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-4.5 text-base font-bold text-white shadow-md shadow-emerald-600/10 transition-all hover:bg-emerald-700 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-600 disabled:opacity-50 active:scale-99"
          >
            {isSubmitting ? (
              <span>Submitting Callback Request...</span>
            ) : (
              <>
                <span>Submit Callback Request</span>
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </button>

        </form>
      )}
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { updatePageMetadata, Link } from '../lib/router';
import { siteSettings } from '../data/business';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Database, 
  Users, 
  Globe, 
  Settings, 
  AlertTriangle, 
  FileText, 
  RefreshCw, 
  Search, 
  TrendingUp, 
  Mail, 
  Phone, 
  CheckCircle, 
  Lock 
} from 'lucide-react';

interface SeoStatRecord {
  outwardCode: string;
  postcodeArea: string;
  borough: string;
  served: boolean;
  verified: boolean;
  rawScore: number;
  gateStatus: 'published' | 'draft' | 'awaiting-data' | 'awaiting-review' | 'archived';
  isIndexable: boolean;
  warnings: string[];
}

interface LeadRecord {
  id: string;
  timestamp: string;
  name: string;
  phoneRedacted: string;
  emailRedacted: string;
  postcode: string;
  pestType: string;
  status: 'New' | 'Contacted' | 'Dispatched' | 'Completed';
  gdprConsentDate: string;
}

export default function AdminSeoView() {
  const [activeTab, setActiveTab] = useState<'scoring' | 'leads' | 'sitemaps'>('scoring');
  const [seoRecords, setSeoRecords] = useState<SeoStatRecord[]>([]);
  const [summary, setSummary] = useState({
    totalPostcodes: 0,
    indexablePostcodes: 0,
    noindexPostcodes: 0,
    draftPostcodes: 0,
    averageQualityScore: 0
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [scoreFilter, setScoreFilter] = useState<string>('all');
  const [overrideTarget, setOverrideTarget] = useState<string | null>(null);
  const [overrideValue, setOverrideValue] = useState<number>(100);
  const [overrideReason, setOverrideReason] = useState<string>('');
  
  // Simulated GDPR leads data matching local specifications
  const [leads, setLeads] = useState<LeadRecord[]>([
    {
      id: "GLPC-94021",
      timestamp: "2026-07-13T10:15:30Z",
      name: "John S****",
      phoneRedacted: "07700 90**** (Redacted)",
      emailRedacted: "jo******@gmail.com (Redacted)",
      postcode: "RM1",
      pestType: "Sewer Rats (Active)",
      status: "New",
      gdprConsentDate: "2026-07-13T10:15:28Z"
    },
    {
      id: "GLPC-94022",
      timestamp: "2026-07-13T09:02:11Z",
      name: "Clara M*****",
      phoneRedacted: "07700 91**** (Redacted)",
      emailRedacted: "cl******@hotmail.co.uk (Redacted)",
      postcode: "NW3",
      pestType: "Grey Squirrels (Loft)",
      status: "Contacted",
      gdprConsentDate: "2026-07-13T09:02:05Z"
    },
    {
      id: "GLPC-94023",
      timestamp: "2026-07-12T16:45:00Z",
      name: "Robert D***",
      phoneRedacted: "07700 95**** (Redacted)",
      emailRedacted: "ro******@corporate-hub.com (Redacted)",
      postcode: "SE1",
      pestType: "German Cockroaches (Kitchen)",
      status: "Dispatched",
      gdprConsentDate: "2026-07-12T16:44:50Z"
    },
    {
      id: "GLPC-94024",
      timestamp: "2026-07-11T11:20:00Z",
      name: "Amir K****",
      phoneRedacted: "07700 98**** (Redacted)",
      emailRedacted: "am******@outlook.com (Redacted)",
      postcode: "SW6",
      pestType: "Bed Bugs (Eradication)",
      status: "Completed",
      gdprConsentDate: "2026-07-11T11:19:45Z"
    }
  ]);

  useEffect(() => {
    updatePageMetadata("GLPC Admin | SEO Quality Gate & Lead Manager", "Admin dashboard for Greater London Pest Control.", "");
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/seo-stats');
      const data = await res.json();
      if (data && data.records) {
        setSeoRecords(data.records);
        setSummary(data.summary);
      }
    } catch (err) {
      console.error("Error fetching SEO stats:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyOverride = (outwardCode: string) => {
    if (!overrideReason.trim()) {
      alert("You must record a reason for overriding the quality gate!");
      return;
    }

    // Apply the score override locally for visualization
    setSeoRecords(prev => prev.map(rec => {
      if (rec.outwardCode === outwardCode) {
        return {
          ...rec,
          rawScore: overrideValue,
          isIndexable: overrideValue >= 85,
          warnings: [`Override applied: "${overrideReason}"`]
        };
      }
      return rec;
    }));

    setOverrideTarget(null);
    setOverrideReason('');
  };

  const handleUpdateLeadStatus = (leadId: string, newStatus: any) => {
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
  };

  // Search & Filter record logic
  const filteredRecords = seoRecords.filter(rec => {
    const matchesSearch = 
      rec.outwardCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.postcodeArea.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.borough.toLowerCase().includes(searchTerm.toLowerCase());
      
    if (scoreFilter === 'all') return matchesSearch;
    if (scoreFilter === 'indexable') return matchesSearch && rec.isIndexable;
    if (scoreFilter === 'noindex') return matchesSearch && !rec.isIndexable && rec.served;
    if (scoreFilter === 'draft') return matchesSearch && !rec.served;
    return matchesSearch;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 text-left" id="admin-seo-dashboard">
      
      {/* 1. Header Row */}
      <div className="border-b border-gray-150 pb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded tracking-wide uppercase">
            GLPC Security Portal &bull; SSL Encrypted
          </span>
          <h1 className="font-sans text-2xl font-extrabold text-gray-950 sm:text-3xl mt-1">
            Certified Administration Platform
          </h1>
          <p className="text-xs text-gray-600 mt-1">
            Programmatically audit structural postcode quality gates, technical XML sitemaps, and secure GDPR lead databases.
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={fetchStats}
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-xs font-bold text-gray-800 shadow-sm hover:bg-gray-50 transition-all"
          >
            <RefreshCw className="h-4 w-4 text-gray-500" />
            <span>Sync Live Telemetry</span>
          </button>
          <div className="flex items-center gap-1 rounded-lg bg-gray-950 px-3.5 py-2 text-xs font-bold text-white shadow-sm">
            <Lock className="h-3.5 w-3.5 text-emerald-500" />
            <span>HQ Secure</span>
          </div>
        </div>
      </div>

      {/* 2. Bento Statistics Cards */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        
        <div className="rounded-xl border border-gray-100 bg-white p-5 flex flex-col gap-1">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Postcodes</span>
          <span className="text-2xl font-black text-gray-950">{summary.totalPostcodes}</span>
          <span className="text-[10px] text-gray-500 mt-1">Mapped in database</span>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-5 flex flex-col gap-1">
          <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">Indexable Pages</span>
          <span className="text-2xl font-black text-emerald-600">{summary.indexablePostcodes}</span>
          <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded max-w-max font-bold mt-1">Gate Score &gt;= 85</span>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-5 flex flex-col gap-1">
          <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">Noindex Pages</span>
          <span className="text-2xl font-black text-amber-600">{summary.noindexPostcodes}</span>
          <span className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded max-w-max font-bold mt-1">Gate Score 70-84</span>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-5 flex flex-col gap-1">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Draft / Standby</span>
          <span className="text-2xl font-black text-gray-500">{summary.draftPostcodes}</span>
          <span className="text-[10px] text-gray-400 mt-1">Below index thresholds</span>
        </div>

        <div className="rounded-xl border border-emerald-100 bg-emerald-50/20 p-5 flex flex-col gap-1">
          <span className="text-[10px] font-bold text-emerald-950 uppercase tracking-wider">Average Quality Score</span>
          <span className="text-2xl font-black text-emerald-800">{summary.averageQualityScore}%</span>
          <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2 overflow-hidden">
            <div className="bg-emerald-600 h-1.5 rounded-full" style={{ width: `${summary.averageQualityScore}%` }} />
          </div>
        </div>

      </div>

      {/* 3. Navigation Tabs */}
      <div className="mt-8 border-b border-gray-150">
        <nav className="-mb-px flex space-x-6">
          <button
            onClick={() => setActiveTab('scoring')}
            className={`border-b-2 py-3 px-1 text-xs font-bold tracking-wider uppercase transition-all ${
              activeTab === 'scoring'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-gray-400 hover:border-gray-300 hover:text-gray-600'
            }`}
          >
            <span className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              <span>Postcode Quality Audit</span>
            </span>
          </button>

          <button
            onClick={() => setActiveTab('leads')}
            className={`border-b-2 py-3 px-1 text-xs font-bold tracking-wider uppercase transition-all ${
              activeTab === 'leads'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-gray-400 hover:border-gray-300 hover:text-gray-600'
            }`}
          >
            <span className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>GDPR Lead Database</span>
            </span>
          </button>

          <button
            onClick={() => setActiveTab('sitemaps')}
            className={`border-b-2 py-3 px-1 text-xs font-bold tracking-wider uppercase transition-all ${
              activeTab === 'sitemaps'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-gray-400 hover:border-gray-300 hover:text-gray-600'
            }`}
          >
            <span className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span>Sitemap Indexes & XML</span>
            </span>
          </button>
        </nav>
      </div>

      {/* 4. Tab Panels */}
      <div className="mt-6">
        
        {/* TAB 1: POSTCODE SCORING AUDIT */}
        {activeTab === 'scoring' && (
          <div className="flex flex-col gap-4">
            
            {/* Filter controls */}
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between border-b border-gray-50 pb-4">
              <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search outward code, borough..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-4 text-xs font-medium text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs text-gray-500 font-semibold shrink-0">Filter Status:</span>
                <select
                  value={scoreFilter}
                  onChange={(e) => setScoreFilter(e.target.value)}
                  className="rounded-lg border border-gray-200 bg-white py-1.5 px-3 text-xs font-bold text-gray-800 focus:border-emerald-500 focus:outline-none"
                >
                  <option value="all">Show All Districts</option>
                  <option value="indexable">Indexable Only (Score &gt;= 85)</option>
                  <option value="noindex">Noindex Only (Score 70-84)</option>
                  <option value="draft">Draft Only (Score &lt; 70)</option>
                </select>
              </div>
            </div>

            {/* List Table */}
            {loading ? (
              <div className="py-12 text-center text-xs text-gray-500">
                Syncing with server metrics...
              </div>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-gray-100 bg-white shadow-sm">
                <table className="min-w-full divide-y divide-gray-100 text-left">
                  <thead className="bg-gray-50">
                    <tr className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      <th className="px-5 py-3">Outward</th>
                      <th className="px-5 py-3">Borough</th>
                      <th className="px-5 py-3">Status Gate</th>
                      <th className="px-5 py-3">Score</th>
                      <th className="px-5 py-3">Security & Integrity Warning Logs</th>
                      <th className="px-5 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-xs">
                    {filteredRecords.map((rec) => (
                      <tr key={rec.outwardCode} className="hover:bg-gray-50/50">
                        <td className="px-5 py-4 font-extrabold text-gray-950">
                          {rec.outwardCode}
                          <span className="block font-semibold text-[10px] text-gray-400 mt-0.5">{rec.postcodeArea}</span>
                        </td>
                        <td className="px-5 py-4 capitalize text-gray-600 font-semibold">{rec.borough}</td>
                        <td className="px-5 py-4">
                          {rec.isIndexable ? (
                            <span className="inline-flex items-center gap-1 rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                              <ShieldCheck className="h-3 w-3 text-emerald-600" />
                              <span>index, follow</span>
                            </span>
                          ) : rec.served ? (
                            <span className="inline-flex items-center gap-1 rounded bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-800">
                              <ShieldAlert className="h-3 w-3 text-amber-600" />
                              <span>noindex, follow</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded bg-gray-100 px-2 py-0.5 text-[10px] font-bold text-gray-500">
                              <span>draft</span>
                            </span>
                          )}
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <span className={`font-black ${rec.rawScore >= 85 ? 'text-emerald-700' : rec.rawScore >= 70 ? 'text-amber-700' : 'text-gray-500'}`}>
                              {rec.rawScore}%
                            </span>
                            <div className="w-12 bg-gray-100 rounded-full h-1">
                              <div 
                                className={`h-1 rounded-full ${rec.rawScore >= 85 ? 'bg-emerald-600' : rec.rawScore >= 70 ? 'bg-amber-500' : 'bg-gray-400'}`} 
                                style={{ width: `${rec.rawScore}%` }} 
                              />
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-[11px]">
                          {rec.warnings.length === 0 ? (
                            <span className="text-emerald-700 font-bold flex items-center gap-1">
                              <CheckCircle className="h-3.5 w-3.5" />
                              <span>All quality requirements met perfectly.</span>
                            </span>
                          ) : (
                            <div className="flex flex-col gap-0.5 text-amber-800 font-semibold">
                              {rec.warnings.map((warn, i) => (
                                <span key={i} className="flex items-start gap-1">
                                  <AlertTriangle className="h-3 w-3 shrink-0 text-amber-600 mt-0.5" />
                                  <span>{warn}</span>
                                </span>
                              ))}
                            </div>
                          )}
                        </td>
                        <td className="px-5 py-4 text-right">
                          <button
                            onClick={() => {
                              setOverrideTarget(rec.outwardCode);
                              setOverrideValue(rec.rawScore);
                            }}
                            className="text-[11px] font-bold text-emerald-700 hover:underline"
                          >
                            Manual Override
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Manual Override modal drawer */}
            {overrideTarget && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/40 p-4 backdrop-blur-sm">
                <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-gray-100 flex flex-col gap-4">
                  <h3 className="font-sans text-lg font-bold text-gray-950 flex items-center gap-2">
                    <Settings className="h-5 w-5 text-emerald-600" />
                    <span>Override Gate: {overrideTarget}</span>
                  </h3>
                  <p className="text-xs text-gray-600">
                    Manually adjust the Quality Score of this district. This must only be done in exceptional conditions and requires registering a compliance statement.
                  </p>
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-gray-500 uppercase">Override Score (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={overrideValue}
                      onChange={(e) => setOverrideValue(Number(e.target.value))}
                      className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-bold text-gray-900"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-gray-500 uppercase">Verification Reason / Audit Statement</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="e.g. Verified by Marcus Thorne on-site. Added physical customer feedback and 3 high-res before/after photographs manually."
                      value={overrideReason}
                      onChange={(e) => setOverrideReason(e.target.value)}
                      className="rounded-lg border border-gray-200 p-2.5 text-xs font-semibold text-gray-900 focus:border-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div className="flex gap-2 justify-end pt-2">
                    <button
                      onClick={() => setOverrideTarget(null)}
                      className="rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleApplyOverride(overrideTarget)}
                      className="rounded-lg bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-emerald-700 shadow-md shadow-emerald-600/15"
                    >
                      Record & Apply Override
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

        {/* TAB 2: LEAD MANAGEMENT SYSTEM */}
        {activeTab === 'leads' && (
          <div className="flex flex-col gap-6">
            
            <div className="rounded-xl border border-emerald-100 bg-emerald-50/15 p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-col gap-1">
                <span className="font-bold text-emerald-950 text-sm flex items-center gap-1.5">
                  <Lock className="h-4 w-4 text-emerald-600" />
                  <span>GDPR-Compliant Lead Storage Engine</span>
                </span>
                <p className="text-xs text-gray-600">
                  Every callback and quote inquiry logs GDPR consent. Personal identifiers (Email, Phone) are automatically redacted in storage, requiring direct double-factor authorisation at HQ terminal to de-redact.
                </p>
              </div>
              <span className="text-[10px] bg-emerald-600 text-white font-bold px-2.5 py-1 rounded">
                EHR SHA-256 ACTIVE
              </span>
            </div>

            {/* Leads Table */}
            <div className="overflow-x-auto rounded-xl border border-gray-100 bg-white shadow-sm">
              <table className="min-w-full divide-y divide-gray-100 text-left">
                <thead className="bg-gray-50">
                  <tr className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    <th className="px-5 py-3">Lead ID</th>
                    <th className="px-5 py-3">Date/Time</th>
                    <th className="px-5 py-3">Consent Redaction (GDPR)</th>
                    <th className="px-5 py-3">Inquiry details</th>
                    <th className="px-5 py-3">Process Status</th>
                    <th className="px-5 py-3 text-right">Access</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50/50">
                      <td className="px-5 py-4 font-extrabold text-gray-950">{lead.id}</td>
                      <td className="px-5 py-4 text-gray-500 font-semibold">{new Date(lead.timestamp).toLocaleString()}</td>
                      <td className="px-5 py-4">
                        <div className="flex flex-col gap-1 text-[11px]">
                          <span className="font-extrabold text-gray-900 flex items-center gap-1">
                            <span>{lead.name}</span>
                          </span>
                          <span className="text-gray-400">{lead.phoneRedacted}</span>
                          <span className="text-gray-400">{lead.emailRedacted}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex flex-col gap-1 text-[11px]">
                          <span className="font-extrabold text-gray-900">{lead.pestType}</span>
                          <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded max-w-max text-[10px]">
                            Postcode Sector: {lead.postcode}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <select
                          value={lead.status}
                          onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value as any)}
                          className="rounded-lg border border-gray-200 bg-white py-1 px-2.5 text-xs font-bold text-gray-800 focus:border-emerald-500 focus:outline-none"
                        >
                          <option value="New">New &bull; Pending</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Dispatched">Dispatched</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() => alert(`To comply with GDPR, full credentials can only be accessed by secondary SMS 2-Factor Authentication code on un-redacted admin terminals.`)}
                          className="text-[11px] font-bold bg-gray-50 border border-gray-100 hover:bg-gray-100 px-3 py-1.5 rounded-lg text-gray-800"
                        >
                          De-redact Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* TAB 3: TECHNICAL SITEMAPS */}
        {activeTab === 'sitemaps' && (
          <div className="flex flex-col gap-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="rounded-xl border border-gray-100 bg-white p-5 flex flex-col gap-4">
                <h3 className="font-sans text-sm font-bold text-gray-950 uppercase tracking-wider flex items-center gap-2">
                  <Globe className="h-5 w-5 text-emerald-600" />
                  <span>Sitemap Index Tree</span>
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  We implement a highly structural and dynamic double-level sitemap layout, complying perfectly with search crawler boundaries. Incomplete or poor quality postcode records are filtered out.
                </p>

                <div className="flex flex-col gap-2 pt-2">
                  <a
                    href="/sitemap-index.xml"
                    target="_blank"
                    className="flex items-center justify-between p-3 rounded-lg border border-emerald-100 bg-emerald-50/10 hover:bg-emerald-50/30 text-xs font-extrabold text-emerald-950"
                  >
                    <span>/sitemap-index.xml (Core Index)</span>
                    <FileText className="h-4 w-4 text-emerald-600" />
                  </a>
                  <a
                    href="/robots.txt"
                    target="_blank"
                    className="flex items-center justify-between p-3 rounded-lg border border-gray-100 bg-gray-50/50 hover:bg-gray-50 text-xs font-extrabold text-gray-900"
                  >
                    <span>/robots.txt (Live File)</span>
                    <FileText className="h-4 w-4 text-gray-500" />
                  </a>
                </div>
              </div>

              <div className="rounded-xl border border-gray-100 bg-white p-5 flex flex-col gap-3">
                <h3 className="font-sans text-sm font-bold text-gray-950 uppercase tracking-wider flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-emerald-600" />
                  <span>Thematic Sub-Sitemaps</span>
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Search engines crawl these subcategories independently to optimize budget allocation and minimize indexing load:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                  <a href="/sitemap-core.xml" target="_blank" className="p-2 border border-gray-100 rounded bg-gray-50/30 hover:bg-gray-50 text-emerald-900 font-bold block">
                    &bull; Core Pages
                  </a>
                  <a href="/sitemap-services.xml" target="_blank" className="p-2 border border-gray-100 rounded bg-gray-50/30 hover:bg-gray-50 text-emerald-900 font-bold block">
                    &bull; Pest Services
                  </a>
                  <a href="/sitemap-pests.xml" target="_blank" className="p-2 border border-gray-100 rounded bg-gray-50/30 hover:bg-gray-50 text-emerald-900 font-bold block">
                    &bull; Pest Slugs
                  </a>
                  <a href="/sitemap-boroughs.xml" target="_blank" className="p-2 border border-gray-100 rounded bg-gray-50/30 hover:bg-gray-50 text-emerald-900 font-bold block">
                    &bull; Borough Guides
                  </a>
                  <a href="/sitemap-areas.xml" target="_blank" className="p-2 border border-gray-100 rounded bg-gray-50/30 hover:bg-gray-50 text-emerald-900 font-bold block">
                    &bull; Location Areas
                  </a>
                  <a href="/sitemap-postcodes.xml" target="_blank" className="p-2 border border-gray-100 rounded bg-gray-50/30 hover:bg-gray-50 text-emerald-900 font-bold block">
                    &bull; Postcodes (Quality Gates)
                  </a>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}

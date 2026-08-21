import React, { useState } from 'react';
import { ArrowLeft, ExternalLink, MapPin, Building2, Globe, Tag, CheckCircle2, Sparkles } from 'lucide-react';
import { SECTOR_COLOR_MAP, AREAS, STAGES, SECTORS, GOOGLE_FORM_URL } from '../constants/options';
import { getLogoUrl } from '../utils/logoHelper';

export default function CompanyDetailView({ company, onBack }) {
  const [subscribed, setSubscribed] = useState(false);
  const [formData, setFormData] = useState({ position: '', startup: '', email: '' });

  if (!company) return null;

  const logo = getLogoUrl(company);
  const sectorObj = SECTORS.find(s => s.id === company.sector);
  const areaObj = AREAS.find(a => a.id === company.area);
  const stageObj = STAGES.find(s => s.id === company.stage);
  const sectorColor = SECTOR_COLOR_MAP[company.sector] || SECTOR_COLOR_MAP.other;

  const cleanDomain = company.website
    ? company.website.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '')
    : '';

  const isStartupIndiaProfile = company.website && company.website.includes('startupindia.gov.in');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (formData.email) {
      setSubscribed(true);
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 text-slate-900 pt-20 pb-20 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        
        {/* Back Link */}
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 transition mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>All startups</span>
        </button>

        {/* Company Header Block */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm mb-6">
          
          {/* Avatar / Logo + Title */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
            
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-white font-extrabold text-2xl shrink-0 shadow-sm overflow-hidden bg-white border border-slate-200 p-2">
              {logo ? (
                <img
                  src={logo}
                  alt={company.name}
                  className="w-full h-full object-contain rounded-xl"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div
                className="w-full h-full items-center justify-center text-white font-extrabold text-2xl rounded-xl"
                style={{
                  backgroundColor: sectorColor.hex,
                  display: logo ? 'none' : 'flex'
                }}
              >
                {company.colorSeed || company.name.charAt(0)}
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {company.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
                  {stageObj?.label || company.stage}
                </span>
              </div>

              {company.description && (
                <p className="text-sm text-slate-600 leading-relaxed mb-1 max-w-xl">
                  {company.description}
                </p>
              )}

              {cleanDomain && !isStartupIndiaProfile && (
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-blue-600 hover:underline inline-flex items-center gap-1"
                >
                  <span>{cleanDomain}</span>
                  <ExternalLink className="w-3 h-3 text-blue-500" />
                </a>
              )}
            </div>

          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100">
            {company.website && !isStartupIndiaProfile ? (
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition shadow-xs cursor-pointer"
              >
                <span>Visit website</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
              <a
                href={`https://www.google.com/search?q=${encodeURIComponent(company.name + ' official website')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition shadow-xs cursor-pointer"
              >
                <span>Search official site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            <a
              href={`https://www.google.com/search?q=${encodeURIComponent(company.name + ' Kolkata careers jobs')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200/80 transition cursor-pointer"
            >
              <span>View open jobs</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>

        </div>

        {/* Detailed Metadata Key-Value Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm mb-6 space-y-6">
          
          {/* Sector */}
          <div className="pb-4 border-b border-slate-100">
            <span className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
              SECTOR
            </span>
            <span className="text-sm font-bold text-slate-800">
              {sectorObj?.label || company.sector}
            </span>
          </div>

          {/* Area / District */}
          <div className="pb-4 border-b border-slate-100">
            <span className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
              AREA
            </span>
            <span className="text-sm font-bold text-slate-800">
              {areaObj?.label || company.area}
            </span>
          </div>

          {/* Location */}
          <div className="pb-4 border-b border-slate-100">
            <span className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
              LOCATION
            </span>
            <span className="text-sm font-medium text-slate-700">
              {areaObj?.label || 'Kolkata Metropolitan Region'}, West Bengal, India
            </span>
          </div>

          {/* Type */}
          <div className="pb-4 border-b border-slate-100">
            <span className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
              ENTITY TYPE
            </span>
            <span className="text-sm font-bold text-slate-800 capitalize">
              {company.type === 'vc' ? 'VC & Investor' : company.type === 'ecosystem' ? 'Incubator & Hub' : 'Technology Startup'}
            </span>
          </div>

          {/* Funding Stage */}
          <div className="pb-4 border-b border-slate-100">
            <span className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-1">
              STAGE
            </span>
            <span className="text-sm font-bold text-slate-800">
              {stageObj?.label || company.stage}
            </span>
          </div>

          {/* Tags */}
          <div>
            <span className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
              TAGS
            </span>
            <div className="flex flex-wrap gap-1.5">
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                {sectorObj?.label || company.sector}
              </span>
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/80">
                {areaObj?.label || company.area}
              </span>
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                kolkata-tech
              </span>
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                innovation
              </span>
            </div>
          </div>

        </div>

        {/* Newsletter Subscription Card (Kolkata Circle) */}
        <div className="bg-gradient-to-br from-blue-50/80 via-white to-blue-50/40 rounded-3xl p-6 sm:p-8 border border-blue-200/80 shadow-sm">
          
          <div className="flex items-center space-x-2 text-xs font-bold text-blue-600 tracking-wider uppercase mb-1">
            <Sparkles className="w-3.5 h-3.5 fill-blue-600 text-blue-600" />
            <span>Kolkata Circle</span>
          </div>

          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight mb-1">
            Jobs & fundraises like this
          </h3>

          <p className="text-xs text-slate-600 mb-5">
            Startup jobs, fundraises & news, curated for Kolkata founders and talent.
          </p>

          {subscribed ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center space-x-3 text-emerald-800 text-xs font-bold">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Thank you for subscribing to Kolkata Circle! We'll keep you updated.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Your current position"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl text-xs border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                />
                <input
                  type="text"
                  placeholder="Startup you work at"
                  value={formData.startup}
                  onChange={(e) => setFormData({ ...formData, startup: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl text-xs border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-stretch gap-2">
                <input
                  type="email"
                  required
                  placeholder="Email address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="flex-1 px-4 py-2.5 rounded-xl text-xs border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition shadow-xs cursor-pointer whitespace-nowrap"
                >
                  Subscribe to Kolkata Circle
                </button>
              </div>

              <span className="block text-[11px] text-slate-400 text-center sm:text-left">
                Free · No spam · Unsubscribe anytime
              </span>
            </form>
          )}

        </div>

      </div>
    </div>
  );
}

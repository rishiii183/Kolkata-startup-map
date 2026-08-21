import React from 'react';
import { MapPin, Search, X, Zap, ExternalLink } from 'lucide-react';
import { TYPES, AREAS, STAGES, SECTORS, GOOGLE_FORM_URL } from '../constants/options';
import CustomSelect from './CustomSelect';

export default function Navbar({
  searchQuery,
  setSearchQuery,
  filters,
  setFilters,
  activeView,
  setActiveView
}) {
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <nav className="w-full max-w-7xl mx-auto px-2 sm:px-4 pt-3 pb-1">
      {/* Floating Header Card matching reference screenshot */}
      <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-full border border-slate-200/90 shadow-lg px-3 py-2 flex flex-wrap lg:flex-nowrap items-center justify-between gap-2.5">
        
        {/* 1. Branding: Pink Map Pin + Title */}
        <div className="flex items-center space-x-2 shrink-0 pl-1 pr-1">
          <div className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 shrink-0">
            <MapPin className="w-4 h-4 fill-rose-500 text-rose-500" />
          </div>
          <h1 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight whitespace-nowrap">
            Kolkata Startup Map
          </h1>
        </div>

        {/* 2. Search Bar Pill */}
        <div className="relative flex-1 min-w-[180px] max-w-xs">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search startups, sectors, founders..."
            className="w-full pl-4 pr-7 py-1.5 rounded-full text-xs border border-slate-200 bg-slate-50/80 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:bg-white transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* 3. Dropdowns (Types, Areas, Stages, Sectors) */}
        <div className="flex flex-wrap items-center gap-1.5">
          <CustomSelect
            value={filters.type}
            onChange={(val) => handleFilterChange('type', val)}
            options={TYPES}
            placeholder="All types"
          />
          <CustomSelect
            value={filters.area}
            onChange={(val) => handleFilterChange('area', val)}
            options={AREAS}
            placeholder="All areas"
          />
          <CustomSelect
            value={filters.stage}
            onChange={(val) => handleFilterChange('stage', val)}
            options={STAGES}
            placeholder="All stages"
          />
          <CustomSelect
            value={filters.sector}
            onChange={(val) => handleFilterChange('sector', val)}
            options={SECTORS}
            placeholder="All sectors"
          />
        </div>

        {/* 4. Controls & CTAs (Map/Grid toggle + Boost + Submit) */}
        <div className="flex items-center space-x-2 shrink-0 ml-auto lg:ml-0">
          
          {/* Map | Grid Segmented Pill */}
          <div className="inline-flex items-center rounded-full p-0.5 bg-slate-100 border border-slate-200/80">
            <button
              type="button"
              onClick={() => setActiveView('map')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeView === 'map'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Map
            </button>
            <button
              type="button"
              onClick={() => setActiveView('grid')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeView === 'grid'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Grid
            </button>
          </div>

          {/* Boost CTA Button */}
          <a
            href={GOOGLE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-bold text-orange-600 bg-white border border-orange-500/80 hover:bg-orange-50 transition cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
            <span>Boost</span>
          </a>

          {/* Submit CTA Button */}
          <a
            href={GOOGLE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-4 py-1.5 rounded-full text-xs font-bold text-white bg-[#ff5722] hover:bg-[#f4511e] transition shadow-xs cursor-pointer"
          >
            <span>Submit</span>
          </a>

        </div>

      </div>
    </nav>
  );
}

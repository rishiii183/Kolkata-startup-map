import React from 'react';
import { MapPin, Search, X } from 'lucide-react';
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
    <nav className="w-full max-w-7xl mx-auto px-2 sm:px-4 pt-2 sm:pt-3 pb-1">
      {/* Floating Header Card in Blue Theme with Mobile Responsiveness */}
      <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-full border border-blue-100/90 shadow-lg p-2 sm:px-3 sm:py-2 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-2">

        {/* Top Row on Mobile / Left Section on Desktop */}
        <div className="flex items-center justify-between gap-2 w-full lg:w-auto">

          {/* 1. Branding: Blue Map Pin + Title */}
          <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0 pl-1">
            <div className="w-6 h-6 sm:w-6.5 sm:h-6.5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0 shadow-2xs">
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-blue-600 text-blue-600" />
            </div>
            <h1 className="text-xs sm:text-base font-extrabold text-slate-900 tracking-tight whitespace-nowrap">
              Kolkata Startup Map
            </h1>
          </div>

          {/* Search Bar Pill (Flexible) */}
          <div className="relative flex-1 min-w-[120px] max-w-xs">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full pl-3 pr-6 py-1 sm:py-1.5 rounded-full text-xs border border-slate-200 bg-blue-50/30 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-2 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Submit CTA Button (Top-Right on Mobile) */}
          <a
            href={GOOGLE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition shadow-xs cursor-pointer shrink-0"
          >
            <span>Submit</span>
          </a>

        </div>

        {/* Bottom Row on Mobile / Center-Right Section on Desktop (Smooth Scrollable Pills) */}
        <div className="w-full lg:w-auto overflow-x-auto no-scrollbar flex items-center gap-1.5 pt-1 lg:pt-0 border-t lg:border-0 border-slate-100">

          {/* Dropdowns */}
          <div className="flex items-center gap-1.5 shrink-0">
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

          {/* Map | Grid Segmented Pill */}
          <div className="inline-flex items-center rounded-full p-0.5 bg-slate-100 border border-slate-200/80 shrink-0 ml-auto lg:ml-0">
            <button
              type="button"
              onClick={() => setActiveView('map')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${activeView === 'map'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
                }`}
            >
              Map
            </button>
            <button
              type="button"
              onClick={() => setActiveView('grid')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${activeView === 'grid'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
                }`}
            >
              Grid
            </button>
          </div>

        </div>

      </div>
    </nav>
  );
}

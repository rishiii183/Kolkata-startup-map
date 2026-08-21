import React from 'react';
import { Search, X, Map, LayoutGrid, Filter, RotateCcw, Building2, MapPin, Tag, TrendingUp } from 'lucide-react';
import { TYPES, AREAS, STAGES, SECTORS } from '../constants/options';
import CustomSelect from './CustomSelect';

export default function FilterBar({
  searchQuery,
  setSearchQuery,
  filters,
  setFilters,
  activeView,
  setActiveView,
  totalResults
}) {
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setFilters({
      type: 'all',
      area: 'all',
      stage: 'all',
      sector: 'all'
    });
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    filters.type !== 'all' ||
    filters.area !== 'all' ||
    filters.stage !== 'all' ||
    filters.sector !== 'all';

  return (
    <div className="relative z-40 bg-white border-b border-slate-200/80 shadow-xs px-4 sm:px-6 lg:px-8 py-3.5 space-y-3">
      
      {/* Top control bar */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        
        {/* Search input */}
        <div className="relative flex-1 min-w-[200px] max-w-full md:max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search startups, sectors, founders..."
            className="w-full pl-9 pr-8 py-2 rounded-xl text-sm border border-slate-200 bg-slate-50/60 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Custom Dropdown Filters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 flex-1">
          
          {/* Type Filter */}
          <CustomSelect
            value={filters.type}
            onChange={(val) => handleFilterChange('type', val)}
            options={TYPES}
            icon={Building2}
            placeholder="All Types"
          />

          {/* Area Filter */}
          <CustomSelect
            value={filters.area}
            onChange={(val) => handleFilterChange('area', val)}
            options={AREAS}
            icon={MapPin}
            placeholder="All Areas"
          />

          {/* Sector Filter */}
          <CustomSelect
            value={filters.sector}
            onChange={(val) => handleFilterChange('sector', val)}
            options={SECTORS}
            icon={Tag}
            placeholder="All Sectors"
          />

          {/* Stage Filter */}
          <CustomSelect
            value={filters.stage}
            onChange={(val) => handleFilterChange('stage', val)}
            options={STAGES}
            icon={TrendingUp}
            placeholder="All Stages"
          />

        </div>

        {/* View Switcher Segmented Control */}
        <div className="flex items-center justify-between md:justify-end space-x-3 pt-1 md:pt-0 border-t md:border-0 border-slate-200">
          <div className="inline-flex items-center rounded-full p-1 bg-slate-100/90 border border-slate-200/80">
            <button
              type="button"
              onClick={() => setActiveView('map')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeView === 'map'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 font-semibold'
              }`}
            >
              Map
            </button>
            <button
              type="button"
              onClick={() => setActiveView('grid')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeView === 'grid'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 font-semibold'
              }`}
            >
              Grid
            </button>
          </div>
        </div>

      </div>

      {/* Active Filter Tags */}
      {hasActiveFilters && (
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs font-semibold text-slate-500 flex items-center mr-1">
            <Filter className="w-3 h-3 mr-1" /> Active Filters:
          </span>

          {searchQuery && (
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-200">
              <span>"{searchQuery}"</span>
              <button onClick={() => setSearchQuery('')} className="hover:text-indigo-900 cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.type !== 'all' && (
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-200">
              <span>Type: {TYPES.find(t => t.id === filters.type)?.label}</span>
              <button onClick={() => handleFilterChange('type', 'all')} className="hover:text-indigo-900 cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.area !== 'all' && (
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-200">
              <span>Area: {AREAS.find(a => a.id === filters.area)?.label}</span>
              <button onClick={() => handleFilterChange('area', 'all')} className="hover:text-indigo-900 cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.sector !== 'all' && (
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-200">
              <span>Sector: {SECTORS.find(s => s.id === filters.sector)?.label}</span>
              <button onClick={() => handleFilterChange('sector', 'all')} className="hover:text-indigo-900 cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.stage !== 'all' && (
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-200">
              <span>Stage: {STAGES.find(s => s.id === filters.stage)?.label}</span>
              <button onClick={() => handleFilterChange('stage', 'all')} className="hover:text-indigo-900 cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          <button
            onClick={clearAllFilters}
            className="inline-flex items-center space-x-1 text-xs font-medium text-slate-500 hover:text-indigo-600 underline ml-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset All</span>
          </button>
        </div>
      )}

    </div>
  );
}

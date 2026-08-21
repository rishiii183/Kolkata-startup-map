import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import StatsBar from './components/StatsBar';
import MapView from './components/MapView';
import GridView from './components/GridView';
import startupsData from './data/startups.json';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    type: 'all',
    area: 'all',
    stage: 'all',
    sector: 'all'
  });
  const [activeView, setActiveView] = useState('map');
  const [selectedStartup, setSelectedStartup] = useState(null);

  // Client-side filter computation
  const filteredStartups = useMemo(() => {
    return startupsData.filter((item) => {
      // 1. Search Query Filter (by name or description)
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const nameMatch = item.name.toLowerCase().includes(query);
        const descMatch = item.description ? item.description.toLowerCase().includes(query) : false;
        if (!nameMatch && !descMatch) return false;
      }

      // 2. Type Filter
      if (filters.type !== 'all' && item.type !== filters.type) {
        return false;
      }

      // 3. Area Filter
      if (filters.area !== 'all' && item.area !== filters.area) {
        return false;
      }

      // 4. Sector Filter
      if (filters.sector !== 'all' && item.sector !== filters.sector) {
        return false;
      }

      // 5. Stage Filter
      if (filters.stage !== 'all' && item.stage !== filters.stage) {
        return false;
      }

      return true;
    });
  }, [searchQuery, filters]);

  const handleSelectStartup = (startup) => {
    setSelectedStartup(startup);
    setActiveView('map');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      
      {/* Top Header */}
      <Header />

      {/* Filter controls */}
      <FilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filters={filters}
        setFilters={setFilters}
        activeView={activeView}
        setActiveView={setActiveView}
        totalResults={filteredStartups.length}
      />

      {/* Status Bar */}
      <StatsBar
        currentCount={filteredStartups.length}
        totalCount={startupsData.length}
      />

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {activeView === 'map' ? (
          <MapView
            startups={filteredStartups}
            onSelectStartup={handleSelectStartup}
          />
        ) : (
          <GridView
            startups={filteredStartups}
            onSelectStartup={handleSelectStartup}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>&copy; {new Date().getFullYear()} Kolkata Startup Map — Built for Kolkata's Startup Community.</span>
          <span className="text-slate-400">Map tiles &copy; OpenStreetMap contributors & CARTO</span>
        </div>
      </footer>

    </div>
  );
}

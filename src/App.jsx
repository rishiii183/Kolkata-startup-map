import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import StatsBar from './components/StatsBar';
import MapView from './components/MapView';
import GridView from './components/GridView';
import CompanyDetailView from './components/CompanyDetailView';
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
  const [selectedCompanyDetail, setSelectedCompanyDetail] = useState(null);

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
  };

  const handleOpenDetail = (startup) => {
    setSelectedCompanyDetail(startup);
  };

  // If a company detail page is active, display the full Detail View!
  if (selectedCompanyDetail) {
    return (
      <div className="relative w-full h-full min-h-screen overflow-y-auto bg-slate-50 text-slate-900 flex flex-col">
        {/* Navbar Header overlay */}
        <div className="sticky top-2 left-0 right-0 z-50 px-2 sm:px-4 pointer-events-auto">
          <Navbar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filters={filters}
            setFilters={setFilters}
            activeView={activeView}
            setActiveView={(view) => {
              setSelectedCompanyDetail(null);
              setActiveView(view);
            }}
          />
        </div>

        <CompanyDetailView
          company={selectedCompanyDetail}
          onBack={() => setSelectedCompanyDetail(null)}
        />
      </div>
    );
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-slate-50 text-slate-900 flex flex-col">
      
      {/* Unified Floating Top Navbar Overlay */}
      <div className="absolute top-2 left-0 right-0 z-50 px-2 sm:px-4 pointer-events-auto">
        <Navbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filters={filters}
          setFilters={setFilters}
          activeView={activeView}
          setActiveView={setActiveView}
        />
      </div>

      {/* Main Content Area */}
      <main className="relative w-full h-full flex-1 overflow-hidden">
        {activeView === 'map' ? (
          <MapView
            startups={filteredStartups}
            onSelectStartup={handleSelectStartup}
            onOpenDetail={handleOpenDetail}
          />
        ) : (
          <div className="w-full h-full overflow-y-auto pt-24 px-4 sm:px-8 pb-16 max-w-7xl mx-auto">
            <GridView
              startups={filteredStartups}
              onSelectStartup={handleSelectStartup}
              onOpenDetail={handleOpenDetail}
            />
          </div>
        )}

        {/* Floating Bottom Left Overlay */}
        <StatsBar
          currentCount={filteredStartups.length}
          totalCount={startupsData.length}
        />
      </main>

    </div>
  );
}

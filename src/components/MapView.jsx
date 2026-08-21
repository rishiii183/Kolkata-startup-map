import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { ExternalLink, MapPin, Building2, Tag, Layers } from 'lucide-react';
import { SECTOR_COLOR_MAP, AREAS, STAGES, SECTORS } from '../constants/options';

// Center of Kolkata
const KOLKATA_CENTER = [22.5726, 88.3639];
const DEFAULT_ZOOM = 12;

// Helper component to recenter map when filtered items change
function MapRecenter({ startups }) {
  const map = useMap();
  useEffect(() => {
    if (startups && startups.length > 0) {
      // Calculate bounds if entries exist
      const bounds = L.latLngBounds(startups.map(s => [s.lat, s.lng]));
      if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
      }
    } else {
      map.setView(KOLKATA_CENTER, DEFAULT_ZOOM);
    }
  }, [startups, map]);

  return null;
}

// Function to create custom DivIcon per startup marker
function createCustomMarkerIcon(startup) {
  const sectorInfo = SECTOR_COLOR_MAP[startup.sector] || SECTOR_COLOR_MAP.other;
  const hexColor = sectorInfo.hex;
  const letter = startup.colorSeed || startup.name.charAt(0).toUpperCase();

  const html = `
    <div class="custom-leaflet-marker" style="width: 36px; height: 36px;">
      <div style="
        background-color: ${hexColor};
        width: 34px;
        height: 34px;
        border-radius: 50%;
        border: 2px solid #ffffff;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ffffff;
        font-weight: 800;
        font-size: 13px;
        letter-spacing: -0.5px;
      ">
        ${letter}
      </div>
    </div>
  `;

  return L.divIcon({
    html,
    className: 'custom-pin-wrapper',
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -18]
  });
}

export default function MapView({ startups, onSelectStartup }) {
  return (
    <div className="relative z-0 w-full h-[calc(100vh-12rem)] min-h-[500px] rounded-2xl overflow-hidden shadow-xs border border-slate-200">
      <MapContainer
        center={KOLKATA_CENTER}
        zoom={DEFAULT_ZOOM}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        {/* Free anonymous CARTO Voyager tiles — No API key needed */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          maxZoom={19}
        />

        <MapRecenter startups={startups} />

        {startups.map((startup) => {
          const sectorObj = SECTORS.find(s => s.id === startup.sector);
          const areaObj = AREAS.find(a => a.id === startup.area);
          const stageObj = STAGES.find(s => s.id === startup.stage);
          const sectorColor = SECTOR_COLOR_MAP[startup.sector] || SECTOR_COLOR_MAP.other;

          return (
            <Marker
              key={startup.id}
              position={[startup.lat, startup.lng]}
              icon={createCustomMarkerIcon(startup)}
              eventHandlers={{
                click: () => onSelectStartup && onSelectStartup(startup)
              }}
            >
              <Popup>
                <div className="p-4 max-w-[280px] bg-white">
                  
                  {/* Title & Avatar */}
                  <div className="flex items-start space-x-3 mb-2.5">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-base shrink-0 shadow-xs"
                      style={{ backgroundColor: sectorColor.hex }}
                    >
                      {startup.colorSeed || startup.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm leading-tight">
                        {startup.name}
                      </h3>
                      <span className="text-[11px] font-semibold text-slate-500 capitalize">
                        {startup.type === 'vc' ? 'VC / Investor' : startup.type === 'ecosystem' ? 'Ecosystem Hub' : 'Startup'}
                      </span>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    <span className={`px-2 py-0.5 rounded-md text-[11px] font-semibold border ${sectorColor.badgeBg}`}>
                      {sectorObj?.label || startup.sector}
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                      {stageObj?.label || startup.stage}
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-50 text-slate-600 border border-slate-200">
                      {areaObj?.label || startup.area}
                    </span>
                  </div>

                  {/* Description */}
                  {startup.description && (
                    <p className="text-xs text-slate-600 mb-3.5 line-clamp-2 leading-relaxed">
                      {startup.description}
                    </p>
                  )}

                  {/* Website link */}
                  {startup.website && (
                    <a
                      href={startup.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition"
                    >
                      <span>Visit Website</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}

                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

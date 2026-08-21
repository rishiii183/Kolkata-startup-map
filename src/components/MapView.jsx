import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { SECTOR_COLOR_MAP, AREAS, STAGES, SECTORS } from '../constants/options';
import { getLogoUrl } from '../utils/logoHelper';

// Center and Zoom tailored to West Bengal state
const WEST_BENGAL_CENTER = [23.8, 88.0];
const DEFAULT_ZOOM = 7.2;
const MIN_ZOOM = 6;
const MAX_ZOOM = 18;

// Interaction bounds covering West Bengal with a modest buffer
const WEST_BENGAL_BOUNDS = [
  [20.5, 85.0], // Southwest: South of Digha / West of Purulia
  [27.8, 90.5]  // Northeast: North of Darjeeling / East of Jalpaiguri
];

// Helper component to center map on Kolkata/WB and invalidate size on refresh
function MapRecenter({ startups }) {
  const map = useMap();
  
  useEffect(() => {
    // Invalidate size immediately and after layout paint
    map.invalidateSize();
    const timer1 = setTimeout(() => map.invalidateSize(), 100);
    const timer2 = setTimeout(() => map.invalidateSize(), 300);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [map]);

  useEffect(() => {
    if (startups && startups.length > 0 && startups.length < 200) {
      const bounds = L.latLngBounds(startups.map(s => [s.lat, s.lng]));
      if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
      }
    } else {
      map.setView(WEST_BENGAL_CENTER, DEFAULT_ZOOM);
    }
  }, [startups, map]);

  return null;
}

// Function to create cluster bubble icon scaled by count
function createClusterCustomIcon(cluster) {
  const count = cluster.getChildCount();
  let bgColor = '#3b82f6'; // Primary Blue theme
  let textColor = '#ffffff';

  if (count >= 10 && count < 50) {
    bgColor = '#2563eb';
    textColor = '#ffffff';
  } else if (count >= 50) {
    bgColor = '#1d4ed8';
    textColor = '#ffffff';
  }

  const html = `
    <div style="
      background-color: ${bgColor};
      width: 42px;
      height: 42px;
      border-radius: 50%;
      border: 3px solid #ffffff;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${textColor};
      font-weight: 800;
      font-size: 14px;
      letter-spacing: -0.5px;
      cursor: pointer;
    ">
      ${count}
    </div>
  `;

  return L.divIcon({
    html,
    className: 'custom-cluster-marker',
    iconSize: [42, 42],
    iconAnchor: [21, 21]
  });
}

// Function to create custom DivIcon per individual startup marker
function createCustomMarkerIcon(startup) {
  const sectorInfo = SECTOR_COLOR_MAP[startup.sector] || SECTOR_COLOR_MAP.other;
  const hexColor = sectorInfo.hex;
  const letter = startup.colorSeed || startup.name.charAt(0).toUpperCase();
  const logo = getLogoUrl(startup);

  let innerContent;
  if (logo) {
    innerContent = `
      <div style="
        background-color: #ffffff;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: 2.5px solid ${hexColor};
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        padding: 3px;
        cursor: pointer;
      ">
        <img
          src="${logo}"
          alt="${startup.name}"
          class="img-crisp"
          style="width: 100%; height: 100%; object-fit: contain; border-radius: 50%;"
          onerror="this.onerror=null; this.parentNode.innerHTML='<div style=\\'width:100%;height:100%;background:${hexColor};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:13px;border-radius:50%;\\'>${letter}</div>';"
        />
      </div>
    `;
  } else {
    innerContent = `
      <div style="
        background-color: ${hexColor};
        width: 34px;
        height: 34px;
        border-radius: 50%;
        border: 2px solid #ffffff;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ffffff;
        font-weight: 800;
        font-size: 13px;
        letter-spacing: -0.5px;
        cursor: pointer;
      ">
        ${letter}
      </div>
    `;
  }

  return L.divIcon({
    html: innerContent,
    className: 'custom-pin-marker',
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -18]
  });
}

export default function MapView({ startups, onSelectStartup, onOpenDetail }) {
  return (
    <div className="absolute inset-0 z-0 w-full h-full">
      <MapContainer
        center={WEST_BENGAL_CENTER}
        zoom={DEFAULT_ZOOM}
        minZoom={MIN_ZOOM}
        maxZoom={MAX_ZOOM}
        maxBounds={WEST_BENGAL_BOUNDS}
        maxBoundsViscosity={0.9}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        {/* CARTO Voyager tiles render full-bleed across viewport */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          minZoom={MIN_ZOOM}
          maxZoom={MAX_ZOOM}
          noWrap={true}
        />

        <MapRecenter startups={startups} />

        {/* Leaflet Marker Clustering Group */}
        <MarkerClusterGroup
          key={startups ? startups.length : 'all'}
          iconCreateFunction={createClusterCustomIcon}
          showCoverageOnHover={false}
          maxClusterRadius={50}
          spiderfyOnMaxZoom={true}
        >
          {startups && startups.map((startup) => {
            const sectorObj = SECTORS.find(s => s.id === startup.sector);
            const areaObj = AREAS.find(a => a.id === startup.area);
            const stageObj = STAGES.find(s => s.id === startup.stage);
            const sectorColor = SECTOR_COLOR_MAP[startup.sector] || SECTOR_COLOR_MAP.other;
            const logo = getLogoUrl(startup);

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
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-base shrink-0 shadow-xs overflow-hidden bg-white border border-slate-200 p-1"
                      >
                        {logo ? (
                          <img
                            src={logo}
                            alt={startup.name}
                            className="w-full h-full object-contain rounded-lg img-crisp"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div
                          className="w-full h-full items-center justify-center text-white font-bold text-base rounded-lg"
                          style={{
                            backgroundColor: sectorColor.hex,
                            display: logo ? 'none' : 'flex'
                          }}
                        >
                          {startup.colorSeed || startup.name.charAt(0)}
                        </div>
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

                    {/* View Details Link matching reference design */}
                    <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => onOpenDetail && onOpenDetail(startup)}
                        className="inline-flex items-center space-x-1 text-xs font-bold text-blue-600 hover:text-blue-700 transition cursor-pointer"
                      >
                        <span>View details →</span>
                      </button>

                      {startup.website && (
                        <a
                          href={startup.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-1 text-xs font-semibold text-slate-500 hover:text-slate-900 transition"
                        >
                          <span>Website</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>

                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}

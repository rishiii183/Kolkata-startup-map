import React from 'react';
import { ExternalLink, MapPin, Building2, Globe, ArrowRight } from 'lucide-react';
import { SECTOR_COLOR_MAP, AREAS, STAGES, SECTORS } from '../constants/options';

export default function GridView({ startups, onSelectStartup }) {
  if (!startups || startups.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-xs max-w-xl mx-auto my-12">
        <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
          <Building2 className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-slate-900 mb-1">No Startups Found</h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          No entries match your current search query or filter combination. Try resetting your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-12">
      {startups.map((startup) => {
        const sectorObj = SECTORS.find(s => s.id === startup.sector);
        const areaObj = AREAS.find(a => a.id === startup.area);
        const stageObj = STAGES.find(s => s.id === startup.stage);
        const sectorColor = SECTOR_COLOR_MAP[startup.sector] || SECTOR_COLOR_MAP.other;

        return (
          <div
            key={startup.id}
            className="group bg-white rounded-2xl p-5 border border-slate-200/90 hover:border-indigo-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              {/* Header with Circle initial & Title */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-start space-x-3">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-extrabold text-lg shrink-0 shadow-xs group-hover:scale-105 transition-transform"
                    style={{ backgroundColor: sectorColor.hex }}
                  >
                    {startup.colorSeed || startup.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base group-hover:text-indigo-600 transition-colors line-clamp-1">
                      {startup.name}
                    </h3>
                    <div className="flex items-center space-x-1 text-xs text-slate-500 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{areaObj?.label || startup.area}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                <span className={`px-2.5 py-0.5 rounded-lg text-xs font-semibold border ${sectorColor.badgeBg}`}>
                  {sectorObj?.label || startup.sector}
                </span>
                <span className="px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                  {stageObj?.label || startup.stage}
                </span>
                <span className="px-2.5 py-0.5 rounded-lg text-xs font-medium bg-slate-50 text-slate-600 border border-slate-200 capitalize">
                  {startup.type === 'vc' ? 'VC Fund' : startup.type === 'ecosystem' ? 'Hub' : 'Startup'}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                {startup.description || "Active startup contributing to Kolkata's growing technology and innovation ecosystem."}
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                onClick={() => onSelectStartup && onSelectStartup(startup)}
                className="inline-flex items-center space-x-1 text-xs font-semibold text-slate-600 hover:text-indigo-600 transition cursor-pointer"
              >
                <span>Focus on Map</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {startup.website && (
                <a
                  href={startup.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200/80 transition"
                >
                  <span>Website</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

          </div>
        );
      })}
    </div>
  );
}

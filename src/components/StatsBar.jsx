import React from 'react';
import { Sparkles, Building2, TrendingUp, Compass } from 'lucide-react';

export default function StatsBar({ currentCount, totalCount }) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 py-2.5 px-4 sm:px-6 lg:px-8 text-xs text-slate-600 bg-slate-100/70 border-b border-slate-200/60">
      
      {/* Result Count */}
      <div className="flex items-center space-x-2">
        <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-emerald-500 animate-ping mr-0.5" />
        <span className="font-bold text-slate-900">
          Showing {currentCount} of {totalCount} Kolkata ecosystem entries
        </span>
        {currentCount !== totalCount && (
          <span className="text-slate-500 font-medium">
            (Filtered)
          </span>
        )}
      </div>

      {/* Note */}
      <div className="flex items-center space-x-1.5 text-slate-500 text-[11px]">
        <Compass className="w-3.5 h-3.5 text-indigo-500" />
        <span>Open visual map for Kolkata founders, job seekers & investors</span>
      </div>

    </div>
  );
}

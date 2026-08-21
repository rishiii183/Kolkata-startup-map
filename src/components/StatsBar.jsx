import React from 'react';
import { Zap } from 'lucide-react';
import { GOOGLE_FORM_URL } from '../constants/options';

export default function StatsBar({ currentCount, totalCount }) {
  return (
    <div className="absolute bottom-5 left-5 z-40 flex flex-col items-start space-y-1.5 pointer-events-none">
      
      {/* 1. Job Alerts CTA Pill in Blue Theme */}
      <a
        href={GOOGLE_FORM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md transition cursor-pointer"
      >
        <Zap className="w-3.5 h-3.5 fill-white text-white" />
        <span>Get job alerts</span>
      </a>

      {/* 2. Results Count Pill */}
      <div className="pointer-events-auto bg-white/90 backdrop-blur-md px-3 py-1 rounded-xl shadow-md border border-slate-200/90 text-xs font-bold text-slate-800">
        <span>{currentCount} results</span>
      </div>

      {/* 3. Creator Attribution Tag */}
      <div className="pointer-events-auto text-[11px] font-semibold text-slate-600 bg-white/80 backdrop-blur-xs px-2 py-0.5 rounded-md shadow-2xs border border-slate-200/60">
        <span>by Rishi</span>
      </div>

    </div>
  );
}

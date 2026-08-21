import React from 'react';
import { MapPin, Plus, ExternalLink, Compass } from 'lucide-react';
import { GOOGLE_FORM_URL } from '../constants/options';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left branding */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-200">
              <Compass className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900">
                  Kolkata Startup Map
                </h1>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                  v1.0
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Visual directory of startups, VCs & tech hubs across Kolkata
              </p>
            </div>
          </div>

          {/* Right Action CTA */}
          <div className="flex items-center space-x-3">
            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 transition-all shadow-sm shadow-indigo-200 hover:shadow-indigo-300"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden xs:inline">Submit Startup</span>
              <span className="xs:hidden">Submit</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
          </div>

        </div>
      </div>
    </header>
  );
}

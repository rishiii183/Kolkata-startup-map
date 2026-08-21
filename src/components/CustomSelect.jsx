import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export default function CustomSelect({
  value,
  onChange,
  options = [],
  placeholder = "Select...",
  icon: Icon
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const selectedOption = options.find(opt => opt.id === value) || options[0];
  const isFiltered = value !== 'all';

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on Escape key
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen]);

  return (
    <div className="relative w-full sm:w-auto" ref={containerRef}>
      
      {/* Pill Trigger Button in Blue Theme */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full sm:w-auto flex items-center justify-between gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-150 cursor-pointer whitespace-nowrap ${
          isFiltered
            ? 'bg-blue-600 border-blue-600 text-white font-semibold shadow-xs'
            : isOpen
            ? 'bg-white border-blue-500 text-slate-900 ring-2 ring-blue-500/20'
            : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-blue-50/50'
        }`}
      >
        <div className="flex items-center gap-1.5 min-w-0 truncate">
          {Icon && (
            <Icon className={`w-3.5 h-3.5 shrink-0 ${isFiltered ? 'text-white' : 'text-slate-400'}`} />
          )}
          <span className="truncate">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>

        <ChevronDown
          className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${
            isFiltered ? 'text-white' : 'text-slate-400'
          } ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Popover Dropdown */}
      {isOpen && (
        <div className="absolute top-full mt-1.5 left-0 sm:left-auto sm:right-0 min-w-[180px] z-[9999] bg-white border border-slate-200/90 rounded-2xl shadow-xl py-1.5 max-h-64 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-150">
          {options.map((option) => {
            const isSelected = option.id === value;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => {
                  onChange(option.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2 text-xs font-medium transition cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-slate-700 hover:bg-blue-50 hover:text-blue-700'
                }`}
              >
                <span className="truncate">{option.label}</span>
                {isSelected && (
                  <Check className="w-3.5 h-3.5 shrink-0 ml-2" />
                )}
              </button>
            );
          })}
        </div>
      )}

    </div>
  );
}

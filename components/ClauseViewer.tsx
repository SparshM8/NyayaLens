'use client';

import React, { useState } from 'react';
import { ImportantClause } from '@/lib/types';
import { FileText, Search, Tag, Eye, EyeOff, CheckSquare, Sparkles, Filter } from 'lucide-react';

interface ClauseViewerProps {
  clauses: ImportantClause[];
}

export default function ClauseViewer({ clauses }: ClauseViewerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showVerbatim, setShowVerbatim] = useState(true);

  // Extract unique categories
  const categories = ['all', ...Array.from(new Set(clauses.map((c) => c.category)))];

  const filteredClauses = clauses.filter((c) => {
    const matchesCategory = selectedCategory === 'all' || c.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.plainEnglishSummary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.verbatimSnippet.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.sectionNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-bold text-white tracking-tight">
              Important Clauses Breakdown ({filteredClauses.length})
            </h3>
          </div>
          <p className="text-xs text-slate-400">
            Categorized clause analysis with side-by-side plain English summaries and original text snippets.
          </p>
        </div>

        {/* Toggle Verbatim Text view */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowVerbatim(!showVerbatim)}
            className="px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 transition flex items-center space-x-1.5"
          >
            {showVerbatim ? <EyeOff className="w-3.5 h-3.5 text-blue-400" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{showVerbatim ? 'Hide Raw Snippets' : 'Show Raw Snippets'}</span>
          </button>
        </div>
      </div>

      {/* Search and Category Filter Bar */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search clauses (e.g. 'notice', 'IP', 'bonus', 'liability', '90 days')..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg capitalize whitespace-nowrap transition-colors font-medium ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat === 'all' ? 'All Clauses' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Clauses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredClauses.map((clause) => {
          const isHigh = clause.severity === 'high';
          const isMed = clause.severity === 'medium';

          return (
            <div
              key={clause.id}
              className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/90 hover:border-slate-700 space-y-3 flex flex-col justify-between transition-colors"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-slate-900 text-blue-400 border border-slate-800">
                    Section {clause.sectionNumber}
                  </span>
                  <div className="flex items-center space-x-1.5">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider bg-slate-900 text-slate-400 border border-slate-800">
                      {clause.category}
                    </span>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isHigh ? 'bg-rose-500' : isMed ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      title={`${clause.severity} priority`}
                    />
                  </div>
                </div>

                <h4 className="text-sm sm:text-base font-bold text-white">
                  {clause.title}
                </h4>

                {/* Plain English Summary */}
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 text-xs text-slate-200 leading-relaxed">
                  <div className="flex items-center space-x-1 text-blue-400 font-semibold text-[10px] uppercase mb-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Plain English Translation</span>
                  </div>
                  <p>{clause.plainEnglishSummary}</p>
                </div>

                {/* Verbatim Snippet if visible */}
                {showVerbatim && (
                  <div className="text-xs text-slate-400 font-serif italic pl-3 border-l-2 border-slate-800 py-1 leading-relaxed">
                    &ldquo;{clause.verbatimSnippet}&rdquo;
                  </div>
                )}
              </div>

              {/* Action point if available */}
              {clause.actionRequired && (
                <div className="pt-2 border-t border-slate-800/80 flex items-start space-x-1.5 text-[11px] text-amber-300">
                  <CheckSquare className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-400" />
                  <span>
                    <strong>Recommended action:</strong> {clause.actionRequired}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

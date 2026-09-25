'use client';

import React, { useState } from 'react';
import { JargonTranslation } from '@/lib/types';
import { Sparkles, ArrowRight, Lightbulb, AlertCircle, Quote, CheckCircle2 } from 'lucide-react';

interface ExplainLike18Props {
  translations: JargonTranslation[];
}

export default function ExplainLike18({ translations }: ExplainLike18Props) {
  const [selectedId, setSelectedId] = useState<string>(translations[0]?.id || '');

  if (!translations || translations.length === 0) return null;

  const currentItem = translations.find((t) => t.id === selectedId) || translations[0];

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-amber-500/20 to-orange-500/20 text-amber-400 border border-amber-500/30">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              Explain Like I&apos;m 18
              <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
                GenAI Legalese Translator
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Transforming complex legal jargon into crystal-clear plain English explanations.
            </p>
          </div>
        </div>
      </div>

      {/* Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {translations.map((item, index) => (
          <button
            key={item.id}
            onClick={() => setSelectedId(item.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center space-x-1.5 ${
              selectedId === item.id
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/30'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <span>#{index + 1}</span>
            <span>{item.section.split('—')[0].trim()}</span>
          </button>
        ))}
      </div>

      {/* Visual GenAI Before & After Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* Left: Original Legal Text */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/70 border border-slate-800/90 flex flex-col justify-between relative group">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-slate-400 border border-slate-700">
                Raw Contract Text
              </span>
              <span className="text-xs font-mono text-slate-400">
                {currentItem.section}
              </span>
            </div>

            <div className="relative pl-4 border-l-2 border-slate-700 pt-1">
              <Quote className="w-4 h-4 text-slate-600 absolute -top-1 -left-2" />
              <p className="text-xs sm:text-sm text-slate-300 font-serif italic leading-relaxed">
                &ldquo;{currentItem.originalClause}&rdquo;
              </p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center text-[11px] text-slate-400">
            <span>Dense legal phrasing that obscures practical liabilities.</span>
          </div>
        </div>

        {/* Right: NyayaLens Plain English & Why It Matters */}
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-blue-950/40 via-indigo-950/30 to-slate-900 border border-blue-500/30 shadow-xl space-y-4 relative">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
              <span>NyayaLens Simple Explanation</span>
            </span>
          </div>

          {/* Simple Explanation */}
          <div className="space-y-1.5">
            <p className="text-sm sm:text-base font-semibold text-white leading-relaxed">
              {currentItem.simplifiedExplanation}
            </p>
          </div>

          {/* Why This Matters */}
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Why This Matters to You</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {currentItem.whyThisMatters}
            </p>
          </div>

          {/* Practical Real-World Example if available */}
          {currentItem.practicalExample && (
            <div className="text-xs text-blue-200/90 bg-blue-950/50 p-3 rounded-xl border border-blue-500/20">
              <strong className="text-blue-300">Real-world scenario: </strong>
              {currentItem.practicalExample}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

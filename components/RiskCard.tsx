'use client';

import React, { useState } from 'react';
import { RiskFlag, SeverityLevel } from '@/lib/types';
import { AlertTriangle, AlertCircle, Info, ChevronDown, ChevronUp, Copy, Check, HelpCircle, ShieldAlert } from 'lucide-react';

interface RiskCardProps {
  risks: RiskFlag[];
}

export default function RiskCard({ risks }: RiskCardProps) {
  const [filter, setFilter] = useState<'all' | SeverityLevel>('all');
  const [expandedId, setExpandedId] = useState<string | null>(risks[0]?.id || null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredRisks = risks.filter((r) => {
    if (filter === 'all') return true;
    return r.severity === filter;
  });

  const getSeverityBadge = (severity: SeverityLevel) => {
    switch (severity) {
      case 'high':
        return {
          label: 'High Concern',
          classes: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
          dot: 'bg-rose-500',
        };
      case 'medium':
        return {
          label: 'Moderate Concern',
          classes: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
          dot: 'bg-amber-500',
        };
      default:
        return {
          label: 'Informational Point',
          classes: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
          dot: 'bg-blue-500',
        };
    }
  };

  const copyQuestions = (risk: RiskFlag) => {
    const text = `Questions regarding ${risk.title} (${risk.section}):\n` +
      risk.questionsToClarify.map((q) => `• ${q}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopiedId(risk.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold text-white tracking-tight">
              Identified Potential Concerns ({filteredRisks.length})
            </h3>
          </div>
          <p className="text-xs text-slate-400">
            Framed as potential issues and clarification points for your legal professional, not definitive verdicts.
          </p>
        </div>

        {/* Severity Filter Tabs */}
        <div className="flex items-center space-x-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-lg transition-colors font-medium ${
              filter === 'all'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All ({risks.length})
          </button>
          <button
            onClick={() => setFilter('high')}
            className={`px-3 py-1 rounded-lg transition-colors font-medium ${
              filter === 'high'
                ? 'bg-rose-950/80 text-rose-300 border border-rose-500/30 shadow-sm'
                : 'text-slate-400 hover:text-rose-400'
            }`}
          >
            High ({risks.filter((r) => r.severity === 'high').length})
          </button>
          <button
            onClick={() => setFilter('medium')}
            className={`px-3 py-1 rounded-lg transition-colors font-medium ${
              filter === 'medium'
                ? 'bg-amber-950/80 text-amber-300 border border-amber-500/30 shadow-sm'
                : 'text-slate-400 hover:text-amber-400'
            }`}
          >
            Medium ({risks.filter((r) => r.severity === 'medium').length})
          </button>
          <button
            onClick={() => setFilter('low')}
            className={`px-3 py-1 rounded-lg transition-colors font-medium ${
              filter === 'low'
                ? 'bg-blue-950/80 text-blue-300 border border-blue-500/30 shadow-sm'
                : 'text-slate-400 hover:text-blue-400'
            }`}
          >
            Low ({risks.filter((r) => r.severity === 'low').length})
          </button>
        </div>
      </div>

      {/* Risk Cards List */}
      <div className="space-y-4">
        {filteredRisks.map((risk) => {
          const badge = getSeverityBadge(risk.severity);
          const isExpanded = expandedId === risk.id;

          return (
            <div
              key={risk.id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isExpanded
                  ? 'bg-slate-900/90 border-slate-700 shadow-xl'
                  : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700/80 hover:bg-slate-900/50'
              }`}
            >
              {/* Header Accordion Bar */}
              <div
                onClick={() => setExpandedId(isExpanded ? null : risk.id)}
                className="p-5 flex items-start justify-between gap-4 cursor-pointer"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border flex items-center space-x-1.5 ${badge.classes}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                      <span>{badge.label}</span>
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {risk.section}
                    </span>
                  </div>

                  <h4 className="text-base font-semibold text-white group-hover:text-blue-300">
                    ⚠ {risk.title}
                  </h4>

                  <p className="text-xs text-slate-300 line-clamp-2">
                    {risk.explanation}
                  </p>
                </div>

                <div className="flex items-center space-x-2 shrink-0 pt-1">
                  <div className="p-1.5 rounded-lg bg-slate-800 text-slate-400">
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </div>
              </div>

              {/* Expanded details */}
              {isExpanded && (
                <div className="px-5 pb-6 pt-2 border-t border-slate-800/80 space-y-4 text-xs text-slate-300">
                  {risk.clauseSnippet && (
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                        Relevant Excerpt from Document:
                      </span>
                      <p className="font-serif italic text-slate-300 leading-relaxed">
                        &ldquo;{risk.clauseSnippet}&rdquo;
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                      <strong className="text-amber-400 block font-semibold">
                        Why this matters to you:
                      </strong>
                      <p className="text-slate-300 leading-relaxed">
                        {risk.whyItMatters}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                      <strong className="text-rose-400 block font-semibold">
                        Potential practical impact:
                      </strong>
                      <p className="text-slate-300 leading-relaxed">
                        {risk.potentialImpact}
                      </p>
                    </div>
                  </div>

                  {risk.questionsToClarify && risk.questionsToClarify.length > 0 && (
                    <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-blue-400 flex items-center space-x-1.5">
                          <HelpCircle className="w-3.5 h-3.5" />
                          <span>Specific Questions to Clarify with Lawyer / Counterparty:</span>
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            copyQuestions(risk);
                          }}
                          className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-300 flex items-center space-x-1 transition"
                        >
                          {copiedId === risk.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span>Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy Questions</span>
                            </>
                          )}
                        </button>
                      </div>

                      <ul className="space-y-1.5 list-disc list-inside text-slate-300 pl-1">
                        {risk.questionsToClarify.map((q, i) => (
                          <li key={i} className="leading-relaxed">
                            {q}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

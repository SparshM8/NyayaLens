'use client';

import React, { useState } from 'react';
import { ComparisonResult, ComparisonClauseDelta } from '@/lib/types';
import { SAMPLE_COMPARISON } from '@/lib/comparisonSamples';
import { GitCompare, ArrowRight, AlertTriangle, CheckCircle, ShieldAlert, FileText, Sparkles, Scale } from 'lucide-react';

export default function ComparisonStudio() {
  const [comparison, setComparison] = useState<ComparisonResult>(SAMPLE_COMPARISON);
  const [docAName, setDocAName] = useState('Version A (Initial Offer)');
  const [docBName, setDocBName] = useState('Version B (Revised Counter-Agreement)');
  const [textA, setTextA] = useState('');
  const [textB, setTextB] = useState('');
  const [isComparing, setIsComparing] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'high_risk' | 'favorable'>('all');

  const handleRunComparison = async (useSample: boolean = false) => {
    setIsComparing(true);
    try {
      const customKey = typeof window !== 'undefined' ? localStorage.getItem('NYAYALENS_GEMINI_API_KEY') || '' : '';

      const res = await fetch('/api/compare', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(customKey ? { 'x-gemini-api-key': customKey } : {}),
        },
        body: JSON.stringify({
          useSample,
          textA: useSample ? '' : textA,
          textB: useSample ? '' : textB,
          nameA: docAName,
          nameB: docBName,
        }),
      });

      if (!res.ok) throw new Error('Comparison failed');
      const data: ComparisonResult = await res.json();
      setComparison(data);
    } catch {
      // Fallback to sample comparison
      setComparison(SAMPLE_COMPARISON);
    } finally {
      setIsComparing(false);
    }
  };

  const filteredClauses = comparison.clauses.filter((clause) => {
    if (activeTab === 'high_risk') return clause.riskDelta === 'high_risk';
    if (activeTab === 'favorable') return clause.riskDelta === 'favorable_to_user';
    return true;
  });

  const getDeltaBadge = (clause: ComparisonClauseDelta) => {
    switch (clause.riskDelta) {
      case 'high_risk':
        return {
          label: '⚠ High Risk Delta',
          classes: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
        };
      case 'favorable_to_user':
        return {
          label: '✓ Favorable to You',
          classes: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
        };
      case 'favorable_to_counterparty':
        return {
          label: '⚠ Favors Counterparty',
          classes: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
        };
      default:
        return {
          label: 'Neutral Modification',
          classes: 'bg-slate-800 text-slate-300 border-slate-700',
        };
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
                <GitCompare className="w-5 h-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Contract Comparison Studio
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400">
              Analyze side-by-side contractual drafts, counter-offers, or amendments to detect newly introduced risks and leverage points.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleRunComparison(true)}
              disabled={isComparing}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/30 transition flex items-center space-x-1.5 disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isComparing ? 'Comparing...' : 'Load Sample Comparison (A vs B)'}</span>
            </button>
          </div>
        </div>

        {/* Comparison Overview Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Changes</span>
            <span className="text-2xl font-extrabold text-white">
              {comparison.clauses.length}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/30 space-y-1">
            <span className="text-[10px] uppercase font-bold text-rose-400 block">High Risk Changes</span>
            <span className="text-2xl font-extrabold text-rose-400">
              {comparison.summaryOfDeltas.highRiskChanges}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-1">
            <span className="text-[10px] uppercase font-bold text-emerald-400 block">Favorable Gains</span>
            <span className="text-2xl font-extrabold text-emerald-400">
              {comparison.clauses.filter((c) => c.riskDelta === 'favorable_to_user').length}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 space-y-1">
            <span className="text-[10px] uppercase font-bold text-amber-400 block">New Clauses Added</span>
            <span className="text-2xl font-extrabold text-amber-400">
              {comparison.summaryOfDeltas.added}
            </span>
          </div>
        </div>

        {/* Executive Comparison Summary */}
        <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
          <div className="flex items-center space-x-2 text-xs font-bold text-blue-400 uppercase tracking-wider">
            <Scale className="w-3.5 h-3.5" />
            <span>AI Executive Delta Summary</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {comparison.executiveComparison}
          </p>
        </div>
      </div>

      {/* Filter Tabs for Comparison */}
      <div className="flex items-center space-x-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-xl text-xs font-medium transition-colors ${
            activeTab === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          All Clause Changes ({comparison.clauses.length})
        </button>

        <button
          onClick={() => setActiveTab('high_risk')}
          className={`px-4 py-2 rounded-xl text-xs font-medium transition-colors ${
            activeTab === 'high_risk'
              ? 'bg-rose-900/80 text-rose-300 border border-rose-500/40'
              : 'bg-slate-900 text-slate-400 hover:text-rose-400'
          }`}
        >
          High Risk Changes ({comparison.summaryOfDeltas.highRiskChanges})
        </button>

        <button
          onClick={() => setActiveTab('favorable')}
          className={`px-4 py-2 rounded-xl text-xs font-medium transition-colors ${
            activeTab === 'favorable'
              ? 'bg-emerald-900/80 text-emerald-300 border border-emerald-500/40'
              : 'bg-slate-900 text-slate-400 hover:text-emerald-400'
          }`}
        >
          Favorable Improvements
        </button>
      </div>

      {/* Comparison Diff Table / Cards */}
      <div className="space-y-6">
        {filteredClauses.map((clause, idx) => {
          const badge = getDeltaBadge(clause);

          return (
            <div
              key={idx}
              className="glass-panel rounded-3xl p-6 sm:p-7 border border-slate-800 space-y-4 hover:border-slate-700 transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center text-xs font-bold font-mono">
                    {idx + 1}
                  </span>
                  <h3 className="text-base font-bold text-white">
                    {clause.clauseTitle}
                  </h3>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border bg-slate-900 text-slate-300 border-slate-800">
                    {clause.changeType}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${badge.classes}`}
                  >
                    {badge.label}
                  </span>
                </div>
              </div>

              {/* Side-by-side Contract A vs B */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Version A */}
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {comparison.docAName}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">
                      {clause.sectionA}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-serif italic leading-relaxed">
                    &ldquo;{clause.contentA}&rdquo;
                  </p>
                </div>

                {/* Version B */}
                <div className="p-4 rounded-2xl bg-blue-950/20 border border-blue-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300">
                      {comparison.docBName}
                    </span>
                    <span className="text-[11px] font-mono text-blue-400">
                      {clause.sectionB}
                    </span>
                  </div>
                  <p className="text-xs text-slate-200 font-serif italic leading-relaxed">
                    &ldquo;{clause.contentB}&rdquo;
                  </p>
                </div>
              </div>

              {/* Impact Assessment & Advice */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 space-y-1">
                  <span className="text-amber-400 font-bold block text-[11px] uppercase tracking-wider">
                    Impact Analysis:
                  </span>
                  <p>{clause.impactAssessment}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 space-y-1">
                  <span className="text-blue-400 font-bold block text-[11px] uppercase tracking-wider">
                    Negotiation Recommendation:
                  </span>
                  <p>{clause.adviceForUser}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Negotiation Playbook */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-4">
        <div className="flex items-center space-x-2 text-white">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <h3 className="text-lg font-bold">Recommended Negotiation Strategy</h3>
        </div>

        <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
          {comparison.negotiationRecommendations.map((rec, i) => (
            <li key={i} className="flex items-start space-x-2.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="w-5 h-5 rounded-full bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                {i + 1}
              </span>
              <span className="leading-relaxed">{rec}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { DocumentAnalysis } from '@/lib/types';
import { ShieldAlert, ShieldCheck, AlertTriangle, FileText, Users, Calendar, Gavel, Clock, Copy, Check, Printer, RotateCcw, Sparkles } from 'lucide-react';

interface SummaryOverviewProps {
  analysis: DocumentAnalysis;
  onReset: () => void;
}

export default function SummaryOverview({ analysis, onReset }: SummaryOverviewProps) {
  const [copied, setCopied] = useState(false);

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high':
        return {
          bg: 'bg-rose-950/40',
          border: 'border-rose-500/40',
          text: 'text-rose-400',
          badge: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
          meter: 'bg-gradient-to-r from-amber-500 to-rose-500',
          icon: ShieldAlert,
        };
      case 'medium':
        return {
          bg: 'bg-amber-950/40',
          border: 'border-amber-500/40',
          text: 'text-amber-400',
          badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
          meter: 'bg-gradient-to-r from-yellow-500 to-amber-500',
          icon: AlertTriangle,
        };
      default:
        return {
          bg: 'bg-emerald-950/40',
          border: 'border-emerald-500/40',
          text: 'text-emerald-400',
          badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
          meter: 'bg-gradient-to-r from-teal-500 to-emerald-500',
          icon: ShieldCheck,
        };
    }
  };

  const riskInfo = getRiskColor(analysis.overallRiskLevel);
  const RiskIcon = riskInfo.icon;

  const handleCopySummary = () => {
    const textToCopy = `NyayaLens Analysis Report: ${analysis.metadata.title}
Risk Level: ${analysis.overallRiskLevel.toUpperCase()} (Score: ${analysis.riskScore}/100)
Document Type: ${analysis.metadata.documentType}
Parties: ${analysis.metadata.partiesInvolved.join(' & ')}

Executive Summary:
${analysis.executiveSummary}

Key Concerns:
${analysis.riskFlags.map((r, i) => `${i + 1}. [${r.severity.toUpperCase()}] ${r.title}: ${r.explanation}`).join('\n')}

Questions to Ask a Legal Professional:
${analysis.questionsForLawyer.map((q, i) => `${i + 1}. ${q}`).join('\n')}
`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Document Info and Actions */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20">
                {analysis.metadata.documentType}
              </span>
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center space-x-1">
                <Check className="w-3.5 h-3.5" />
                <span>Analyzed &amp; Grounded</span>
              </span>
              {analysis.modelUsed && (
                <span className="px-2 py-0.5 rounded text-[11px] text-slate-400 bg-slate-900 border border-slate-800 flex items-center space-x-1">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>{analysis.modelUsed}</span>
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {analysis.metadata.title}
            </h1>

            <p className="text-xs text-slate-400 flex items-center space-x-2">
              <span className="font-mono text-slate-300">{analysis.fileName}</span>
              <span>•</span>
              <span>{(analysis.metadata.wordCount).toLocaleString()} words</span>
              <span>•</span>
              <span>~{analysis.metadata.estimatedReadTimeMinutes} min reading time</span>
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2 no-print">
            <button
              onClick={handleCopySummary}
              className="px-3.5 py-2 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center space-x-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Report' : 'Copy Report'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center space-x-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={onReset}
              className="px-3.5 py-2 rounded-xl text-xs font-medium bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20 transition flex items-center space-x-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Analyze Another</span>
            </button>
          </div>
        </div>

        {/* Contract Key Metadata Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 text-xs text-slate-300">
          <div className="flex items-center space-x-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <Users className="w-4 h-4 text-blue-400 shrink-0" />
            <div>
              <span className="text-[10px] uppercase text-slate-500 font-bold block">Parties Identified</span>
              <span className="font-medium text-slate-200 truncate block">
                {analysis.metadata.partiesInvolved.join(' vs ')}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <span className="text-[10px] uppercase text-slate-500 font-bold block">Effective Date</span>
              <span className="font-medium text-slate-200 truncate block">
                {analysis.metadata.effectiveDate || 'Upon execution'}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <Gavel className="w-4 h-4 text-purple-400 shrink-0" />
            <div>
              <span className="text-[10px] uppercase text-slate-500 font-bold block">Governing Law</span>
              <span className="font-medium text-slate-200 truncate block">
                {analysis.metadata.governingLaw || 'Jurisdiction specified in terms'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Overview Stat Cards & Risk Gauge */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Risk Score Meter Card */}
        <div className={`p-5 rounded-2xl border ${riskInfo.bg} ${riskInfo.border} relative overflow-hidden flex flex-col justify-between`}>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
                Risk Assessment
              </span>
              <RiskIcon className={`w-5 h-5 ${riskInfo.text}`} />
            </div>
            <div className="flex items-baseline space-x-2">
              <span className={`text-3xl font-extrabold ${riskInfo.text}`}>
                {analysis.overallRiskLevel.toUpperCase()}
              </span>
              <span className="text-xs text-slate-400 font-mono">({analysis.riskScore}/100)</span>
            </div>
          </div>

          <div className="mt-4 space-y-1.5">
            <div className="w-full bg-slate-800/80 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full ${riskInfo.meter} transition-all duration-1000`}
                style={{ width: `${analysis.riskScore}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-300 leading-tight">
              {analysis.riskSummary}
            </p>
          </div>
        </div>

        {/* Important Clauses Card */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2 text-slate-400">
              <span className="text-xs uppercase font-bold tracking-wider">Key Clauses</span>
              <FileText className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-3xl font-extrabold text-white">
              {analysis.importantClauses.length}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-3">
            Compensation, termination, IP ownership, confidentiality, and restrictive covenants cataloged.
          </p>
        </div>

        {/* Potential Issues / Red Flags Card */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2 text-slate-400">
              <span className="text-xs uppercase font-bold tracking-wider">Potential Concerns</span>
              <AlertTriangle className="w-5 h-5 text-amber-400" />
            </div>
            <span className="text-3xl font-extrabold text-amber-400">
              {analysis.riskFlags.length}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-3">
            Clauses that may heavily favor the counterparty or carry enforceability uncertainties.
          </p>
        </div>

        {/* Questions for Lawyer Card */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2 text-slate-400">
              <span className="text-xs uppercase font-bold tracking-wider">Lawyer Questions</span>
              <Gavel className="w-5 h-5 text-purple-400" />
            </div>
            <span className="text-3xl font-extrabold text-purple-400">
              {analysis.questionsForLawyer.length}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-3">
            Ready-to-ask questions prepared to help you consult an advocate efficiently.
          </p>
        </div>
      </div>

      {/* Executive Plain English Summary Box */}
      <div className="glass-panel rounded-2xl p-6 sm:p-7 border border-slate-800 space-y-3">
        <div className="flex items-center space-x-2 text-blue-400">
          <Sparkles className="w-4 h-4" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">
            Executive Summary (Plain English)
          </h3>
        </div>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
          {analysis.executiveSummary}
        </p>
      </div>
    </div>
  );
}

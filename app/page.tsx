'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import UploadZone from '@/components/UploadZone';
import SummaryOverview from '@/components/SummaryOverview';
import ExplainLike18 from '@/components/ExplainLike18';
import RiskCard from '@/components/RiskCard';
import ClauseViewer from '@/components/ClauseViewer';
import ObligationsList from '@/components/ObligationsList';
import LawyerQuestions from '@/components/LawyerQuestions';
import ChatPanel from '@/components/ChatPanel';
import ArchitectureDiagram from '@/components/ArchitectureDiagram';
import { DocumentAnalysis } from '@/lib/types';
import { Sparkles, Shield, FileText, CheckCircle2, MessageSquare, AlertTriangle, ArrowRight, Gavel, Scale, GitCompare, Layers, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const [analysis, setAnalysis] = useState<DocumentAnalysis | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'risks' | 'clauses' | 'obligations' | 'questions' | 'chat'>('overview');

  const handleAnalysisComplete = (data: DocumentAnalysis) => {
    setAnalysis(data);
    setActiveTab('overview');
    // Smooth scroll to top of cockpit
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  const handleReset = () => {
    setAnalysis(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-slate-100 selection:bg-blue-600 selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Hero Section */}
        {!analysis && (
          <div className="text-center space-y-5 pt-8 pb-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Next-Gen Legal Document Intelligence</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              Understand Legal Documents{' '}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-amber-400 bg-clip-text text-transparent">
                Without the Legal Jargon.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Upload a contract, agreement, or legal document and let AI explain what actually matters — highlighting risks, obligations, important clauses, and questions for your lawyer.
            </p>
          </div>
        )}

        {/* Upload Zone or Analyzed Dashboard */}
        {!analysis ? (
          <div className="max-w-4xl mx-auto">
            <UploadZone onAnalysisComplete={handleAnalysisComplete} />

            {/* How It Works Showcase */}
            <div id="how-it-works" className="mt-20 space-y-8">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  How NyayaLens Works
                </h2>
                <p className="text-sm text-slate-400 max-w-lg mx-auto">
                  A grounded 3-step pipeline engineered for accuracy, risk transparency, and actionable legal preparedness.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-3 relative group hover:border-blue-500/40 transition">
                  <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center font-bold text-lg">
                    1
                  </div>
                  <h3 className="text-base font-bold text-white">
                    Upload &amp; Extract
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Drop any PDF, DOCX, or text contract. NyayaLens extracts the text stream, normalizes formatting, and maps sections without storing your files.
                  </p>
                </div>

                <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-3 relative group hover:border-amber-500/40 transition">
                  <div className="w-12 h-12 rounded-xl bg-amber-600/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold text-lg">
                    2
                  </div>
                  <h3 className="text-base font-bold text-white">
                    Gemini AI Synthesis
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Google Gemini identifies potential concerns, evaluates liability caps, decodes dense legalese into plain English, and structures actionable insights.
                  </p>
                </div>

                <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-3 relative group hover:border-emerald-500/40 transition">
                  <div className="w-12 h-12 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-lg">
                    3
                  </div>
                  <h3 className="text-base font-bold text-white">
                    Actionable Cockpit
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Interact with your document: Ask questions grounded in exact clauses, review flagged concerns, and copy prepared questions to bring to an attorney.
                  </p>
                </div>
              </div>

              {/* Quick Link to Contract Comparison */}
              <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-950/40 via-indigo-950/40 to-slate-900 border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    Phase 2 Feature
                  </span>
                  <h4 className="text-lg font-bold text-white">
                    Need to compare two drafts or counter-offers?
                  </h4>
                  <p className="text-xs text-slate-400">
                    Use our Contract Comparison Studio to see side-by-side diffs (e.g. 30d vs 90d notice, ₹50k vs ₹75k pay).
                  </p>
                </div>

                <Link
                  href="/compare"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-lg shadow-blue-600/30 transition flex items-center space-x-1.5 shrink-0"
                >
                  <GitCompare className="w-4 h-4" />
                  <span>Open Comparison Studio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ) : (
          /* Live Analyzed Actionable Legal Cockpit */
          <div className="space-y-8 animate-fadeIn">
            {/* Summary Overview */}
            <SummaryOverview analysis={analysis} onReset={handleReset} />

            {/* Navigation Tabs for Cockpit */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-800 scrollbar-none text-xs sm:text-sm no-print">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2.5 rounded-xl font-semibold transition-all flex items-center space-x-2 whitespace-nowrap ${
                  activeTab === 'overview'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Explain Like I&apos;m 18</span>
              </button>

              <button
                onClick={() => setActiveTab('risks')}
                className={`px-4 py-2.5 rounded-xl font-semibold transition-all flex items-center space-x-2 whitespace-nowrap ${
                  activeTab === 'risks'
                    ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20'
                    : 'text-slate-400 hover:text-amber-400 hover:bg-slate-900'
                }`}
              >
                <AlertTriangle className="w-4 h-4" />
                <span>Potential Concerns ({analysis.riskFlags.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('clauses')}
                className={`px-4 py-2.5 rounded-xl font-semibold transition-all flex items-center space-x-2 whitespace-nowrap ${
                  activeTab === 'clauses'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Clauses Explorer ({analysis.importantClauses.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('obligations')}
                className={`px-4 py-2.5 rounded-xl font-semibold transition-all flex items-center space-x-2 whitespace-nowrap ${
                  activeTab === 'obligations'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                    : 'text-slate-400 hover:text-emerald-400 hover:bg-slate-900'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Obligations &amp; Deadlines</span>
              </button>

              <button
                onClick={() => setActiveTab('questions')}
                className={`px-4 py-2.5 rounded-xl font-semibold transition-all flex items-center space-x-2 whitespace-nowrap ${
                  activeTab === 'questions'
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                    : 'text-slate-400 hover:text-purple-400 hover:bg-slate-900'
                }`}
              >
                <Gavel className="w-4 h-4" />
                <span>Questions for Lawyer</span>
              </button>

              <button
                onClick={() => setActiveTab('chat')}
                className={`px-4 py-2.5 rounded-xl font-semibold transition-all flex items-center space-x-2 whitespace-nowrap ${
                  activeTab === 'chat'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'text-slate-400 hover:text-indigo-400 hover:bg-slate-900'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Ask Your Document</span>
              </button>
            </div>

            {/* Active Tab View */}
            <div className="space-y-6">
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  <ExplainLike18 translations={analysis.explainLikeIm18} />
                  <LawyerQuestions
                    questions={analysis.questionsForLawyer}
                    nextSteps={analysis.nextSteps}
                  />
                  <div className="mt-4">
                    <h3 className="text-base font-bold text-white mb-3">
                      Quick Document Q&amp;A
                    </h3>
                    <ChatPanel
                      documentText={analysis.rawText}
                      documentTitle={analysis.metadata.title}
                    />
                  </div>
                </div>
              )}

              {activeTab === 'risks' && (
                <div className="space-y-6">
                  <RiskCard risks={analysis.riskFlags} />
                  <LawyerQuestions
                    questions={analysis.questionsForLawyer}
                    nextSteps={analysis.nextSteps}
                  />
                </div>
              )}

              {activeTab === 'clauses' && (
                <ClauseViewer clauses={analysis.importantClauses} />
              )}

              {activeTab === 'obligations' && (
                <ObligationsList obligations={analysis.obligations} />
              )}

              {activeTab === 'questions' && (
                <LawyerQuestions
                  questions={analysis.questionsForLawyer}
                  nextSteps={analysis.nextSteps}
                />
              )}

              {activeTab === 'chat' && (
                <ChatPanel
                  documentText={analysis.rawText}
                  documentTitle={analysis.metadata.title}
                />
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

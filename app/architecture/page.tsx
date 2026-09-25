'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ArchitectureDiagram from '@/components/ArchitectureDiagram';
import Link from 'next/link';
import { ArrowLeft, Layers, Cpu, ShieldCheck, CheckCircle2, FileText, Sparkles } from 'lucide-react';

export default function ArchitecturePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-slate-100 selection:bg-blue-600 selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="flex items-center space-x-2 text-xs text-slate-400">
          <Link href="/" className="hover:text-blue-400 flex items-center space-x-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Document Analysis</span>
          </Link>
          <span>/</span>
          <span className="text-slate-200">GenAI Architecture &amp; Submission Mapping</span>
        </div>

        {/* Top Architecture Diagram Component */}
        <ArchitectureDiagram />

        {/* Deep Dive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-panel rounded-3xl p-6 sm:p-7 border border-slate-800 space-y-3">
            <div className="flex items-center space-x-2 text-blue-400 font-bold text-sm uppercase">
              <Cpu className="w-4 h-4" />
              <span>Prompt Engineering &amp; JSON Enforcement</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              NyayaLens avoids unpredictable free-text LLM responses by utilizing strict JSON schema enforcement via Google Gemini API. Every extraction generates guaranteed typed interfaces for metadata, risk scores (0-100), plain English translations, potential concerns, and advocate question sets.
            </p>
          </div>

          <div className="glass-panel rounded-3xl p-6 sm:p-7 border border-slate-800 space-y-3">
            <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm uppercase">
              <ShieldCheck className="w-4 h-4" />
              <span>Ethical Positioning &amp; Legal Guardrails</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              NyayaLens is intentionally designed as an AI legal document copilot and understanding tool, not an unauthorized practice of law. Clauses are classified as &ldquo;⚠️ Potential concerns to clarify&rdquo; rather than asserting legal conclusions, and outputs actively empower the user with focused questions to ask their licensed attorney.
            </p>
          </div>
        </div>

        {/* 4-Minute Demo Video Guide Table */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-4">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-bold text-white">
              Structured 4-Minute Submission Demo Flow
            </h3>
          </div>
          <p className="text-xs text-slate-400">
            Engineered precisely around the hackathon submission video requirements:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">Segment</th>
                  <th className="py-3 px-4">Screen / Action</th>
                  <th className="py-3 px-4">Key Narrative Takeaway</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-300">
                <tr>
                  <td className="py-3 px-4 font-mono text-blue-400">0:00 – 0:20</td>
                  <td className="py-3 px-4 font-semibold text-white">The Problem</td>
                  <td className="py-3 px-4">Landing Page Hero</td>
                  <td className="py-3 px-4">Dense legal jargon causes confusion, signing traps, and unexpected financial liabilities.</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono text-blue-400">0:20 – 0:50</td>
                  <td className="py-3 px-4 font-semibold text-white">Live Upload</td>
                  <td className="py-3 px-4">Upload Zone / ACME Contract</td>
                  <td className="py-3 px-4">Extracting text, chunking clauses, and invoking Gemini 1.5 Flash live.</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono text-blue-400">0:50 – 1:30</td>
                  <td className="py-3 px-4 font-semibold text-white">AI Summary</td>
                  <td className="py-3 px-4">Cockpit Summary &amp; Risk Gauge</td>
                  <td className="py-3 px-4">Risk level (High: 78/100), key parties, read time, and plain English overview.</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono text-blue-400">1:30 – 2:20</td>
                  <td className="py-3 px-4 font-semibold text-white">Ask Your Document</td>
                  <td className="py-3 px-4">Grounded Q&amp;A Chat</td>
                  <td className="py-3 px-4">Ask: &ldquo;What happens if I leave before 1 year?&rdquo; &rarr; Cites Clause 7.2, 8.1, and ₹1.5L bond!</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono text-blue-400">2:20 – 3:00</td>
                  <td className="py-3 px-4 font-semibold text-white">Risk &amp; Jargon</td>
                  <td className="py-3 px-4">Explain Like I&apos;m 18 + Risk Cards</td>
                  <td className="py-3 px-4">Transforms uncapped indemnity into plain English with real-world examples.</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono text-blue-400">3:00 – 3:30</td>
                  <td className="py-3 px-4 font-semibold text-white">Lawyer Prep</td>
                  <td className="py-3 px-4">Questions for Lawyer</td>
                  <td className="py-3 px-4">1-click copy of targeted questions to consult an advocate productively.</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono text-blue-400">3:30 – 3:50</td>
                  <td className="py-3 px-4 font-semibold text-white">Contract Compare</td>
                  <td className="py-3 px-4">Comparison Studio</td>
                  <td className="py-3 px-4">Side-by-side diff: 30d &rarr; 90d notice, ₹50k &rarr; ₹75k pay, new non-compete.</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono text-blue-400">3:50 – 4:00</td>
                  <td className="py-3 px-4 font-semibold text-white">Architecture</td>
                  <td className="py-3 px-4">Architecture View</td>
                  <td className="py-3 px-4">Document &rarr; Chunker &rarr; Gemini Flash &rarr; JSON Schema &rarr; Actionable UI.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { Layers, ArrowDown, Cpu, FileText, CheckCircle2, ShieldCheck, Database, Sparkles, MessageSquare, Scale, HelpCircle } from 'lucide-react';

export default function ArchitectureDiagram() {
  const [activeStep, setActiveStep] = useState<number>(3);

  const steps = [
    {
      id: 1,
      title: '1. Document Ingestion',
      subtitle: 'Client / API Gateway',
      icon: FileText,
      color: 'blue',
      description: 'Upload PDF, DOCX, or TXT documents. Safe buffer extraction parses raw textual streams and removes formatting artifacts while guaranteeing zero client-side document persistence.',
      techStack: ['Next.js App Router', 'PDF.js / pdf-parse', 'Buffer Stream Decoders'],
    },
    {
      id: 2,
      title: '2. Text Pre-Processing & Chunking',
      subtitle: 'Context Normalization',
      icon: Database,
      color: 'indigo',
      description: 'Contracts are segmented into semantic clause blocks (Definitions, Compensation, Restrictive Covenants, Liabilities, Dispute Resolution) and structured for high-density LLM context injection.',
      techStack: ['RegEx Clause Boundary Detectors', 'Token Budget Allocator', 'Metadata Parser'],
    },
    {
      id: 3,
      title: '3. Google Gemini GenAI Engine',
      subtitle: 'Structured Extraction & Simplification',
      icon: Cpu,
      color: 'purple',
      description: 'Google Gemini 3.8 Flash generates grounded interpretations adhering strictly to structured JSON schemas. Produces plain English translations, potential concern flags, and specific advocate questions.',
      techStack: ['Google Gemini API', '@google/generative-ai', 'Structured JSON Schema Mode'],
    },
    {
      id: 4,
      title: '4. Legal Guardrails & Grounding Engine',
      subtitle: 'Ethics & Safety Verification',
      icon: ShieldCheck,
      color: 'amber',
      description: 'Enforces safe AI positioning (framing findings as "potential concerns" and clarification questions rather than claiming illegality), grounds chat answers in exact clause citations, and prevents hallucination.',
      techStack: ['Heuristic Risk Scorer', 'Indian Contract Act Mappings', 'Citation Grounding Checker'],
    },
    {
      id: 5,
      title: '5. Actionable Legal Cockpit',
      subtitle: 'Reactive Frontend Experience',
      icon: Scale,
      color: 'emerald',
      description: 'Renders the interactive dashboard: Executive summary, Explain Like I\'m 18 legalese translator, 1-click questions for legal counsel, clause search, and real-time grounded Q&A.',
      techStack: ['React 19', 'Tailwind CSS v4', 'Lucide React Icons', 'Clipboard API'],
    },
  ];

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
              <Layers className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              GenAI System Architecture
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            End-to-end pipeline connecting raw legal documents to verified, actionable intelligence via Google Gemini.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center space-x-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Hackathon Architecture Specification</span>
          </span>
        </div>
      </div>

      {/* Interactive Step Timeline */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
        {steps.map((step) => {
          const StepIcon = step.icon;
          const isActive = activeStep === step.id;

          return (
            <button
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              className={`p-4 rounded-2xl border text-left transition-all relative ${
                isActive
                  ? 'bg-slate-900 border-blue-500 shadow-lg shadow-blue-500/20 scale-[1.02]'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-slate-500 uppercase">
                  Step 0{step.id}
                </span>
                <StepIcon
                  className={`w-4 h-4 ${
                    isActive ? 'text-blue-400' : 'text-slate-500'
                  }`}
                />
              </div>

              <h4 className="text-xs font-bold text-white leading-snug">
                {step.title}
              </h4>
              <p className="text-[11px] text-slate-400 truncate mt-0.5">
                {step.subtitle}
              </p>
            </button>
          );
        })}
      </div>

      {/* Detailed Active Step View */}
      {(() => {
        const current = steps.find((s) => s.id === activeStep) || steps[0];
        const CurrentIcon = current.icon;

        return (
          <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
                <CurrentIcon className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-blue-400">
                  {current.subtitle}
                </span>
                <h3 className="text-lg font-bold text-white">
                  {current.title}
                </h3>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {current.description}
            </p>

            <div className="pt-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                Technologies &amp; Libraries:
              </span>
              <div className="flex flex-wrap gap-2">
                {current.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-900 text-blue-300 border border-slate-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      })()}

      {/* Visual Flow ASCII / Flow Diagram */}
      <div className="p-5 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-3 font-mono text-xs text-slate-300 overflow-x-auto">
        <div className="text-blue-400 font-bold text-[11px] uppercase tracking-wider">
          Runtime Execution Flow:
        </div>
        <pre className="text-slate-400 leading-relaxed select-all">
{`   [Upload PDF/DOCX]
          │
          ▼
   [Buffer Parser & Normalizer]
          │
          ▼
   [Semantic Clause Chunker] ──> [Token Optimization Window]
          │
          ▼
   [Google Gemini 3.8 Flash] ──> [Enforced JSON Schema Prompt]
          │
          ├─────────────────────┼─────────────────────┐
          ▼                     ▼                     ▼
   [Simplification]     [Risk Detection]     [Lawyer Questions]
   ("Explain Like 18")  (Potential Concerns)   (1-Click Copy)
          │                     │                     │
          └─────────────────────┼─────────────────────┘
                                ▼
                   [Actionable Legal Cockpit]
                   [Grounded "Ask Your Document" Q&A]`}
        </pre>
      </div>
    </div>
  );
}

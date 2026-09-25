'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, CheckCircle, AlertCircle, ArrowRight, Sparkles, ShieldAlert, BookOpen, Clock } from 'lucide-react';
import { SAMPLE_DOCUMENTS } from '@/lib/sampleDocuments';
import { DocumentAnalysis } from '@/lib/types';

interface UploadZoneProps {
  onAnalysisComplete: (analysis: DocumentAnalysis) => void;
}

export default function UploadZone({ onAnalysisComplete }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const simulateProgress = async () => {
    setLoadingStep('Uploading & extracting document text...');
    await new Promise((r) => setTimeout(r, 600));
    setLoadingStep('Chunking document & identifying key clauses...');
    await new Promise((r) => setTimeout(r, 700));
    setLoadingStep('Analyzing with Google Gemini GenAI layer...');
    await new Promise((r) => setTimeout(r, 800));
    setLoadingStep('Synthesizing plain English explanations & risk flags...');
  };

  const processFile = async (file: File) => {
    setIsLoading(true);
    setError(null);
    try {
      const progressPromise = simulateProgress();

      const formData = new FormData();
      formData.append('file', file);

      // Check if user has API key in localStorage
      const customKey = typeof window !== 'undefined' ? localStorage.getItem('NYAYALENS_GEMINI_API_KEY') || '' : '';

      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: customKey ? { 'x-gemini-api-key': customKey } : {},
        body: formData,
      });

      await progressPromise;

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to process document');
      }

      const analysis: DocumentAnalysis = await res.json();
      onAnalysisComplete(analysis);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'Error uploading file. Please try again or test with a pre-loaded sample.');
    } finally {
      setIsLoading(false);
      setLoadingStep('');
    }
  };

  const handleSelectSample = async (sampleId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const progressPromise = simulateProgress();

      const sample = SAMPLE_DOCUMENTS.find(s => s.id === sampleId);
      const customKey = typeof window !== 'undefined' ? localStorage.getItem('NYAYALENS_GEMINI_API_KEY') || '' : '';

      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(customKey ? { 'x-gemini-api-key': customKey } : {}),
        },
        body: JSON.stringify({
          sampleId,
          text: sample?.text,
          fileName: sample?.name + '.pdf',
        }),
      });

      await progressPromise;

      if (!res.ok) {
        throw new Error('Failed to analyze sample');
      }

      const analysis: DocumentAnalysis = await res.json();
      onAnalysisComplete(analysis);
    } catch (err: any) {
      console.error(err);
      setError('Could not load sample analysis.');
    } finally {
      setIsLoading(false);
      setLoadingStep('');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Upload Box */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => !isLoading && fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center transition-all cursor-pointer overflow-hidden ${
          isDragging
            ? 'border-blue-500 bg-blue-950/30 scale-[1.01]'
            : 'border-slate-700/80 hover:border-blue-500/60 bg-slate-900/60 hover:bg-slate-900/90'
        } ${isLoading ? 'pointer-events-none' : ''}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.txt,.docx,.md"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              processFile(e.target.files[0]);
            }
          }}
        />

        {/* Background glow effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/5 via-transparent to-transparent pointer-events-none" />

        {isLoading ? (
          <div className="py-8 space-y-5 animate-pulse">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <Sparkles className="w-8 h-8 animate-spin" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">Analyzing Document with Gemini</h3>
              <p className="text-sm text-blue-400 font-medium">{loadingStep}</p>
            </div>
            <div className="max-w-xs mx-auto bg-slate-800 rounded-full h-2 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-amber-400 h-full animate-[shimmer_2s_infinite]" style={{ width: '85%' }} />
            </div>
            <p className="text-xs text-slate-400">Grounding clauses, checking risk flags, and generating lawyer questions...</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-blue-600/20 to-indigo-600/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-inner group-hover:scale-105 transition-transform">
              <UploadCloud className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Drop your legal document here
              </h3>
              <p className="text-sm text-slate-400 max-w-md mx-auto">
                Supports <span className="text-slate-200 font-medium">PDF, DOCX, TXT</span> up to 25 MB. Contracts, employment agreements, NDAs, and leases.
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition"
              >
                <FileText className="w-4 h-4" />
                <span>Select File from Computer</span>
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400 pt-3">
              <span className="flex items-center space-x-1">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Simple explanation</span>
              </span>
              <span className="flex items-center space-x-1">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Risk &amp; red-flag detection</span>
              </span>
              <span className="flex items-center space-x-1">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Questions for lawyer</span>
              </span>
              <span className="flex items-center space-x-1">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Grounded document Q&amp;A</span>
              </span>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-sm flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold">Document processing error</p>
            <p className="text-xs text-rose-300/90 mt-0.5">{error}</p>
          </div>
        </div>
      )}

      {/* Pre-loaded Sample Contracts for Instant Hackathon Demonstration */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Or Try Pre-loaded Test Contracts (1-Click Instant Demo)
            </h4>
          </div>
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            Curated for testing complex legal clauses
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SAMPLE_DOCUMENTS.map((sample) => {
            const isHighRisk = sample.analysis.overallRiskLevel === 'high';
            return (
              <div
                key={sample.id}
                onClick={() => !isLoading && handleSelectSample(sample.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer text-left group ${
                  isHighRisk
                    ? 'border-amber-500/30 bg-amber-950/10 hover:bg-amber-950/20 hover:border-amber-500/60'
                    : 'border-blue-500/30 bg-blue-950/10 hover:bg-blue-950/20 hover:border-blue-500/60'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`p-2 rounded-lg ${
                        isHighRisk ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/20 text-blue-400'
                      }`}
                    >
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors">
                        {sample.name}
                      </h5>
                      <div className="flex items-center space-x-2 text-[11px] text-slate-400 mt-0.5">
                        <span className="capitalize">{sample.category}</span>
                        <span>•</span>
                        <span className="flex items-center space-x-0.5">
                          <Clock className="w-3 h-3" />
                          <span>{sample.analysis.metadata.estimatedReadTimeMinutes}m read</span>
                        </span>
                        <span>•</span>
                        <span
                          className={`font-semibold uppercase ${
                            isHighRisk ? 'text-amber-400' : 'text-emerald-400'
                          }`}
                        >
                          {sample.analysis.overallRiskLevel} Risk
                        </span>
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all mt-1" />
                </div>
                <p className="text-xs text-slate-400 mt-2.5 line-clamp-2 leading-relaxed">
                  {sample.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Scale, Sparkles, Key, GitCompare, FileText, Layers, ShieldCheck } from 'lucide-react';
import ApiKeyModal from './ApiKeyModal';

export default function Navbar() {
  const pathname = usePathname();
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('NYAYALENS_GEMINI_API_KEY');
      setHasApiKey(Boolean(stored && stored.trim()));
    }
  }, []);

  const handleKeySaved = (key: string) => {
    setHasApiKey(Boolean(key && key.trim()));
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-amber-500 p-0.5 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Scale className="w-5 h-5 text-blue-400 group-hover:text-amber-400 transition-colors" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-1.5">
                <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                  NyayaLens
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  AI Copilot
                </span>
              </div>
              <span className="text-[11px] text-slate-400 -mt-0.5 hidden sm:inline">
                Legal Document Understanding &amp; Risk Engine
              </span>
            </div>
          </Link>

          {/* Nav links */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              href="/"
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center space-x-1.5 ${
                pathname === '/'
                  ? 'bg-blue-600/15 text-blue-400 border border-blue-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Analyze Contract</span>
            </Link>

            <Link
              href="/compare"
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center space-x-1.5 ${
                pathname === '/compare'
                  ? 'bg-blue-600/15 text-blue-400 border border-blue-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <GitCompare className="w-3.5 h-3.5" />
              <span>Contract Comparison</span>
            </Link>

            <Link
              href="/architecture"
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center space-x-1.5 ${
                pathname === '/architecture'
                  ? 'bg-blue-600/15 text-blue-400 border border-blue-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>GenAI Architecture</span>
            </Link>
          </nav>

          {/* API Key and status buttons */}
          <div className="flex items-center space-x-2.5">
            <button
              onClick={() => setIsKeyModalOpen(true)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium border flex items-center space-x-2 transition-all ${
                hasApiKey
                  ? 'border-emerald-500/30 bg-emerald-950/40 text-emerald-300 hover:bg-emerald-900/50'
                  : 'border-amber-500/30 bg-amber-950/30 text-amber-300 hover:bg-amber-900/40'
              }`}
              title="Configure Google Gemini API key"
            >
              <Key className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {hasApiKey ? 'Gemini 1.5 Connected' : 'Demo Engine Active'}
              </span>
              <span className="sm:hidden">{hasApiKey ? 'Live' : 'Demo'}</span>
              <span
                className={`w-2 h-2 rounded-full ${
                  hasApiKey ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                }`}
              />
            </button>

            <a
              href="#how-it-works"
              className="text-xs text-slate-400 hover:text-white hidden lg:inline px-2 py-1"
            >
              How it works
            </a>
          </div>
        </div>
      </header>

      {/* Legal disclaimer notification strip */}
      <div className="bg-slate-900/90 border-b border-slate-800/60 py-1.5 px-4 text-center text-[11px] text-slate-400 flex items-center justify-center space-x-2">
        <ShieldCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" />
        <span>
          <strong>Document Understanding Copilot:</strong> NyayaLens assists in explaining clauses and identifying risks. It does not provide formal legal advice.
        </span>
      </div>

      <ApiKeyModal
        isOpen={isKeyModalOpen}
        onClose={() => setIsKeyModalOpen(false)}
        onKeySaved={handleKeySaved}
      />
    </>
  );
}

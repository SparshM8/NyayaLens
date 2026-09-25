import React from 'react';
import Link from 'next/link';
import { Scale, Heart, Shield, Cpu, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 py-10 mt-16 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center space-x-2">
              <Scale className="w-5 h-5 text-blue-400" />
              <span className="text-lg font-bold text-white tracking-tight">NyayaLens</span>
              <span className="px-2 py-0.5 text-[10px] rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-mono">
                v1.0 Hackathon Release
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              NyayaLens turns complex legal documents into simple, actionable explanations while highlighting risks, obligations, important clauses, and next steps for non-lawyers and professionals.
            </p>
            <div className="flex items-center space-x-2 text-xs text-slate-500 pt-1">
              <Cpu className="w-3.5 h-3.5 text-blue-400" />
              <span>Powered by Google Gemini Generative AI</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-blue-400 transition-colors">
                  Document Analysis
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-blue-400 transition-colors">
                  Contract Comparison
                </Link>
              </li>
              <li>
                <Link href="/architecture" className="hover:text-blue-400 transition-colors">
                  GenAI Architecture
                </Link>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-blue-400 transition-colors">
                  How It Works
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3">
              Legal Safety &amp; Ethics
            </h4>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 leading-relaxed space-y-1.5">
              <div className="flex items-center space-x-1.5 text-slate-200 font-medium">
                <Shield className="w-3.5 h-3.5 text-amber-400" />
                <span>Legal Disclaimer</span>
              </div>
              <p>
                NyayaLens provides automated linguistic simplification and risk indexing. It is not an attorney and does not form an attorney-client relationship.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} NyayaLens. Built for the Hackathon with Gemini GenAI.</p>
          <div className="flex items-center space-x-4 mt-2 sm:mt-0">
            <span>Client-side secure</span>
            <span>•</span>
            <span>Zero document retention</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

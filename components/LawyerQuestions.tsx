'use client';

import React, { useState } from 'react';
import { Gavel, Copy, Check, Sparkles, MessageSquare, ArrowRight, Shield } from 'lucide-react';

interface LawyerQuestionsProps {
  questions: string[];
  nextSteps: string[];
}

export default function LawyerQuestions({ questions, nextSteps }: LawyerQuestionsProps) {
  const [copiedQuestions, setCopiedQuestions] = useState(false);
  const [copiedSteps, setCopiedSteps] = useState(false);

  const handleCopyAllQuestions = () => {
    const text = "Questions to Ask My Legal Professional (prepared via NyayaLens):\n\n" +
      questions.map((q, i) => `${i + 1}. ${q}`).join('\n\n');
    navigator.clipboard.writeText(text);
    setCopiedQuestions(true);
    setTimeout(() => setCopiedQuestions(false), 2000);
  };

  const handleCopySteps = () => {
    const text = "Recommended Action Checklist:\n\n" +
      nextSteps.map((s, i) => `${i + 1}. ${s}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopiedSteps(true);
    setTimeout(() => setCopiedSteps(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Questions for Lawyer Box */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
                <Gavel className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Questions for Legal Professional
                </h3>
                <p className="text-xs text-slate-400">
                  Ready-to-ask questions to bring to an advocate or legal advisor
                </p>
              </div>
            </div>

            <button
              onClick={handleCopyAllQuestions}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-600/30 transition flex items-center space-x-1.5"
            >
              {copiedQuestions ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Questions</span>
                </>
              )}
            </button>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Taking these focused questions to your consultation saves hours of consultation time and ensures you do not miss critical exposure points:
          </p>

          <ol className="space-y-3">
            {questions.map((q, index) => (
              <li
                key={index}
                className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 text-xs sm:text-sm text-slate-200 flex items-start space-x-3 group hover:border-purple-500/40 transition-colors"
              >
                <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <span className="leading-relaxed font-medium">{q}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center space-x-2">
          <Shield className="w-4 h-4 text-purple-400 shrink-0" />
          <span>Designed specifically to bridge non-lawyers and legal counsel effectively.</span>
        </div>
      </div>

      {/* Actionable Next Steps / Checklist */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Recommended Next Steps
                </h3>
                <p className="text-xs text-slate-400">
                  Negotiation leverage points &amp; pre-signing actions
                </p>
              </div>
            </div>

            <button
              onClick={handleCopySteps}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/30 transition flex items-center space-x-1.5"
            >
              {copiedSteps ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Checklist</span>
                </>
              )}
            </button>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Concrete suggestions for requests to make before you put pen to paper:
          </p>

          <div className="space-y-3">
            {nextSteps.map((step, index) => (
              <div
                key={index}
                className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 text-xs sm:text-sm text-slate-200 flex items-start space-x-3 group hover:border-blue-500/40 transition-colors"
              >
                <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  ✓
                </div>
                <div className="space-y-0.5">
                  <span className="leading-relaxed font-medium">{step}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-blue-950/30 border border-blue-500/20 text-[11px] text-blue-300 leading-relaxed">
          <strong>Pro-tip:</strong> Always request contract changes in writing via email before signing, creating a clear mutual paper trail of intent.
        </div>
      </div>
    </div>
  );
}

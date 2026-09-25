'use client';

import React, { useState } from 'react';
import { ObligationItem } from '@/lib/types';
import { CheckCircle2, Circle, Clock, AlertCircle, Calendar } from 'lucide-react';

interface ObligationsListProps {
  obligations: ObligationItem[];
}

export default function ObligationsList({ obligations }: ObligationsListProps) {
  const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>({});

  const toggleCheck = (id: string) => {
    setCheckedMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (!obligations || obligations.length === 0) return null;

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-5">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-bold text-white tracking-tight">
              Contract Obligations &amp; Deadlines Checklist ({obligations.length})
            </h3>
          </div>
          <p className="text-xs text-slate-400">
            Explicit duties, deadlines, and potential consequences outlined in the document.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {obligations.map((item) => {
          const isChecked = Boolean(checkedMap[item.id]);
          const isUrgent = item.status === 'urgent';

          return (
            <div
              key={item.id}
              onClick={() => toggleCheck(item.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start space-x-3.5 ${
                isChecked
                  ? 'bg-slate-900/40 border-slate-800/60 opacity-60'
                  : isUrgent
                  ? 'bg-amber-950/20 border-amber-500/30 hover:border-amber-500/50'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <button
                type="button"
                className="mt-0.5 text-slate-400 hover:text-emerald-400 transition-colors shrink-0"
              >
                {isChecked ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-600" />
                )}
              </button>

              <div className="flex-1 space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase bg-slate-900 text-slate-300 border border-slate-800">
                    Party: {item.party}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono text-slate-400 bg-slate-900/80 flex items-center space-x-1">
                    <Clock className="w-3 h-3 text-blue-400" />
                    <span>{item.deadlineOrTiming}</span>
                  </span>
                  {isUrgent && (
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      High Priority
                    </span>
                  )}
                </div>

                <p
                  className={`text-sm text-slate-200 font-medium leading-relaxed ${
                    isChecked ? 'line-through text-slate-500' : ''
                  }`}
                >
                  {item.obligation}
                </p>

                {item.penaltyOrConsequence && (
                  <p className="text-xs text-rose-300 flex items-center space-x-1 pt-0.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>
                      <strong>Consequence if breached:</strong> {item.penaltyOrConsequence}
                    </span>
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

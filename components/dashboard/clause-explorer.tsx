"use client"

import { useState } from "react"
import { ChevronRight, FileText, HelpCircle, Quote, Star } from "lucide-react"
import { ReviewBadge } from "@/components/review-badge"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { clauses as defaultClauses, type Clause } from "@/lib/sample-data"
import { cn } from "@/lib/utils"

interface ClauseExplorerProps {
  customClauses?: Clause[]
}

export function ClauseExplorer({ customClauses }: ClauseExplorerProps) {
  const activeClauses = customClauses && customClauses.length > 0 ? customClauses : defaultClauses
  const [selectedId, setSelectedId] = useState(activeClauses[0]?.id || "")
  const selected = activeClauses.find((c) => c.id === selectedId) ?? activeClauses[0]

  if (!selected) return null

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,340px)_1fr]">
      {/* List */}
      <div className="flex flex-col gap-2">
        <p className="px-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {activeClauses.length} clauses analyzed
        </p>
        <div className="flex flex-col gap-2 max-h-[580px] overflow-y-auto pr-1">
          {activeClauses.map((clause) => {
            const active = clause.id === selected.id
            return (
              <button
                key={clause.id}
                type="button"
                onClick={() => setSelectedId(clause.id)}
                className={cn(
                  "flex items-center gap-3 rounded-xl border bg-card p-3 text-left transition-colors cursor-pointer",
                  active
                    ? "border-primary ring-2 ring-primary/15"
                    : "border-border hover:border-primary/40 hover:bg-muted/40",
                )}
              >
                <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                  <span className="truncate text-sm font-medium text-foreground">
                    {clause.title}
                  </span>
                  <span className="text-xs text-muted-foreground">{clause.section}</span>
                  <ReviewBadge level={clause.level} className="mt-0.5 w-fit" />
                </div>
                <ChevronRight
                  className={cn(
                    "size-4 shrink-0 text-muted-foreground transition-transform",
                    active && "translate-x-0.5 text-primary",
                  )}
                />
              </button>
            )
          })}
        </div>
      </div>

      {/* Detail */}
      <Card className="gap-5 p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex flex-col gap-1">
            <h3 className="font-display text-xl font-semibold text-foreground">
              {selected.title}
            </h3>
            <span className="text-sm text-muted-foreground">{selected.section}</span>
          </div>
          <ReviewBadge level={selected.level} />
        </div>

        <div className="flex flex-col gap-2 rounded-xl border border-border bg-muted/40 p-4">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            <Quote className="size-3.5" />
            Original text
          </div>
          <p className="text-sm leading-relaxed text-foreground/80 font-serif italic">
            "{selected.originalText}"
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <FileText className="size-4 text-primary" />
            In plain language
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {selected.explanation}
          </p>
        </div>

        <Separator />

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold text-foreground">Why it matters</p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {selected.whyItMatters}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold text-foreground">What to note</p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {selected.concern}
            </p>
          </div>
        </div>

        {selected.questions && selected.questions.length > 0 && (
          <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-2">
              <HelpCircle className="size-4 text-chart-4" />
              <p className="text-xs font-semibold uppercase tracking-wide text-foreground">
                Questions to clarify
              </p>
            </div>
            <ul className="flex flex-col gap-2">
              {selected.questions.map((q) => (
                <li key={q} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-chart-4" />
                  <span className="leading-relaxed">{q}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Card>
    </div>
  )
}

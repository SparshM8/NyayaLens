"use client"

import { useState, useMemo } from "react"
import {
  ChevronRight,
  FileText,
  HelpCircle,
  Quote,
  Search,
  Scale,
  Copy,
  Check,
  Sparkles,
  X,
  ShieldAlert,
} from "lucide-react"
import { ReviewBadge } from "@/components/review-badge"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { VoiceNarrator } from "@/components/voice-narrator"
import { clauses as defaultClauses, type Clause } from "@/lib/sample-data"
import { CLAUSE_COUNTER_PROPOSALS, type CounterProposal } from "@/lib/clauseEnhancements"
import { cn } from "@/lib/utils"

interface ClauseExplorerProps {
  customClauses?: Clause[]
}

export function ClauseExplorer({ customClauses }: ClauseExplorerProps) {
  const activeClauses = customClauses && customClauses.length > 0 ? customClauses : defaultClauses
  const [selectedId, setSelectedId] = useState(activeClauses[0]?.id || "")
  const [searchQuery, setSearchQuery] = useState("")
  const [filterLevel, setFilterLevel] = useState<string>("all")
  const [showCounterProposal, setShowCounterProposal] = useState(false)
  const [copiedCounter, setCopiedCounter] = useState(false)

  const filteredClauses = useMemo(() => {
    return activeClauses.filter((c) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.section.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.explanation.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesLevel =
        filterLevel === "all" ||
        (filterLevel === "concern" && c.level === "potential-concern") ||
        (filterLevel === "review" && c.level === "needs-review") ||
        (filterLevel === "important" && c.level === "important")
      return matchesSearch && matchesLevel
    })
  }, [activeClauses, searchQuery, filterLevel])

  const selected =
    filteredClauses.find((c) => c.id === selectedId) ??
    filteredClauses[0] ??
    activeClauses[0]

  // Find relevant counter-proposal if available
  const counterProposal: CounterProposal | null = useMemo(() => {
    if (!selected) return null
    for (const [key, prop] of Object.entries(CLAUSE_COUNTER_PROPOSALS)) {
      if (
        selected.title.toLowerCase().includes(key.toLowerCase()) ||
        selected.section.toLowerCase().includes(key.toLowerCase()) ||
        selected.originalText.toLowerCase().includes(key.toLowerCase())
      ) {
        return prop
      }
    }
    // Generic fallback for any high-risk clause
    if (selected.level === "potential-concern" || selected.level === "needs-review") {
      return {
        clauseTitle: selected.title,
        originalSnippet: selected.originalText.slice(0, 150) + "...",
        proposedReplacement: `Mutual & Balanced Standard: The provisions of this Section shall apply reciprocally to both parties, subject to a standard thirty (30) days' cure period following written notice. Liability shall be limited to actual verified direct damages and exclude speculative or consequential losses.`,
        statutoryBasis: "Section 73 of the Indian Contract Act 1872 limits damages to direct natural losses rather than speculative penalties.",
        negotiationRationale: "Establishes bilateral fairness, adds a mandatory cure period, and removes punitive one-sided penalties.",
        impactLevel: "Medium",
      }
    }
    return null
  }, [selected])

  function handleCopyCounter() {
    if (!counterProposal) return
    navigator.clipboard.writeText(counterProposal.proposedReplacement)
    setCopiedCounter(true)
    setTimeout(() => setCopiedCounter(false), 2000)
  }

  if (!selected) return null

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,340px)_1fr]">
      {/* Clause List Column */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between px-1">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {filteredClauses.length} of {activeClauses.length} clauses
          </p>
        </div>

        {/* Search bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search clauses (e.g. Non-compete, Notice)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-border bg-background py-1.5 pl-8 pr-7 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="size-3" />
            </button>
          )}
        </div>

        {/* Level filter pills */}
        <div className="flex flex-wrap gap-1 px-0.5">
          {[
            { id: "all", label: "All" },
            { id: "concern", label: "Concerns" },
            { id: "review", label: "Needs Review" },
            { id: "important", label: "Important" },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilterLevel(f.id)}
              className={cn(
                "rounded-md px-2 py-0.5 text-[11px] font-medium transition-colors cursor-pointer",
                filterLevel === f.id
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-2 max-h-[520px] overflow-y-auto pr-1">
          {filteredClauses.length === 0 ? (
            <div className="rounded-xl border border-dashed p-4 text-center text-xs text-muted-foreground">
              No matching clauses found. Try a different search.
            </div>
          ) : (
            filteredClauses.map((clause) => {
              const active = clause.id === selected?.id
              return (
                <button
                  key={clause.id}
                  type="button"
                  onClick={() => {
                    setSelectedId(clause.id)
                    setShowCounterProposal(false)
                  }}
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
            })
          )}
        </div>
      </div>

      {/* Selected Clause Detail Column */}
      <Card className="gap-5 p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex flex-col gap-1">
            <h3 className="font-display text-xl font-semibold text-foreground">
              {selected.title}
            </h3>
            <span className="text-sm text-muted-foreground">{selected.section}</span>
          </div>
          <div className="flex items-center gap-2">
            <VoiceNarrator
              textToRead={`${selected.title}. ${selected.explanation}. Why it matters: ${selected.whyItMatters}`}
              label="Listen (Audio)"
            />
            <ReviewBadge level={selected.level} />
          </div>
        </div>

        {/* Original Contract Snippet */}
        <div className="flex flex-col gap-2 rounded-xl border border-border bg-muted/40 p-4">
          <div className="flex items-center justify-between text-xs font-medium uppercase tracking-wide text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Quote className="size-3.5" />
              Original Contract Text
            </span>
            <span className="text-[10px] font-mono">Verbatim extract</span>
          </div>
          <p className="text-sm leading-relaxed text-foreground/80 font-serif italic">
            "{selected.originalText}"
          </p>
        </div>

        {/* Plain Language Summary */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <FileText className="size-4 text-primary" />
              In plain language
            </div>
            <VoiceNarrator textToRead={selected.explanation} label="Narrate" />
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

        {/* AI Clause Redlining / Counter-Proposal Generator */}
        {counterProposal && (
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Scale className="size-4 text-primary" />
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  Smart Counter-Proposal (AI Redline)
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowCounterProposal(!showCounterProposal)}
                className="text-xs font-medium text-primary hover:underline cursor-pointer"
              >
                {showCounterProposal ? "Hide Redline" : "View Balanced Counter-Clause →"}
              </button>
            </div>

            {showCounterProposal && (
              <div className="space-y-3 pt-2 text-xs">
                <div className="rounded-lg border border-border bg-card p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground">
                      Proposed Replacement Wording:
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyCounter}
                      className="inline-flex items-center gap-1 text-[11px] font-medium text-primary hover:text-primary/80 cursor-pointer"
                    >
                      {copiedCounter ? (
                        <>
                          <Check className="size-3 text-emerald-500" />
                          <span className="text-emerald-500">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="size-3" />
                          <span>Copy Clause</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="font-mono text-xs bg-muted/50 p-2.5 rounded border border-border leading-relaxed text-foreground">
                    {counterProposal.proposedReplacement}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="rounded-lg bg-card/70 border border-border p-2.5">
                    <span className="font-semibold text-foreground block mb-0.5">
                      Statutory Basis (Indian Law):
                    </span>
                    <p className="text-muted-foreground leading-relaxed text-[11px]">
                      {counterProposal.statutoryBasis}
                    </p>
                  </div>
                  <div className="rounded-lg bg-card/70 border border-border p-2.5">
                    <span className="font-semibold text-foreground block mb-0.5">
                      Negotiation Rationale:
                    </span>
                    <p className="text-muted-foreground leading-relaxed text-[11px]">
                      {counterProposal.negotiationRationale}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Questions to Clarify */}
        {selected.questions && selected.questions.length > 0 && (
          <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-2">
              <HelpCircle className="size-4 text-chart-4" />
              <p className="text-xs font-semibold uppercase tracking-wide text-foreground">
                Questions to clarify with counterpart or counsel
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

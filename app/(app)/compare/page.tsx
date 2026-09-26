"use client"

import { useState } from "react"
import {
  ArrowRight,
  ArrowRightLeft,
  FileText,
  GitCompare,
  Minus,
  Pencil,
  Plus,
  Sparkles,
  Scale,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { comparisonRows, type ComparisonRow } from "@/lib/sample-data"
import { SAMPLE_COMPARISON } from "@/lib/comparisonSamples"
import { cn } from "@/lib/utils"

const changeConfig: Record<
  ComparisonRow["change"],
  { className: string; icon: typeof Plus }
> = {
  Added: { className: "bg-review-low-soft text-review-low", icon: Plus },
  Removed: { className: "bg-review-high-soft text-review-high", icon: Minus },
  Modified: {
    className: "bg-review-medium-soft text-review-medium-foreground",
    icon: Pencil,
  },
  Unchanged: { className: "bg-muted text-muted-foreground", icon: Minus },
}

export default function ComparePage() {
  const [mode, setMode] = useState<"standard" | "live">("standard")
  const [docAName, setDocAName] = useState("Employment Agreement — Version A (Draft)")
  const [docBName, setDocBName] = useState("Employment Agreement — Version B (Counter-Offer)")
  const [textA, setTextA] = useState("")
  const [textB, setTextB] = useState("")
  const [isComparing, setIsComparing] = useState(false)
  const [liveComparison, setLiveComparison] = useState(SAMPLE_COMPARISON)

  const summary = [
    { label: "Modified", count: 4, tone: "text-review-medium-foreground" },
    { label: "Added", count: 1, tone: "text-review-low" },
    { label: "Removed", count: 1, tone: "text-review-high" },
    { label: "Unchanged", count: 2, tone: "text-muted-foreground" },
  ]

  async function handleRunAICompare() {
    setIsComparing(true)
    try {
      const customKey =
        typeof window !== "undefined"
          ? localStorage.getItem("NYAYALENS_GEMINI_API_KEY") || ""
          : ""

      const res = await fetch("/api/compare", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(customKey ? { "x-gemini-api-key": customKey } : {}),
        },
        body: JSON.stringify({
          useSample: !textA || !textB,
          textA: textA || "Draft v1",
          textB: textB || "Draft v2",
          nameA: docAName,
          nameB: docBName,
        }),
      })

      if (res.ok) {
        const data = await res.json()
        setLiveComparison(data)
      }
    } catch (e) {
      console.warn("AI compare error:", e)
    } finally {
      setIsComparing(false)
    }
  }

  function loadSampleDeltas() {
    setTextA(`1. Notice Period: 30 days written notice by either party.
2. Non-Compete: None.
3. Salary: INR 50,000 per month gross.
4. Termination: Employer may terminate at will with 15 days notice.`)
    setTextB(`1. Notice Period: 90 days written notice. Buyout strictly at employer discretion.
2. Non-Compete: 12 months pan-India ban on working for competitors.
3. Salary: INR 75,000 per month gross.
4. Termination: Both parties have mutual 90 days termination rights.`)
    setDocAName("ACME Offer v1 (Initial)")
    setDocBName("ACME Offer v2 (Revised)")
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground">
            Compare documents
          </h1>
          <p className="text-muted-foreground text-pretty">
            See exactly what changed between two versions — added, removed, and modified
            terms, side by side.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={mode === "standard" ? "default" : "outline"}
            size="sm"
            onClick={() => setMode("standard")}
          >
            Curated View
          </Button>
          <Button
            variant={mode === "live" ? "default" : "outline"}
            size="sm"
            onClick={() => setMode("live")}
          >
            <Sparkles className="size-3.5 mr-1" />
            Live AI Comparison
          </Button>
        </div>
      </div>

      {mode === "live" && (
        <Card className="p-5 space-y-4 border-primary/30 bg-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Sparkles className="size-4 text-primary" />
              Live Contract Diff Engine (Gemini 3.8 Flash)
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={loadSampleDeltas}
              className="text-xs"
            >
              Load ACME Offer v1 vs v2
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <input
                value={docAName}
                onChange={(e) => setDocAName(e.target.value)}
                placeholder="Version A Name"
                className="w-full text-xs font-semibold px-3 py-1.5 rounded-lg border border-border bg-background"
              />
              <textarea
                value={textA}
                onChange={(e) => setTextA(e.target.value)}
                placeholder="Paste Version A clauses here..."
                rows={5}
                className="w-full p-3 rounded-xl border border-border bg-background text-xs font-mono leading-relaxed outline-none focus-visible:border-ring"
              />
            </div>

            <div className="space-y-1.5">
              <input
                value={docBName}
                onChange={(e) => setDocBName(e.target.value)}
                placeholder="Version B Name"
                className="w-full text-xs font-semibold px-3 py-1.5 rounded-lg border border-border bg-background text-primary"
              />
              <textarea
                value={textB}
                onChange={(e) => setTextB(e.target.value)}
                placeholder="Paste Version B clauses here..."
                rows={5}
                className="w-full p-3 rounded-xl border border-border bg-background text-xs font-mono leading-relaxed outline-none focus-visible:border-ring"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-muted-foreground">
              Highlights newly added restrictions, notice period changes, and compensation deltas.
            </span>
            <Button
              size="sm"
              disabled={isComparing}
              onClick={handleRunAICompare}
            >
              <GitCompare className="size-4 mr-1.5" />
              {isComparing ? "Analyzing with Gemini..." : "Compare Versions Live"}
            </Button>
          </div>
        </Card>
      )}

      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
        <DocColumn
          label="Version A"
          name={docAName}
          meta="Original draft"
        />
        <span className="mx-auto flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-card text-muted-foreground">
          <ArrowRight className="size-4" />
        </span>
        <DocColumn
          label="Version B"
          name={docBName}
          meta="Revised counter-agreement"
        />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {summary.map((s) => (
          <Card key={s.label} className="gap-1 p-4">
            <span className={cn("font-display text-2xl font-semibold", s.tone)}>
              {s.count}
            </span>
            <span className="text-xs text-muted-foreground">{s.label}</span>
          </Card>
        ))}
      </div>

      {/* Comparison Table */}
      <Card className="gap-0 overflow-hidden p-0">
        <CardHeader className="border-b border-border p-5">
          <CardTitle className="flex items-center gap-2 text-base">
            <GitCompare className="size-5 text-primary" />
            Clause-by-clause comparison
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[26%] pl-5">Clause</TableHead>
                <TableHead>Version A</TableHead>
                <TableHead>Version B</TableHead>
                <TableHead className="pr-5 text-right">Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comparisonRows.map((row) => {
                const { className, icon: Icon } = changeConfig[row.change]
                const changed = row.change !== "Unchanged"
                return (
                  <TableRow key={row.clause}>
                    <TableCell className="pl-5 font-medium text-foreground">
                      {row.clause}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{row.docA}</TableCell>
                    <TableCell
                      className={cn(
                        changed ? "font-medium text-foreground" : "text-muted-foreground",
                      )}
                    >
                      {row.docB}
                    </TableCell>
                    <TableCell className="pr-5 text-right">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
                          className,
                        )}
                      >
                        <Icon className="size-3" />
                        {row.change}
                      </span>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* AI Delta Insights and Negotiation Advice */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Scale className="size-5 text-chart-4" />
          <h3 className="font-display text-lg font-semibold text-foreground">
            AI Negotiation Takeaways
          </h3>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {liveComparison.executiveComparison}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl border border-destructive/30 bg-destructive/5 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-destructive flex items-center gap-1">
              <AlertTriangle className="size-3.5" />
              High Risk Additions in Version B
            </span>
            <ul className="text-xs text-muted-foreground space-y-1.5 list-disc list-inside">
              <li>Notice period tripled from 30 to 90 days with discretionary buyout refusal.</li>
              <li>Brand new 12-month non-compete covenant introduced.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl border border-review-low/30 bg-review-low/5 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-review-low flex items-center gap-1">
              <CheckCircle2 className="size-3.5" />
              Favorable Improvements in Version B
            </span>
            <ul className="text-xs text-muted-foreground space-y-1.5 list-disc list-inside">
              <li>Monthly compensation increased by 50% (₹50k → ₹75k/month).</li>
              <li>Termination right converted from employer-only to mutual notice.</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  )
}

function DocColumn({
  label,
  name,
  meta,
}: {
  label: string
  name: string
  meta: string
}) {
  return (
    <div className="flex flex-1 items-center gap-3 rounded-xl border border-border bg-card p-4">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <FileText className="size-5" />
      </span>
      <div className="flex min-w-0 flex-col">
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </span>
        <span className="truncate text-sm font-semibold text-foreground">{name}</span>
        <span className="text-xs text-muted-foreground">{meta}</span>
      </div>
    </div>
  )
}

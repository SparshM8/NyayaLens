"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  AlertTriangle,
  ArrowRightLeft,
  Building2,
  CalendarDays,
  Check,
  CheckCircle2,
  CircleCheck,
  Download,
  FileText,
  HelpCircle,
  Lightbulb,
  ListChecks,
  MessageSquareText,
  Quote,
  RotateCcw,
  Scale,
  ScrollText,
  ShieldAlert,
  Sparkles,
  User,
} from "lucide-react"
import { ClauseExplorer } from "@/components/dashboard/clause-explorer"
import { QaPanel } from "@/components/dashboard/qa-panel"
import { QuestionsChecklist } from "@/components/dashboard/questions-checklist"
import { ReviewLevelPill } from "@/components/review-badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  currentDocument as defaultDoc,
  executiveSummary as defaultSummary,
  obligations as defaultObligations,
  clauses as defaultClauses,
  suggestedQuestions as defaultQuestions,
  sampleInconsistencies,
  sampleJargonList,
  type Clause,
  type Obligation,
  type SuggestedQuestion,
  type InconsistencyItem,
  type JargonTranslation,
} from "@/lib/sample-data"
import { ACME_ANALYSIS } from "@/lib/sampleDocuments"

export default function DashboardPage() {
  const [docInfo, setDocInfo] = useState({
    title: defaultDoc.title,
    name: defaultDoc.name,
    status: defaultDoc.status,
    reviewLevel: defaultDoc.reviewLevel as "Low" | "Moderate" | "Elevated",
    parties: defaultDoc.parties,
    effectiveDate: defaultDoc.effectiveDate,
    clauseCount: defaultDoc.clauseCount,
    concernCount: defaultDoc.concernCount,
    questionCount: defaultDoc.questionCount,
  })

  const [execSummary, setExecSummary] = useState<string[]>(defaultSummary)
  const [docObligations, setDocObligations] = useState<Obligation[]>(defaultObligations)
  const [docClauses, setDocClauses] = useState<Clause[]>(defaultClauses)
  const [docQuestions, setDocQuestions] = useState<SuggestedQuestion[]>(defaultQuestions)
  const [docInconsistencies, setDocInconsistencies] = useState<InconsistencyItem[]>(sampleInconsistencies)
  const [docJargon, setDocJargon] = useState<JargonTranslation[]>(sampleJargonList)
  const [docRawText, setDocRawText] = useState<string>("")
  const [selectedJargonId, setSelectedJargonId] = useState<string>(sampleJargonList[0]?.id || "")

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("NYAYALENS_ACTIVE_ANALYSIS")
      if (stored) {
        try {
          const parsed = JSON.parse(stored)
          loadAnalysisData(parsed)
        } catch (e) {
          console.warn("Could not parse active analysis from session:", e)
        }
      }
    }
  }, [])

  function loadAnalysisData(analysis: any) {
    const isElevated = analysis.overallRiskLevel === "high"
    const isModerate = analysis.overallRiskLevel === "medium"
    const reviewLevel: "Low" | "Moderate" | "Elevated" = isElevated
      ? "Elevated"
      : isModerate
      ? "Moderate"
      : "Low"

    setDocInfo({
      title: analysis.metadata?.title || analysis.fileName || "Contract Analysis",
      name: analysis.fileName || "Legal_Document.pdf",
      status: "Analysis Complete",
      reviewLevel,
      parties:
        analysis.metadata?.partiesInvolved?.join(" & ") ||
        "Parties identified in agreement",
      effectiveDate: analysis.metadata?.effectiveDate || "March 2026",
      clauseCount: analysis.importantClauses?.length || 8,
      concernCount: analysis.riskFlags?.length || 3,
      questionCount: analysis.questionsForLawyer?.length || 6,
    })

    if (analysis.executiveSummary) {
      const sentences = analysis.executiveSummary
        .split(/(?<=[.?!])\s+/)
        .filter((s: string) => s.trim().length > 10)
      setExecSummary(sentences.length > 0 ? sentences : [analysis.executiveSummary])
    }

    if (analysis.obligations && analysis.obligations.length > 0) {
      setDocObligations(
        analysis.obligations.map((ob: any, idx: number) => ({
          id: ob.id || `ob-${idx}`,
          party: ob.party?.toLowerCase().includes("employ") ? "Employer" : "You",
          text: ob.obligation || ob.text,
          section: ob.deadlineOrTiming || "Contract Term",
        })),
      )
    }

    if (analysis.importantClauses && analysis.importantClauses.length > 0) {
      setDocClauses(
        analysis.importantClauses.map((c: any) => ({
          id: c.id,
          title: c.title,
          section: `Section ${c.sectionNumber || "Clause"}`,
          level:
            c.severity === "high"
              ? "potential-concern"
              : c.severity === "medium"
              ? "needs-review"
              : "important",
          originalText: c.verbatimSnippet || "Refer to contract text.",
          explanation: c.plainEnglishSummary,
          whyItMatters:
            c.actionRequired || "Key contractual covenant affecting performance or liability.",
          concern: `Impact rating: ${c.severity?.toUpperCase() || "MODERATE"} priority item.`,
          questions: [
            `What are the specific exceptions to Section ${c.sectionNumber}?`,
            "Can this provision be made mutual between both parties?",
          ],
        })),
      )
    }

    if (analysis.questionsForLawyer && analysis.questionsForLawyer.length > 0) {
      setDocQuestions(
        analysis.questionsForLawyer.map((q: string, idx: number) => ({
          id: `lawyer-q-${idx}`,
          question: q,
          relatedClause: "Prepared for Legal Counsel Consultation",
        })),
      )
    }

    if (analysis.explainLikeIm18 && analysis.explainLikeIm18.length > 0) {
      const formattedJargon = analysis.explainLikeIm18.map((j: any) => ({
        id: j.id,
        originalClause: j.originalClause,
        section: j.section,
        simplifiedExplanation: j.simplifiedExplanation,
        whyThisMatters: j.whyThisMatters,
        practicalExample: j.practicalExample || "Check with legal professional.",
      }))
      setDocJargon(formattedJargon)
      setSelectedJargonId(formattedJargon[0]?.id || "")
    }

    if (analysis.rawText) {
      setDocRawText(analysis.rawText)
    }
  }

  function loadSample(sampleType: "acme" | "meridian") {
    if (sampleType === "acme") {
      loadAnalysisData(ACME_ANALYSIS)
      if (typeof window !== "undefined") {
        sessionStorage.setItem("NYAYALENS_ACTIVE_ANALYSIS", JSON.stringify(ACME_ANALYSIS))
      }
    } else {
      setDocInfo({
        title: defaultDoc.title,
        name: defaultDoc.name,
        status: defaultDoc.status,
        reviewLevel: defaultDoc.reviewLevel as any,
        parties: defaultDoc.parties,
        effectiveDate: defaultDoc.effectiveDate,
        clauseCount: defaultDoc.clauseCount,
        concernCount: defaultDoc.concernCount,
        questionCount: defaultDoc.questionCount,
      })
      setExecSummary(defaultSummary)
      setDocObligations(defaultObligations)
      setDocClauses(defaultClauses)
      setDocQuestions(defaultQuestions)
      setDocInconsistencies(sampleInconsistencies)
      setDocJargon(sampleJargonList)
      setSelectedJargonId(sampleJargonList[0]?.id || "")
      setDocRawText("")
      if (typeof window !== "undefined") {
        sessionStorage.removeItem("NYAYALENS_ACTIVE_ANALYSIS")
      }
    }
  }

  const activeJargonItem = docJargon.find((j) => j.id === selectedJargonId) || docJargon[0]

  const stats = [
    { label: "Clauses analyzed", value: docInfo.clauseCount, icon: ScrollText },
    { label: "To review", value: docInfo.concernCount, icon: ListChecks },
    { label: "Questions prepared", value: docInfo.questionCount, icon: MessageSquareText },
  ]

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Switcher Bar */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card p-3 text-xs">
        <div className="flex items-center gap-2 text-muted-foreground">
          <FileText className="size-4 text-primary" />
          <span>Active document: <strong>{docInfo.name}</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Switch sample:</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => loadSample("acme")}
            className="text-xs h-7"
          >
            ACME Tech (High Risk)
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => loadSample("meridian")}
            className="text-xs h-7"
          >
            Meridian Labs
          </Button>
          <Link href="/analyze">
            <Button size="sm" className="text-xs h-7">
              + Upload / Paste
            </Button>
          </Link>
        </div>
      </div>

      {/* Document header */}
      <Card className="gap-6 p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-start gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <FileText className="size-6" />
            </span>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-xs font-medium text-review-low">
                <CircleCheck className="size-4" />
                {docInfo.status}
              </div>
              <h1 className="font-display text-2xl font-semibold tracking-tight text-foreground text-balance">
                {docInfo.title}
              </h1>
              <p className="text-sm text-muted-foreground">{docInfo.name}</p>
              <div className="mt-1 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Building2 className="size-4" />
                  {docInfo.parties}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="size-4" />
                  Effective {docInfo.effectiveDate}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start gap-3 lg:items-end">
            <ReviewLevelPill level={docInfo.reviewLevel} />
            <div className="flex items-center gap-2">
              <Link href="/compare">
                <Button variant="outline" size="sm">
                  <ArrowRightLeft className="size-4 mr-1.5" />
                  Compare
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.print()}
              >
                <Download className="size-4 mr-1.5" />
                Export / Print
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-3 rounded-xl border border-border bg-muted/30 p-4"
            >
              <span className="flex size-10 items-center justify-center rounded-lg bg-card text-primary">
                <stat.icon className="size-5" />
              </span>
              <div className="flex flex-col">
                <span className="font-display text-2xl font-semibold text-foreground">
                  {stat.value}
                </span>
                <span className="text-xs text-muted-foreground">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="analysis" className="mt-6 gap-5">
        <TabsList className="h-auto flex-wrap justify-start gap-1 bg-transparent p-0">
          <TabsTrigger
            value="analysis"
            className="rounded-lg border border-transparent bg-card px-3.5 py-2 data-active:border-border"
          >
            <ScrollText className="size-4 mr-1.5" />
            Clause analysis
          </TabsTrigger>
          <TabsTrigger
            value="jargon"
            className="rounded-lg border border-transparent bg-card px-3.5 py-2 data-active:border-border"
          >
            <Sparkles className="size-4 mr-1.5 text-chart-4" />
            Explain Like I'm 18
          </TabsTrigger>
          <TabsTrigger
            value="inconsistencies"
            className="rounded-lg border border-transparent bg-card px-3.5 py-2 data-active:border-border"
          >
            <AlertTriangle className="size-4 mr-1.5 text-destructive" />
            Inconsistencies &amp; Conflicts ({docInconsistencies.length})
          </TabsTrigger>
          <TabsTrigger
            value="qa"
            className="rounded-lg border border-transparent bg-card px-3.5 py-2 data-active:border-border"
          >
            <MessageSquareText className="size-4 mr-1.5 text-primary" />
            Ask the document
          </TabsTrigger>
          <TabsTrigger
            value="questions"
            className="rounded-lg border border-transparent bg-card px-3.5 py-2 data-active:border-border"
          >
            <ListChecks className="size-4 mr-1.5 text-review-low" />
            Questions to raise
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Clause Analysis */}
        <TabsContent value="analysis" className="flex flex-col gap-6">
          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="size-5 text-primary" />
                  Executive summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="flex flex-col gap-3">
                  {execSummary.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                      <span className="text-sm leading-relaxed text-muted-foreground">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Key obligations</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                {docObligations.map((ob) => (
                  <div
                    key={ob.id}
                    className="flex items-start gap-3 rounded-xl border border-border bg-muted/30 p-3"
                  >
                    <span
                      className="flex size-7 shrink-0 items-center justify-center rounded-full bg-card text-primary"
                      aria-hidden="true"
                    >
                      {ob.party === "You" ? (
                        <User className="size-3.5" />
                      ) : (
                        <Building2 className="size-3.5" />
                      )}
                    </span>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-medium text-foreground">
                        {ob.party} · {ob.section}
                      </span>
                      <span className="text-sm leading-relaxed text-muted-foreground">
                        {ob.text}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <ClauseExplorer customClauses={docClauses} />
        </TabsContent>

        {/* Tab 2: Explain Like I'm 18 (Jargon Buster) */}
        <TabsContent value="jargon" className="flex flex-col gap-6">
          <Card className="p-6 space-y-6">
            <div className="flex flex-col gap-1 border-b border-border pb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="size-5 text-chart-4" />
                <h3 className="font-display text-xl font-semibold text-foreground">
                  Explain Like I&apos;m 18 — Legalese Translator
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">
                GenAI transformation translating dense contract phrasing into everyday, accessible English with practical financial and legal implications.
              </p>
            </div>

            {/* Selector Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {docJargon.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedJargonId(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition cursor-pointer ${
                    activeJargonItem.id === item.id
                      ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                      : "border border-border bg-card hover:bg-muted text-muted-foreground"
                  }`}
                >
                  #{idx + 1} {item.section.split("—")[0].trim()}
                </button>
              ))}
            </div>

            {/* Before and After Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Raw Legalese */}
              <div className="p-5 rounded-2xl border border-border bg-muted/30 flex flex-col justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-muted px-2 py-0.5 rounded">
                      Raw Legal Text
                    </span>
                    <span className="text-xs font-mono text-muted-foreground">
                      {activeJargonItem.section}
                    </span>
                  </div>
                  <p className="text-sm font-serif italic text-foreground/80 leading-relaxed pl-3 border-l-2 border-border pt-1">
                    &ldquo;{activeJargonItem.originalClause}&rdquo;
                  </p>
                </div>
                <span className="text-[11px] text-muted-foreground">
                  Formal contract phrasing that obscures personal liability.
                </span>
              </div>

              {/* NyayaLens Simplified */}
              <div className="p-5 rounded-2xl border border-primary/30 bg-primary/5 flex flex-col justify-between gap-4">
                <div className="space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded w-fit inline-block">
                    NyayaLens Plain English Explanation
                  </span>
                  <p className="text-sm font-semibold text-foreground leading-relaxed">
                    {activeJargonItem.simplifiedExplanation}
                  </p>
                  <div className="p-3 rounded-xl bg-card border border-border space-y-1">
                    <span className="text-xs font-semibold text-chart-4 flex items-center gap-1">
                      <Lightbulb className="size-3.5" />
                      Why this matters to you:
                    </span>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {activeJargonItem.whyThisMatters}
                    </p>
                  </div>
                  {activeJargonItem.practicalExample && (
                    <div className="text-xs text-foreground/90 bg-muted/60 p-3 rounded-xl border border-border">
                      <strong className="text-primary">Real-world scenario: </strong>
                      {activeJargonItem.practicalExample}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Tab 3: Inconsistencies & Conflicts */}
        <TabsContent value="inconsistencies" className="flex flex-col gap-6">
          <Card className="p-6 space-y-5">
            <div className="flex flex-col gap-1 border-b border-border pb-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="size-5 text-destructive" />
                <h3 className="font-display text-xl font-semibold text-foreground">
                  Contract Inconsistencies &amp; Conflict Detector
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Identifies conflicting terms, contradictory notice obligations, and legally questionable clauses requiring harmonization before signing.
              </p>
            </div>

            <div className="space-y-4">
              {docInconsistencies.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl border border-border bg-card space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="text-base font-semibold text-foreground flex items-center gap-2">
                      <AlertTriangle className="size-4 text-destructive shrink-0" />
                      {item.title}
                    </h4>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                        item.severity === "high"
                          ? "bg-destructive/15 text-destructive border-destructive/30"
                          : "bg-chart-4/15 text-chart-4 border-chart-4/30"
                      }`}
                    >
                      {item.severity} severity conflict
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3.5 rounded-xl border border-border bg-muted/30 space-y-1">
                      <span className="text-[11px] font-semibold text-primary block">
                        {item.clauseA.section}
                      </span>
                      <p className="text-xs font-serif italic text-muted-foreground leading-relaxed">
                        &ldquo;{item.clauseA.text}&rdquo;
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl border border-border bg-muted/30 space-y-1">
                      <span className="text-[11px] font-semibold text-destructive block">
                        {item.clauseB.section}
                      </span>
                      <p className="text-xs font-serif italic text-muted-foreground leading-relaxed">
                        &ldquo;{item.clauseB.text}&rdquo;
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-accent/40 border border-border space-y-1.5 text-xs">
                    <strong className="text-foreground block">
                      Conflict Analysis:
                    </strong>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.conflictAnalysis}
                    </p>
                    <div className="pt-1 text-primary">
                      <strong>Recommended fix: </strong> {item.recommendation}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Tab 4: Ask Your Document (Grounded Chat) */}
        <TabsContent value="qa">
          <QaPanel documentText={docRawText} documentTitle={docInfo.title} />
        </TabsContent>

        {/* Tab 5: Questions to Raise Checklist */}
        <TabsContent value="questions">
          <QuestionsChecklist customQuestions={docQuestions} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

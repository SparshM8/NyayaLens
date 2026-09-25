"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  ArrowRightLeft,
  Building2,
  CalendarDays,
  CircleCheck,
  Download,
  FileText,
  ListChecks,
  MessageSquareText,
  RotateCcw,
  ScrollText,
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
  type Clause,
  type Obligation,
  type SuggestedQuestion,
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
  const [docRawText, setDocRawText] = useState<string>("")

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
      setDocRawText("")
      if (typeof window !== "undefined") {
        sessionStorage.removeItem("NYAYALENS_ACTIVE_ANALYSIS")
      }
    }
  }

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
              + Upload New
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
            value="qa"
            className="rounded-lg border border-transparent bg-card px-3.5 py-2 data-active:border-border"
          >
            <MessageSquareText className="size-4 mr-1.5" />
            Ask the document
          </TabsTrigger>
          <TabsTrigger
            value="questions"
            className="rounded-lg border border-transparent bg-card px-3.5 py-2 data-active:border-border"
          >
            <ListChecks className="size-4 mr-1.5" />
            Questions to raise
          </TabsTrigger>
        </TabsList>

        <TabsContent value="analysis" className="flex flex-col gap-6">
          {/* Executive summary + obligations */}
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

        <TabsContent value="qa">
          <QaPanel documentText={docRawText} documentTitle={docInfo.title} />
        </TabsContent>

        <TabsContent value="questions">
          <QuestionsChecklist customQuestions={docQuestions} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

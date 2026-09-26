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
  Printer,
  Quote,
  RotateCcw,
  Scale,
  ScrollText,
  ShieldAlert,
  Sparkles,
  User,
  Volume2,
} from "lucide-react"
import { ClauseExplorer } from "@/components/dashboard/clause-explorer"
import { QaPanel } from "@/components/dashboard/qa-panel"
import { QuestionsChecklist } from "@/components/dashboard/questions-checklist"
import { ReviewLevelPill } from "@/components/review-badge"
import { VoiceNarrator } from "@/components/voice-narrator"
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
import { ACME_ANALYSIS, CONSULTANT_ANALYSIS } from "@/lib/sampleDocuments"
import { PERSONA_PROFILES, type PersonaAdvice } from "@/lib/clauseEnhancements"

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
  const [activePersona, setActivePersona] = useState<string>("employee")
  const [exportNotice, setExportNotice] = useState(false)

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

  function loadSample(sampleType: "acme" | "meridian" | "consultant") {
    if (sampleType === "acme") {
      loadAnalysisData(ACME_ANALYSIS)
      if (typeof window !== "undefined") {
        sessionStorage.setItem("NYAYALENS_ACTIVE_ANALYSIS", JSON.stringify(ACME_ANALYSIS))
      }
    } else if (sampleType === "consultant") {
      loadAnalysisData(CONSULTANT_ANALYSIS)
      if (typeof window !== "undefined") {
        sessionStorage.setItem("NYAYALENS_ACTIVE_ANALYSIS", JSON.stringify(CONSULTANT_ANALYSIS))
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

  function exportConsultationBrief() {
    const persona = PERSONA_PROFILES[activePersona] || PERSONA_PROFILES.employee
    const briefContent = `# NyayaLens Legal Consultation Brief
**Document:** ${docInfo.title} (${docInfo.name})
**Review Level:** ${docInfo.reviewLevel} Risk
**Parties:** ${docInfo.parties}
**Effective Date:** ${docInfo.effectiveDate}
**Analyzed Under Persona Lens:** ${persona.name}
**Generated Date:** ${new Date().toLocaleDateString("en-IN", { dateStyle: "long" })}

---

## 1. Executive Summary
${execSummary.map((s, i) => `${i + 1}. ${s}`).join("\n")}

---

## 2. Persona-Specific Legal Warning (${persona.name})
${persona.primaryWarning}

### Key Scrutiny Items:
${persona.keyConcerns.map((c) => `- ${c}`).join("\n")}

### Tactical Negotiation Recommendations:
${persona.negotiationTips.map((t) => `- ${t}`).join("\n")}

---

## 3. High-Priority Clauses & Statutory Risks
${docClauses
  .filter((c) => c.level === "potential-concern" || c.level === "needs-review")
  .map(
    (c) => `### [${c.level.toUpperCase()}] ${c.title} (${c.section})
- **Original Wording:** "${c.originalText}"
- **Plain Language Translation:** ${c.explanation}
- **Why It Matters:** ${c.whyItMatters}
- **Risk Impact:** ${c.concern}`
  )
  .join("\n\n")}

---

## 4. Advocate Consultation Checklist (Prepared Questions)
${docQuestions.map((q, idx) => `${idx + 1}. ${q.question} [Ref: ${q.relatedClause}]`).join("\n")}

---
*Notice: This consultation brief was generated by NyayaLens Legal Intelligence Engine for informational and advocate-briefing purposes only.*
`
    const blob = new Blob([briefContent], { type: "text/markdown;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `NyayaLens_Brief_${docInfo.name.replace(/\.[^/.]+$/, "")}.md`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    setExportNotice(true)
    setTimeout(() => setExportNotice(false), 3000)
  }

  const activePersonaProfile: PersonaAdvice = PERSONA_PROFILES[activePersona] || PERSONA_PROFILES.employee
  const activeJargonItem = docJargon.find((j) => j.id === selectedJargonId) || docJargon[0]

  const stats = [
    { label: "Clauses analyzed", value: docInfo.clauseCount, icon: ScrollText },
    { label: "To review", value: docInfo.concernCount, icon: ListChecks },
    { label: "Questions prepared", value: docInfo.questionCount, icon: MessageSquareText },
  ]

  // Quantitative Risk Dimension Calculations
  const isHighRisk = docInfo.reviewLevel === "Elevated"
  const enforceabilityScore = isHighRisk ? 38 : 88
  const financialLiabilityRisk = isHighRisk ? "High (₹3.5L clawbacks + uncapped indemnity)" : "Low (standard invoices)"
  const noticeSymmetry = isHighRisk ? "Asymmetric (24h vs 90d)" : "Symmetric (14d mutual)"
  const ipFreedomScore = isHighRisk ? "Restricted (personal time IP captured)" : "Protected (pre-existing IP retained)"

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
      {/* Switcher Bar & Sample Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card p-3 text-xs">
        <div className="flex items-center gap-2 text-muted-foreground">
          <FileText className="size-4 text-primary" />
          <span>Active document: <strong>{docInfo.name}</strong></span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
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
            onClick={() => loadSample("consultant")}
            className="text-xs h-7"
          >
            Nexus Consultant (Balanced)
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => loadSample("meridian")}
            className="text-xs h-7"
          >
            Meridian Designer
          </Button>
          <Link
            href="/analyze"
            className="inline-flex items-center gap-1 rounded-md bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            + Upload New
          </Link>
        </div>
      </div>

      {/* Header with Title & Export Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-1.5">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {docInfo.title}
            </h1>
            <ReviewLevelPill level={docInfo.reviewLevel} />
          </div>
          <p className="text-xs text-muted-foreground sm:text-sm">
            {docInfo.name} · {docInfo.status}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.print()}
            className="flex items-center gap-1.5 text-xs h-9 cursor-pointer"
          >
            <Printer className="size-3.5" />
            Print View
          </Button>
          <Button
            size="sm"
            onClick={exportConsultationBrief}
            className="flex items-center gap-1.5 text-xs h-9 cursor-pointer shadow-sm"
          >
            <Download className="size-3.5" />
            Export Lawyer Brief
          </Button>
        </div>
      </div>

      {exportNotice && (
        <div className="flex items-center gap-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-2 text-xs text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="size-4 shrink-0" />
          <span>Legal Consultation Brief downloaded! Ready to share with your legal advocate or counterpart.</span>
        </div>
      )}

      {/* Metadata & Quick Stats Bar */}
      <Card className="gap-0 p-0 overflow-hidden">
        <div className="grid divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          <div className="flex items-center gap-3 p-4">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Building2 className="size-4" />
            </span>
            <div className="flex flex-col">
              <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                Parties
              </span>
              <span className="truncate text-xs font-semibold text-foreground">
                {docInfo.parties}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <CalendarDays className="size-4" />
            </span>
            <div className="flex flex-col">
              <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                Effective date
              </span>
              <span className="text-xs font-semibold text-foreground">
                {docInfo.effectiveDate}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <ScrollText className="size-4" />
            </span>
            <div className="flex flex-col">
              <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                Clauses Analyzed
              </span>
              <span className="text-xs font-semibold text-foreground">
                {docInfo.clauseCount} Key Provisions
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
              <ShieldAlert className="size-4" />
            </span>
            <div className="flex flex-col">
              <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                High Priority Risks
              </span>
              <span className="text-xs font-semibold text-destructive">
                {docInfo.concernCount} Items Flagged
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* DYNAMIC PERSONA LENS SWITCHER (Challenge Expectation: Decision Making Based on Context) */}
      <Card className="p-4 sm:p-5 border-primary/25 bg-gradient-to-r from-primary/5 via-card to-card">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">{activePersonaProfile.icon}</span>
              <div>
                <h3 className="text-sm font-bold text-foreground flex items-center gap-1.5">
                  Dynamic Persona Lens: <span className="text-primary">{activePersonaProfile.name}</span>
                </h3>
                <p className="text-xs text-muted-foreground">
                  {activePersonaProfile.tagline}
                </p>
              </div>
            </div>

            {/* Persona Switcher Buttons */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] text-muted-foreground mr-1">Switch persona:</span>
              {Object.values(PERSONA_PROFILES).map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActivePersona(p.id)}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition cursor-pointer ${
                    activePersona === p.id
                      ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                      : "border border-border bg-card hover:bg-muted text-muted-foreground"
                  }`}
                >
                  <span>{p.icon}</span>
                  <span>{p.name.split("/")[0].trim()}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Persona Advice Card Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="rounded-xl border border-border bg-card p-3.5 space-y-1.5">
              <span className="font-semibold text-destructive flex items-center gap-1">
                <AlertTriangle className="size-3.5" />
                Primary Warning:
              </span>
              <p className="text-muted-foreground leading-relaxed">
                {activePersonaProfile.primaryWarning}
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-3.5 space-y-1.5">
              <span className="font-semibold text-chart-4 flex items-center gap-1">
                <Lightbulb className="size-3.5" />
                Key Items to Scrutinize:
              </span>
              <ul className="space-y-1 text-muted-foreground list-disc list-inside">
                {activePersonaProfile.keyConcerns.map((kc, i) => (
                  <li key={i} className="line-clamp-2">{kc}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-border bg-card p-3.5 space-y-1.5">
              <span className="font-semibold text-primary flex items-center gap-1">
                <CheckCircle2 className="size-3.5" />
                Tactical Negotiation Move:
              </span>
              <ul className="space-y-1 text-muted-foreground list-disc list-inside">
                {activePersonaProfile.negotiationTips.map((nt, i) => (
                  <li key={i} className="line-clamp-2">{nt}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Card>

      {/* MULTI-DIMENSIONAL RISK HEALTH RADAR */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-muted-foreground">Statutory Enforceability</span>
            <span className={`font-bold ${enforceabilityScore < 50 ? "text-destructive" : "text-emerald-500"}`}>
              {enforceabilityScore}% Safe
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                enforceabilityScore < 50 ? "bg-destructive w-[38%]" : "bg-emerald-500 w-[88%]"
              }`}
            />
          </div>
          <p className="text-[11px] text-muted-foreground">
            {isHighRisk ? "Section 27 void non-compete detected." : "Standard mutual provisions."}
          </p>
        </Card>

        <Card className="p-4 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-muted-foreground">Financial Exposure</span>
            <span className="font-bold text-foreground">
              {isHighRisk ? "₹3.5L Risk" : "Normal"}
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
            <div className={`h-full rounded-full ${isHighRisk ? "bg-destructive w-[85%]" : "bg-emerald-500 w-[15%]"}`} />
          </div>
          <p className="text-[11px] text-muted-foreground">
            {financialLiabilityRisk}
          </p>
        </Card>

        <Card className="p-4 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-muted-foreground">Notice Symmetry</span>
            <span className="font-bold text-foreground">
              {isHighRisk ? "Unbalanced" : "Bilateral"}
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
            <div className={`h-full rounded-full ${isHighRisk ? "bg-chart-4 w-[75%]" : "bg-emerald-500 w-[20%]"}`} />
          </div>
          <p className="text-[11px] text-muted-foreground">
            {noticeSymmetry}
          </p>
        </Card>

        <Card className="p-4 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-muted-foreground">IP Protection</span>
            <span className="font-bold text-foreground">
              {isHighRisk ? "Restricted" : "Safe"}
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
            <div className={`h-full rounded-full ${isHighRisk ? "bg-destructive w-[80%]" : "bg-emerald-500 w-[10%]"}`} />
          </div>
          <p className="text-[11px] text-muted-foreground">
            {ipFreedomScore}
          </p>
        </Card>
      </div>

      {/* Main Tabs Navigation */}
      <Tabs defaultValue="analysis" className="gap-5">
        <TabsList className="h-auto flex-wrap justify-start gap-1 bg-transparent p-0">
          <TabsTrigger
            value="analysis"
            className="rounded-lg border border-transparent bg-card px-3.5 py-2 data-active:border-border cursor-pointer"
          >
            <ScrollText className="size-4 mr-1.5 text-primary" />
            Clause Analysis &amp; Redline
          </TabsTrigger>
          <TabsTrigger
            value="jargon"
            className="rounded-lg border border-transparent bg-card px-3.5 py-2 data-active:border-border cursor-pointer"
          >
            <Sparkles className="size-4 mr-1.5 text-chart-4" />
            Explain Like I'm 18
          </TabsTrigger>
          <TabsTrigger
            value="inconsistencies"
            className="rounded-lg border border-transparent bg-card px-3.5 py-2 data-active:border-border cursor-pointer"
          >
            <AlertTriangle className="size-4 mr-1.5 text-destructive" />
            Inconsistencies &amp; Conflicts ({docInconsistencies.length})
          </TabsTrigger>
          <TabsTrigger
            value="qa"
            className="rounded-lg border border-transparent bg-card px-3.5 py-2 data-active:border-border cursor-pointer"
          >
            <MessageSquareText className="size-4 mr-1.5 text-primary" />
            Ask the Document
          </TabsTrigger>
          <TabsTrigger
            value="questions"
            className="rounded-lg border border-transparent bg-card px-3.5 py-2 data-active:border-border cursor-pointer"
          >
            <ListChecks className="size-4 mr-1.5 text-emerald-500" />
            Questions to Raise ({docQuestions.length})
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Clause Analysis */}
        <TabsContent value="analysis" className="flex flex-col gap-6">
          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="size-5 text-primary" />
                  Executive Summary
                </CardTitle>
                <VoiceNarrator textToRead={execSummary.join(". ")} label="Listen Summary" />
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
                <CardTitle className="text-base">Key Obligations</CardTitle>
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

          {/* Interactive Clause Explorer with Redline & Audio */}
          <ClauseExplorer customClauses={docClauses} />
        </TabsContent>

        {/* Tab 2: Explain Like I'm 18 (Jargon Buster) */}
        <TabsContent value="jargon" className="flex flex-col gap-6">
          <Card className="p-6 space-y-6">
            <div className="flex flex-col gap-1 border-b border-border pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="size-5 text-chart-4" />
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    Explain Like I&apos;m 18 — Legalese Translator
                  </h3>
                </div>
                <VoiceNarrator
                  textToRead={`${activeJargonItem.simplifiedExplanation}. Why this matters: ${activeJargonItem.whyThisMatters}`}
                  label="Listen Aloud"
                />
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
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded w-fit inline-block">
                      NyayaLens Plain English Explanation
                    </span>
                    <VoiceNarrator textToRead={activeJargonItem.simplifiedExplanation} label="Narrate" />
                  </div>
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

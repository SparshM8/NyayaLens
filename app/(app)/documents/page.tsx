"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowRight,
  Download,
  FileText,
  Loader2,
  Plus,
  Search,
  Sparkles,
  ShieldAlert,
  CheckCircle2,
} from "lucide-react"
import { ReviewLevelPill } from "@/components/review-badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ACME_ANALYSIS, CONSULTANT_ANALYSIS } from "@/lib/sampleDocuments"

interface DocCard {
  id: string
  name: string
  type: string
  sizeLabel: string
  uploadedAt: string
  clauseCount: number
  reviewLevel: "Low" | "Moderate" | "Elevated"
  analysisData?: any
  description: string
}

const DOCUMENTS: DocCard[] = [
  {
    id: "acme-employment",
    name: "ACME Technologies Employment Agreement.pdf",
    type: "Employment Contract",
    sizeLabel: "248 KB",
    uploadedAt: "Today",
    clauseCount: 10,
    reviewLevel: "Elevated",
    analysisData: ACME_ANALYSIS,
    description: "High-risk tech contract containing 90-day notice, ₹1.5L training penalty bond, and 24-month non-compete.",
  },
  {
    id: "nexus-consultant",
    name: "Nexus Consultant NDA & IP Agreement.pdf",
    type: "Consulting & NDA",
    sizeLabel: "96 KB",
    uploadedAt: "Yesterday",
    clauseCount: 5,
    reviewLevel: "Low",
    analysisData: CONSULTANT_ANALYSIS,
    description: "Balanced AI consultant agreement with 14-day notice, payment-triggered IP transfer, and pre-existing code retention.",
  },
  {
    id: "meridian-designer",
    name: "Employment Agreement — Meridian Labs.pdf",
    type: "Employment Agreement",
    sizeLabel: "180 KB",
    uploadedAt: "3 days ago",
    clauseCount: 8,
    reviewLevel: "Moderate",
    description: "Senior Product Designer agreement with IP assignment, discretionary performance bonuses, and 30-day notice.",
  },
]

export default function DocumentsPage() {
  const router = useRouter()
  const [search, setSearch] = useState("")

  const filtered = DOCUMENTS.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.type.toLowerCase().includes(search.toLowerCase()) ||
      d.description.toLowerCase().includes(search.toLowerCase())
  )

  function openAnalysis(doc: DocCard) {
    if (typeof window !== "undefined") {
      if (doc.analysisData) {
        sessionStorage.setItem("NYAYALENS_ACTIVE_ANALYSIS", JSON.stringify(doc.analysisData))
      } else {
        sessionStorage.removeItem("NYAYALENS_ACTIVE_ANALYSIS")
      }
    }
    router.push("/dashboard")
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground">
            Contract Vault &amp; Pre-Analyzed Documents
          </h1>
          <p className="text-muted-foreground text-sm">
            Curated Indian legal scenarios and previously analyzed contracts ready for instant review and comparison.
          </p>
        </div>
        <Link
          href="/analyze"
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition shadow-sm"
        >
          <Plus className="size-4" />
          Analyze New Document
        </Link>
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-2.5">
        <Search className="size-4 text-muted-foreground" />
        <input
          placeholder="Search contracts by name, type, or clause risks…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-6 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((doc) => (
          <Card key={doc.id} className="group gap-0 overflow-hidden p-0 flex flex-col justify-between hover:border-primary/50 transition">
            <CardContent className="flex flex-col gap-4 p-5">
              <div className="flex items-start justify-between gap-3">
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <FileText className="size-5" />
                </span>
                <ReviewLevelPill level={doc.reviewLevel} />
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {doc.type}
                </span>
                <h3 className="line-clamp-2 text-sm font-semibold text-foreground">
                  {doc.name}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {doc.description}
                </p>
                <span className="text-[11px] text-muted-foreground pt-1">
                  {doc.sizeLabel} · {doc.uploadedAt} · {doc.clauseCount} clauses
                </span>
              </div>
            </CardContent>

            <button
              type="button"
              onClick={() => openAnalysis(doc)}
              className="flex items-center justify-between border-t border-border px-5 py-3 text-sm font-medium text-primary hover:bg-primary/5 transition cursor-pointer"
            >
              <span>Launch in Dashboard</span>
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Card>
        ))}
      </div>
    </div>
  )
}

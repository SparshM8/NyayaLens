"use client"

import React from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Cpu,
  Layers,
  ShieldCheck,
  Sparkles,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ArchitectureDiagram from "@/components/ArchitectureDiagram"

export default function ArchitecturePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
        <Link href="/dashboard" className="hover:text-primary flex items-center space-x-1">
          <ArrowLeft className="size-3.5" />
          <span>Back to Dashboard</span>
        </Link>
        <span>/</span>
        <span className="text-foreground">GenAI Architecture &amp; Submission Mapping</span>
      </div>

      {/* Top Architecture Diagram Component */}
      <ArchitectureDiagram />

      {/* Deep Dive Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base text-primary">
              <Cpu className="size-5" />
              Prompt Engineering &amp; JSON Enforcement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">
              NyayaLens avoids unpredictable free-text LLM responses by utilizing strict JSON schema enforcement via Google Gemini API. Every extraction generates guaranteed typed interfaces for metadata, risk scores (0-100), plain English translations, potential concerns, and advocate question sets.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base text-chart-4">
              <ShieldCheck className="size-5" />
              Ethical Positioning &amp; Legal Guardrails
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">
              NyayaLens is intentionally designed as an AI legal document copilot and understanding tool, not an unauthorized practice of law. Clauses are classified as &ldquo;⚠️ Potential concerns to clarify&rdquo; rather than asserting legal conclusions, and outputs actively empower the user with focused questions to ask their licensed attorney.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 4-Minute Demo Video Guide Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Sparkles className="size-5 text-primary" />
            Structured 4-Minute Submission Demo Flow
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            Engineered precisely around the hackathon submission video requirements:
          </p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-border text-muted-foreground uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">Segment</th>
                  <th className="py-3 px-4">Screen / Action</th>
                  <th className="py-3 px-4">Key Narrative Takeaway</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-muted-foreground">
                <tr>
                  <td className="py-3 px-4 font-mono font-medium text-primary">0:00 – 0:20</td>
                  <td className="py-3 px-4 font-semibold text-foreground">The Problem</td>
                  <td className="py-3 px-4">Landing Page Hero</td>
                  <td className="py-3 px-4">Dense legal jargon causes confusion, signing traps, and unexpected financial liabilities.</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono font-medium text-primary">0:20 – 0:50</td>
                  <td className="py-3 px-4 font-semibold text-foreground">Live Upload</td>
                  <td className="py-3 px-4">Upload Box / ACME Contract</td>
                  <td className="py-3 px-4">Extracting text, chunking clauses, and invoking Gemini 3.8 Flash live.</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono font-medium text-primary">0:50 – 1:30</td>
                  <td className="py-3 px-4 font-semibold text-foreground">AI Summary</td>
                  <td className="py-3 px-4">Dashboard &amp; Review Level</td>
                  <td className="py-3 px-4">Review level (Elevated), CTC (₹18L), parties, read time, and plain English overview.</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono font-medium text-primary">1:30 – 2:20</td>
                  <td className="py-3 px-4 font-semibold text-foreground">Ask Your Document</td>
                  <td className="py-3 px-4">Grounded Q&amp;A Chat</td>
                  <td className="py-3 px-4">Ask: &ldquo;What happens if I leave before 1 year?&rdquo; &rarr; Cites Clause 7.2, 8.1, and ₹1.5L bond!</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono font-medium text-primary">2:20 – 3:00</td>
                  <td className="py-3 px-4 font-semibold text-foreground">Risk &amp; Jargon</td>
                  <td className="py-3 px-4">Clause Explorer (Plain English)</td>
                  <td className="py-3 px-4">Transforms uncapped indemnity into plain English with real-world examples.</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono font-medium text-primary">3:00 – 3:30</td>
                  <td className="py-3 px-4 font-semibold text-foreground">Lawyer Prep</td>
                  <td className="py-3 px-4">Questions Checklist</td>
                  <td className="py-3 px-4">1-click copy of targeted questions to consult an advocate productively.</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono font-medium text-primary">3:30 – 3:50</td>
                  <td className="py-3 px-4 font-semibold text-foreground">Contract Compare</td>
                  <td className="py-3 px-4">Comparison Studio (/compare)</td>
                  <td className="py-3 px-4">Side-by-side diff: Notice tripled (30d &rarr; 90d), new 12-month non-compete, pay increased (₹50k &rarr; ₹75k).</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono font-medium text-primary">3:50 – 4:00</td>
                  <td className="py-3 px-4 font-semibold text-foreground">Architecture</td>
                  <td className="py-3 px-4">Architecture View</td>
                  <td className="py-3 px-4">Document &rarr; Chunker &rarr; Gemini Flash &rarr; JSON Schema &rarr; Actionable UI.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

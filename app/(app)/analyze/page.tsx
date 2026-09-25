"use client"

import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import {
  CheckCircle2,
  FileText,
  Loader2,
  Lock,
  ScanText,
  Sparkles,
  Upload,
  X,
  AlertCircle,
  FileCode,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

const analysisSteps = [
  "Extracting text and structure from document",
  "Identifying clauses and contractual obligations",
  "Running Gemini GenAI plain-language translation",
  "Highlighting potential concerns & lawyer questions",
]

const sampleDocs = [
  {
    id: "acme-employment",
    name: "ACME Technologies Employment Agreement.pdf",
    size: "248 KB",
    type: "Employment (High Risk)",
    desc: "Tech contract with 90-day notice, ₹1.5L training damages, 24-month non-compete.",
  },
  {
    id: "meridian",
    name: "Employment Agreement — Meridian Labs.pdf",
    size: "180 KB",
    type: "Employment (Balanced)",
    desc: "Senior Product Designer agreement with IP assignment & discretionary bonus.",
  },
  {
    id: "consultant-nda",
    name: "Nexus Consultant NDA & IP Agreement.docx",
    size: "96 KB",
    type: "Consulting / NDA",
    desc: "Milestone-based AI consulting agreement with background IP retention.",
  },
]

export default function AnalyzePage() {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [activeTab, setActiveTab] = useState<"upload" | "paste">("upload")
  const [dragging, setDragging] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [selectedSampleId, setSelectedSampleId] = useState<string | null>(null)
  const [pastedText, setPastedText] = useState("")
  const [stage, setStage] = useState<"idle" | "analyzing">("idle")
  const [activeStep, setActiveStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)

  function pickFile(file: File) {
    setSelectedFile(file)
    setFileName(file.name)
    setSelectedSampleId(null)
    setError(null)
  }

  function pickSample(sample: (typeof sampleDocs)[0]) {
    setSelectedFile(null)
    setFileName(sample.name)
    setSelectedSampleId(sample.id)
    setError(null)
  }

  async function runAnalysis() {
    setStage("analyzing")
    setActiveStep(0)
    setProgress(15)
    setError(null)

    const stepInterval = setInterval(() => {
      setActiveStep((prev) => {
        const next = Math.min(prev + 1, analysisSteps.length - 1)
        setProgress(Math.min(90, ((next + 1) / analysisSteps.length) * 100))
        return next
      })
    }, 700)

    try {
      const customKey =
        typeof window !== "undefined"
          ? localStorage.getItem("NYAYALENS_GEMINI_API_KEY") || ""
          : ""

      let res: Response

      if (activeTab === "paste" && pastedText.trim()) {
        res = await fetch("/api/analyze", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(customKey ? { "x-gemini-api-key": customKey } : {}),
          },
          body: JSON.stringify({
            text: pastedText.trim(),
            fileName: fileName || "Pasted_Contract.txt",
          }),
        })
      } else if (selectedFile) {
        const formData = new FormData()
        formData.append("file", selectedFile)
        res = await fetch("/api/analyze", {
          method: "POST",
          headers: customKey ? { "x-gemini-api-key": customKey } : {},
          body: formData,
        })
      } else {
        res = await fetch("/api/analyze", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(customKey ? { "x-gemini-api-key": customKey } : {}),
          },
          body: JSON.stringify({
            sampleId: selectedSampleId || "acme-employment",
            fileName: fileName || "Document.pdf",
          }),
        })
      }

      clearInterval(stepInterval)

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}))
        throw new Error(errData.error || "Failed to analyze document")
      }

      const data = await res.json()
      setProgress(100)
      setActiveStep(analysisSteps.length)

      if (typeof window !== "undefined") {
        sessionStorage.setItem("NYAYALENS_ACTIVE_ANALYSIS", JSON.stringify(data))
      }

      setTimeout(() => {
        router.push("/dashboard")
      }, 500)
    } catch (err: any) {
      clearInterval(stepInterval)
      setStage("idle")
      setError(err?.message || "Analysis failed. Please check your document and try again.")
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-2">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground">
          Analyze a document
        </h1>
        <p className="text-muted-foreground text-pretty">
          Upload a contract or paste raw legal clauses. NyayaLens uses Google Gemini to read it and
          explain what matters — highlighting risks, obligations, and next steps in plain language.
        </p>
      </div>

      {error && (
        <div className="mt-4 flex items-start gap-3 rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
          <AlertCircle className="size-5 shrink-0 mt-0.5" />
          <div className="flex-1">{error}</div>
        </div>
      )}

      {stage === "idle" ? (
        <div className="mt-8 flex flex-col gap-6">
          <Tabs
            value={activeTab}
            onValueChange={(v) => setActiveTab(v as "upload" | "paste")}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 max-w-xs mb-4">
              <TabsTrigger value="upload" className="flex items-center gap-2">
                <Upload className="size-3.5" />
                Upload Document
              </TabsTrigger>
              <TabsTrigger value="paste" className="flex items-center gap-2">
                <FileCode className="size-3.5" />
                Paste Contract Text
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upload">
              <Card className="overflow-hidden p-0">
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  onDragOver={(e) => {
                    e.preventDefault()
                    setDragging(true)
                  }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault()
                    setDragging(false)
                    const f = e.dataTransfer.files?.[0]
                    if (f) pickFile(f)
                  }}
                  className={cn(
                    "flex w-full flex-col items-center gap-4 px-6 py-14 text-center transition-colors cursor-pointer",
                    dragging ? "bg-accent/60" : "bg-card hover:bg-muted/50",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-chart-3/15 text-primary transition-transform",
                      dragging && "scale-110",
                    )}
                  >
                    <Upload className="size-7" />
                  </span>
                  <div className="flex flex-col gap-1">
                    <p className="text-base font-semibold text-foreground">
                      {dragging ? "Drop your file to upload" : "Drag & drop your document here"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      or click to browse — PDF, DOCX, or TXT up to 25 MB
                    </p>
                  </div>
                  <input
                    ref={inputRef}
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0]
                      if (f) pickFile(f)
                    }}
                  />
                </button>
              </Card>
            </TabsContent>

            <TabsContent value="paste">
              <Card className="p-5 flex flex-col gap-3">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Paste contract, agreement, or clause text live (No pre-fill):
                </label>
                <textarea
                  value={pastedText}
                  onChange={(e) => {
                    setPastedText(e.target.value)
                    setFileName("Custom_Contract_Pasted.txt")
                    setSelectedFile(null)
                    setSelectedSampleId(null)
                  }}
                  placeholder="Paste contract clauses here... e.g. '1. Non-Compete: For 24 months following termination, Employee shall not directly or indirectly work for any competitor...'"
                  rows={8}
                  className="w-full rounded-xl border border-border bg-background p-3.5 text-xs sm:text-sm font-mono leading-relaxed outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
                />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{pastedText.split(/\s+/).filter(Boolean).length} words</span>
                  <Button
                    size="sm"
                    disabled={!pastedText.trim()}
                    onClick={runAnalysis}
                  >
                    <Sparkles className="size-4 mr-1.5" />
                    Analyze Pasted Text
                  </Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>

          {fileName && activeTab === "upload" && (
            <Card className="flex-row items-center justify-between gap-4 p-4">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <FileText className="size-5" />
                </span>
                <div className="flex min-w-0 flex-col">
                  <p className="truncate text-sm font-medium text-foreground">
                    {fileName}
                  </p>
                  <p className="text-xs text-muted-foreground">Ready to analyze</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Remove file"
                  onClick={() => {
                    setFileName(null)
                    setSelectedFile(null)
                    setSelectedSampleId(null)
                  }}
                >
                  <X className="size-4" />
                </Button>
                <Button onClick={runAnalysis}>
                  <Sparkles className="size-4 mr-1.5" />
                  Analyze Document
                </Button>
              </div>
            </Card>
          )}

          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium text-muted-foreground">
              Or try one of these test contracts (1-Click Instant Demo)
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              {sampleDocs.map((doc) => (
                <button
                  key={doc.id}
                  type="button"
                  onClick={() => pickSample(doc)}
                  className={cn(
                    "flex flex-col gap-2 rounded-xl border border-border bg-card p-4 text-left transition-colors hover:border-primary/40 hover:bg-muted/40 cursor-pointer",
                    fileName === doc.name && "border-primary ring-2 ring-primary/20",
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span className="flex size-8 items-center justify-center rounded-lg bg-accent text-primary">
                      <FileText className="size-4" />
                    </span>
                    <span className="text-xs font-semibold text-foreground">{doc.type}</span>
                  </div>
                  <span className="line-clamp-1 text-xs font-medium text-foreground">
                    {doc.name}
                  </span>
                  <span className="line-clamp-2 text-[11px] text-muted-foreground leading-relaxed">
                    {doc.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Lock className="size-3.5 text-primary" />
            Your document is processed securely with zero server-side retention.
          </div>
        </div>
      ) : (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ScanText className="size-5 text-primary" />
              Analyzing {fileName ?? "your document"}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <Progress value={progress} />
            <ul className="flex flex-col gap-3">
              {analysisSteps.map((step, i) => {
                const done = i < activeStep
                const active = i === activeStep
                return (
                  <li key={step} className="flex items-center gap-3">
                    {done ? (
                      <CheckCircle2 className="size-5 text-review-low" />
                    ) : active ? (
                      <Loader2 className="size-5 animate-spin text-primary" />
                    ) : (
                      <span className="size-5 rounded-full border-2 border-border" />
                    )}
                    <span
                      className={cn(
                        "text-sm",
                        done || active
                          ? "font-medium text-foreground"
                          : "text-muted-foreground",
                      )}
                    >
                      {step}
                    </span>
                  </li>
                )
              })}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

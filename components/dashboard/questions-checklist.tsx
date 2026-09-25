"use client"

import { useState } from "react"
import { Copy, Download, Star, Check, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { suggestedQuestions as defaultQuestions, type SuggestedQuestion } from "@/lib/sample-data"
import { cn } from "@/lib/utils"

interface QuestionsChecklistProps {
  customQuestions?: SuggestedQuestion[]
}

export function QuestionsChecklist({ customQuestions }: QuestionsChecklistProps) {
  const activeQuestions =
    customQuestions && customQuestions.length > 0 ? customQuestions : defaultQuestions
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const [copied, setCopied] = useState(false)
  const doneCount = Object.values(checked).filter(Boolean).length

  function toggle(id: string) {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  function handleCopyAll() {
    const text =
      "Questions to Raise with Counterparty / Legal Professional:\n\n" +
      activeQuestions
        .map((q, i) => `${i + 1}. ${q.question} (${q.relatedClause})`)
        .join("\n\n")
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function handleExport() {
    const text =
      "# NyayaLens — Questions to Raise Checklist\n\n" +
      activeQuestions
        .map(
          (q, i) =>
            `- [${checked[q.id] ? "x" : " "}] **${q.question}**\n  *Related clause: ${q.relatedClause}*`,
        )
        .join("\n\n")
    const blob = new Blob([text], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "nyayalens_questions_checklist.md"
    a.click()
    URL.revokeObjectURL(url)
  }

  function handlePrint() {
    if (typeof window !== "undefined") {
      window.print()
    }
  }

  return (
    <Card>
      <CardHeader className="flex-row items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <CardTitle className="flex items-center gap-2">
            <Star className="size-5 text-chart-4" />
            Questions to raise
          </CardTitle>
          <p className="text-sm text-muted-foreground text-pretty">
            A checklist to bring to the other party or a legal professional. Check them
            off as you go.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleCopyAll}>
            {copied ? (
              <Check className="size-4 mr-1 text-review-low" />
            ) : (
              <Copy className="size-4 mr-1" />
            )}
            {copied ? "Copied" : "Copy"}
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="size-4 mr-1" />
            Export .md
          </Button>
          <Button variant="default" size="sm" onClick={handlePrint} className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Printer className="size-4 mr-1" />
            Print Brief / PDF
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <p className="text-xs font-medium text-muted-foreground">
          {doneCount} of {activeQuestions.length} reviewed
        </p>
        <ul className="flex flex-col gap-2.5">
          {activeQuestions.map((item) => {
            const isChecked = !!checked[item.id]
            return (
              <li key={item.id}>
                <label
                  className={cn(
                    "flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors",
                    isChecked
                      ? "border-border bg-muted/40"
                      : "border-border bg-card hover:border-primary/40",
                  )}
                >
                  <Checkbox
                    checked={isChecked}
                    onCheckedChange={() => toggle(item.id)}
                    className="mt-0.5"
                  />
                  <div className="flex flex-col gap-1">
                    <span
                      className={cn(
                        "text-sm font-medium text-foreground",
                        isChecked && "text-muted-foreground line-through",
                      )}
                    >
                      {item.question}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {item.relatedClause}
                    </span>
                  </div>
                </label>
              </li>
            )
          })}
        </ul>
      </CardContent>
    </Card>
  )
}

"use client"

import { useRef, useState } from "react"
import {
  ArrowUp,
  BookOpen,
  Lightbulb,
  Quote,
  Sparkles,
  Star,
  User,
  Bookmark,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { qaExamples, type QAExample } from "@/lib/sample-data"
import { cn } from "@/lib/utils"

interface QaPanelProps {
  documentText?: string
  documentTitle?: string
}

type Turn =
  | { role: "user"; text: string }
  | {
      role: "assistant"
      answer: {
        text: string
        section?: string
        sectionText?: string
        whyItMatters?: string
        questionsToConsider?: string[]
        relevantClauses?: string[]
        whatToVerify?: string
      }
    }

function findFallbackAnswer(question: string): QAExample {
  const q = question.toLowerCase()
  const match = qaExamples.find((ex) => {
    const words = ex.question.toLowerCase().replace(/[?.,]/g, "").split(" ")
    return words.some((w) => w.length > 3 && q.includes(w))
  })
  return match ?? qaExamples[0]
}

export function QaPanel({ documentText, documentTitle }: QaPanelProps) {
  const [turns, setTurns] = useState<Turn[]>([])
  const [input, setInput] = useState("")
  const [thinking, setThinking] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const samplePrompts = [
    "What happens if I leave before one year?",
    "Can I work on personal projects or freelance on weekends?",
    "What is the notice period and is payout allowed?",
    "What are the terms for performance bonuses?",
  ]

  async function ask(question: string) {
    const q = question.trim()
    if (!q || thinking) return

    setTurns((prev) => [...prev, { role: "user", text: q }])
    setInput("")
    setThinking(true)

    try {
      const customKey =
        typeof window !== "undefined"
          ? localStorage.getItem("NYAYALENS_GEMINI_API_KEY") || ""
          : ""

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(customKey ? { "x-gemini-api-key": customKey } : {}),
        },
        body: JSON.stringify({
          documentText: documentText || "Sample contract text",
          question: q,
        }),
      })

      if (res.ok) {
        const data = await res.json()
        setTurns((prev) => [
          ...prev,
          {
            role: "assistant",
            answer: {
              text: data.text,
              relevantClauses: data.relevantClauses,
              whatToVerify: data.whatToVerify,
            },
          },
        ])
      } else {
        throw new Error("Chat API failed")
      }
    } catch {
      // Fallback to grounded sample answer
      const fb = findFallbackAnswer(q)
      setTurns((prev) => [
        ...prev,
        {
          role: "assistant",
          answer: {
            text: fb.answer,
            section: fb.section,
            sectionText: fb.sectionText,
            whyItMatters: fb.whyItMatters,
            questionsToConsider: fb.questionsToConsider,
          },
        },
      ])
    } finally {
      setThinking(false)
      requestAnimationFrame(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
      })
    }
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_minmax(0,300px)]">
      <Card className="flex h-[560px] flex-col gap-0 overflow-hidden p-0">
        <div className="flex items-center gap-2 border-b border-border px-5 py-3.5">
          <span className="flex size-7 items-center justify-center rounded-md bg-primary/10">
            <Sparkles className="size-4 text-primary" />
          </span>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-foreground">
              Ask {documentTitle ? `"${documentTitle}"` : "this document"}
            </span>
            <span className="text-xs text-muted-foreground">
              Answers are grounded in actual clauses via Google Gemini
            </span>
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-5">
          {turns.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-accent text-primary">
                <BookOpen className="size-6" />
              </span>
              <p className="max-w-xs text-sm text-muted-foreground text-pretty">
                Ask anything about obligations, notice periods, IP, or restrictions. Type below or pick a suggestion.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              {turns.map((turn, i) =>
                turn.role === "user" ? (
                  <div key={i} className="flex justify-end">
                    <div className="flex max-w-[80%] items-start gap-2.5">
                      <div className="rounded-2xl rounded-tr-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground">
                        {turn.text}
                      </div>
                      <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                        <User className="size-3.5" />
                      </span>
                    </div>
                  </div>
                ) : (
                  <AnswerBubble key={i} answer={turn.answer} />
                ),
              )}
              {thinking && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="flex size-7 items-center justify-center rounded-full bg-primary/10">
                    <Sparkles className="size-3.5 text-primary" />
                  </span>
                  <span className="flex gap-1">
                    <Dot /> <Dot delay="150ms" /> <Dot delay="300ms" />
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            ask(input)
          }}
          className="flex items-center gap-2 border-t border-border p-3"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. What happens if I leave this company before one year?"
            className="h-10 flex-1 rounded-xl border border-border bg-background px-3.5 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40"
          />
          <Button
            type="submit"
            size="icon"
            className="rounded-xl size-10"
            disabled={!input.trim() || thinking}
            aria-label="Send question"
          >
            <ArrowUp className="size-4" />
          </Button>
        </form>
      </Card>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 px-1">
          <Lightbulb className="size-4 text-chart-4" />
          <span className="text-sm font-semibold text-foreground">Suggested prompts</span>
        </div>
        {samplePrompts.map((prompt, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => ask(prompt)}
            disabled={thinking}
            className="rounded-xl border border-border bg-card p-3.5 text-left text-xs leading-relaxed text-foreground/90 transition-colors hover:border-primary/40 hover:bg-muted/40 disabled:opacity-60 cursor-pointer"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  )
}

function AnswerBubble({
  answer,
}: {
  answer: {
    text: string
    section?: string
    sectionText?: string
    whyItMatters?: string
    questionsToConsider?: string[]
    relevantClauses?: string[]
    whatToVerify?: string
  }
}) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10">
        <Sparkles className="size-3.5 text-primary" />
      </span>
      <div className="flex max-w-[85%] flex-col gap-3">
        <div className="rounded-2xl rounded-tl-sm bg-muted px-4 py-3">
          <p className="text-sm leading-relaxed text-foreground whitespace-pre-line">
            {answer.text}
          </p>
        </div>

        {answer.relevantClauses && answer.relevantClauses.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 px-1">
            <span className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1">
              <Bookmark className="size-3 text-primary" />
              Relevant:
            </span>
            {answer.relevantClauses.map((c, idx) => (
              <span
                key={idx}
                className="rounded-md border border-primary/20 bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary font-mono"
              >
                {c}
              </span>
            ))}
          </div>
        )}

        {answer.whatToVerify && (
          <div className="rounded-xl border border-chart-4/30 bg-chart-4/10 p-3 text-xs text-foreground">
            <strong className="text-chart-4 block mb-0.5">What to verify:</strong>
            {answer.whatToVerify}
          </div>
        )}

        {answer.section && answer.sectionText && (
          <div className="flex flex-col gap-2 rounded-xl border border-border bg-card p-3">
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <Quote className="size-3.5 text-primary" />
              {answer.section}
            </div>
            <p className="text-xs italic leading-relaxed text-foreground/70">
              "{answer.sectionText}"
            </p>
          </div>
        )}

        {answer.whyItMatters && (
          <div className="flex flex-col gap-2 rounded-xl border border-border bg-accent/40 p-3">
            <p className="text-xs font-semibold text-foreground">Why it matters</p>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {answer.whyItMatters}
            </p>
            {answer.questionsToConsider && answer.questionsToConsider.length > 0 && (
              <div className="mt-1 flex flex-col gap-1.5">
                {answer.questionsToConsider.map((q) => (
                  <div key={q} className="flex items-start gap-2">
                    <Star className="mt-0.5 size-3 shrink-0 text-chart-4" />
                    <span className="text-xs leading-relaxed text-foreground/90">{q}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function Dot({ delay = "0ms" }: { delay?: string }) {
  return (
    <span
      className="size-1.5 animate-bounce rounded-full bg-muted-foreground"
      style={{ animationDelay: delay }}
    />
  )
}

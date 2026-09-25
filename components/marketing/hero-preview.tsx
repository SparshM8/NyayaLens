import {
  FileText,
  MessageSquareText,
  ShieldAlert,
  Sparkles,
  Star,
} from "lucide-react"
import { Card } from "@/components/ui/card"

export function HeroPreview() {
  return (
    <div className="relative">
      <div
        className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-tr from-primary/10 via-chart-2/10 to-chart-3/10 blur-2xl"
        aria-hidden="true"
      />
      <Card className="overflow-hidden border-border/80 p-0 shadow-xl shadow-primary/5">
        {/* Window bar */}
        <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-3">
          <span className="size-2.5 rounded-full bg-review-high/40" />
          <span className="size-2.5 rounded-full bg-review-medium/50" />
          <span className="size-2.5 rounded-full bg-review-low/40" />
          <div className="ml-3 flex items-center gap-2 rounded-md bg-background px-2.5 py-1 text-xs text-muted-foreground">
            <FileText className="size-3.5 text-primary" />
            Employment Agreement.pdf
          </div>
        </div>

        <div className="grid gap-0 sm:grid-cols-[1.1fr_1fr]">
          {/* Document side */}
          <div className="border-b border-border p-5 sm:border-b-0 sm:border-r">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Extracted clause
            </p>
            <p className="mt-2 text-sm font-semibold text-foreground">
              Section 9.2 — Non-Compete
            </p>
            <div className="mt-3 flex flex-col gap-2">
              {["h-2 w-full", "h-2 w-11/12", "h-2 w-10/12", "h-2 w-9/12"].map(
                (w, i) => (
                  <span
                    key={i}
                    className={`rounded-full bg-muted ${w} ${
                      i === 1 ? "bg-review-high/30" : ""
                    }`}
                  />
                ),
              )}
            </div>
            <div className="mt-4 flex items-center gap-2 rounded-lg bg-review-high-soft px-3 py-2">
              <ShieldAlert className="size-4 text-review-high" />
              <span className="text-xs font-medium text-review-high">
                Potential Concern
              </span>
            </div>
          </div>

          {/* AI side */}
          <div className="flex flex-col gap-4 p-5">
            <div className="flex items-center gap-2">
              <span className="flex size-6 items-center justify-center rounded-md bg-primary/10">
                <Sparkles className="size-3.5 text-primary" />
              </span>
              <span className="text-xs font-semibold text-foreground">
                AI Explanation
              </span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              You could not work for a competing business anywhere in India for 12
              months after leaving — broader than usual.
            </p>
            <div className="rounded-xl border border-border bg-card p-3">
              <div className="flex items-center gap-2">
                <Star className="size-3.5 text-chart-4" />
                <span className="text-xs font-semibold text-foreground">
                  Questions to consider
                </span>
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                "Can the non-compete scope be narrowed to specific competitors?"
              </p>
            </div>
            <div className="mt-auto flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
              <MessageSquareText className="size-3.5 text-primary" />
              Ask this document a question…
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

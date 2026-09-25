import { AlertTriangle, Info, ShieldAlert } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ReviewLevel } from "@/lib/sample-data"

const config: Record<
  ReviewLevel,
  { label: string; className: string; icon: typeof Info }
> = {
  important: {
    label: "Important",
    className: "bg-important-soft text-important",
    icon: Info,
  },
  "needs-review": {
    label: "Needs Review",
    className: "bg-review-medium-soft text-review-medium-foreground",
    icon: AlertTriangle,
  },
  "potential-concern": {
    label: "Potential Concern",
    className: "bg-review-high-soft text-review-high",
    icon: ShieldAlert,
  },
}

export function ReviewBadge({
  level,
  className,
}: {
  level: ReviewLevel
  className?: string
}) {
  const { label, className: tone, icon: Icon } = config[level]
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        tone,
        className,
      )}
    >
      <Icon className="size-3.5" />
      {label}
    </span>
  )
}

const levelDot: Record<"Low" | "Moderate" | "Elevated", string> = {
  Low: "bg-review-low",
  Moderate: "bg-review-medium",
  Elevated: "bg-review-high",
}

export function ReviewLevelPill({
  level,
  className,
}: {
  level: "Low" | "Moderate" | "Elevated"
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 text-xs font-medium text-foreground",
        className,
      )}
    >
      <span className={cn("size-2 rounded-full", levelDot[level])} />
      {level} review level
    </span>
  )
}

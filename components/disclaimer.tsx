import { Info } from "lucide-react"
import { cn } from "@/lib/utils"

export function Disclaimer({
  className,
  variant = "inline",
}: {
  className?: string
  variant?: "inline" | "banner"
}) {
  return (
    <div
      className={cn(
        "flex items-start gap-2.5 rounded-xl border border-border bg-muted/50 px-4 py-3 text-sm text-muted-foreground",
        variant === "banner" && "rounded-none border-x-0 border-t-0",
        className,
      )}
    >
      <Info className="mt-0.5 size-4 shrink-0 text-primary" />
      <p className="leading-relaxed text-pretty">
        NyayaLens helps you understand documents and is for informational purposes only. It is
        not a lawyer and does not provide legal advice. Always consult a qualified legal
        professional before making decisions.
      </p>
    </div>
  )
}

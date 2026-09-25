import { cn } from "@/lib/utils"

export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative inline-flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-chart-2 to-chart-3 text-primary-foreground shadow-sm",
        className,
      )}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="size-5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 3.5h7.5L18 8v6.2" opacity="0.9" />
        <path d="M13 3.5V8h4.5" opacity="0.9" />
        <path d="M6 3.5v11" opacity="0.9" />
        <circle cx="12.5" cy="14.5" r="3.4" />
        <path d="m15.2 17.2 2.6 2.6" />
      </svg>
    </span>
  )
}

export function Logo({
  className,
  showWordmark = true,
}: {
  className?: string
  showWordmark?: boolean
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      {showWordmark && (
        <span className="font-display text-lg font-semibold tracking-tight text-foreground">
          NyayaLens
        </span>
      )}
    </span>
  )
}

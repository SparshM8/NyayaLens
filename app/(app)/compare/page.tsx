import { ArrowRight, FileText, GitCompare, Minus, Pencil, Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { comparisonRows, type ComparisonRow } from "@/lib/sample-data"
import { cn } from "@/lib/utils"

const changeConfig: Record<
  ComparisonRow["change"],
  { className: string; icon: typeof Plus }
> = {
  Added: { className: "bg-review-low-soft text-review-low", icon: Plus },
  Removed: { className: "bg-review-high-soft text-review-high", icon: Minus },
  Modified: {
    className: "bg-review-medium-soft text-review-medium-foreground",
    icon: Pencil,
  },
  Unchanged: { className: "bg-muted text-muted-foreground", icon: Minus },
}

const summary = [
  { label: "Modified", count: 4, tone: "text-review-medium-foreground" },
  { label: "Added", count: 1, tone: "text-review-low" },
  { label: "Removed", count: 1, tone: "text-review-high" },
  { label: "Unchanged", count: 2, tone: "text-muted-foreground" },
]

function DocColumn({
  label,
  name,
  meta,
}: {
  label: string
  name: string
  meta: string
}) {
  return (
    <div className="flex flex-1 items-center gap-3 rounded-xl border border-border bg-card p-4">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <FileText className="size-5" />
      </span>
      <div className="flex min-w-0 flex-col">
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </span>
        <span className="truncate text-sm font-semibold text-foreground">{name}</span>
        <span className="text-xs text-muted-foreground">{meta}</span>
      </div>
    </div>
  )
}

export default function ComparePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-1">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground">
          Compare documents
        </h1>
        <p className="text-muted-foreground text-pretty">
          See exactly what changed between two versions — added, removed, and modified
          terms, side by side.
        </p>
      </div>

      <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
        <DocColumn
          label="Version A"
          name="Employment Agreement — v1.pdf"
          meta="Uploaded Mar 10, 2026"
        />
        <span className="mx-auto flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-card text-muted-foreground">
          <ArrowRight className="size-4" />
        </span>
        <DocColumn
          label="Version B"
          name="Employment Agreement — v2.pdf"
          meta="Uploaded Mar 18, 2026"
        />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {summary.map((s) => (
          <Card key={s.label} className="gap-1 p-4">
            <span className={cn("font-display text-2xl font-semibold", s.tone)}>
              {s.count}
            </span>
            <span className="text-xs text-muted-foreground">{s.label}</span>
          </Card>
        ))}
      </div>

      <Card className="mt-6 gap-0 overflow-hidden p-0">
        <CardHeader className="border-b border-border p-5">
          <CardTitle className="flex items-center gap-2 text-base">
            <GitCompare className="size-5 text-primary" />
            Clause-by-clause comparison
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[26%] pl-5">Clause</TableHead>
                <TableHead>Version A</TableHead>
                <TableHead>Version B</TableHead>
                <TableHead className="pr-5 text-right">Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comparisonRows.map((row) => {
                const { className, icon: Icon } = changeConfig[row.change]
                const changed = row.change !== "Unchanged"
                return (
                  <TableRow key={row.clause}>
                    <TableCell className="pl-5 font-medium text-foreground">
                      {row.clause}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{row.docA}</TableCell>
                    <TableCell
                      className={cn(
                        changed ? "font-medium text-foreground" : "text-muted-foreground",
                      )}
                    >
                      {row.docB}
                    </TableCell>
                    <TableCell className="pr-5 text-right">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
                          className,
                        )}
                      >
                        <Icon className="size-3" />
                        {row.change}
                      </span>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

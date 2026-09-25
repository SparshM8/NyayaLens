import Link from "next/link"
import {
  ArrowRight,
  FileText,
  Loader2,
  MoreVertical,
  Plus,
  Search,
} from "lucide-react"
import { ReviewLevelPill } from "@/components/review-badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { documentLibrary } from "@/lib/sample-data"
import { cn } from "@/lib/utils"

export default function DocumentsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground">
            Your documents
          </h1>
          <p className="text-muted-foreground">
            Every document you have analyzed, in one place.
          </p>
        </div>
        <Button size="lg" nativeButton={false} render={
          <Link href="/analyze">
            <Plus data-icon="inline-start" />
            Analyze new document
          </Link>
        } />
      </div>

      <div className="mt-6 flex items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-2.5">
        <Search className="size-4 text-muted-foreground" />
        <input
          placeholder="Search documents…"
          className="h-6 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {documentLibrary.map((doc) => {
          const analyzing = doc.status === "Analyzing"
          return (
            <Card key={doc.id} className="group gap-0 overflow-hidden p-0">
              <CardContent className="flex flex-col gap-4 p-5">
                <div className="flex items-start justify-between gap-3">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <FileText className="size-5" />
                  </span>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <Button variant="ghost" size="icon-sm" aria-label="Document actions">
                          <MoreVertical />
                        </Button>
                      }
                    />
                    <DropdownMenuContent align="end" className="w-44">
                      <DropdownMenuGroup>
                        <DropdownMenuItem>Open analysis</DropdownMenuItem>
                        <DropdownMenuItem>Rename</DropdownMenuItem>
                        <DropdownMenuItem>Export</DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {doc.type}
                  </span>
                  <h3 className="line-clamp-2 text-sm font-semibold text-foreground">
                    {doc.name}
                  </h3>
                  <span className="text-xs text-muted-foreground">
                    {doc.sizeLabel} · {doc.uploadedAt}
                  </span>
                </div>

                {analyzing ? (
                  <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2 text-xs font-medium text-muted-foreground">
                    <Loader2 className="size-3.5 animate-spin text-primary" />
                    Analyzing…
                  </div>
                ) : (
                  <div className="flex items-center justify-between gap-2">
                    <ReviewLevelPill level={doc.reviewLevel} />
                    <span className="text-xs text-muted-foreground">
                      {doc.clauseCount} clauses
                    </span>
                  </div>
                )}
              </CardContent>

              <Link
                href={analyzing ? "#" : "/dashboard"}
                aria-disabled={analyzing}
                className={cn(
                  "flex items-center justify-between border-t border-border px-5 py-3 text-sm font-medium transition-colors",
                  analyzing
                    ? "pointer-events-none text-muted-foreground"
                    : "text-primary hover:bg-accent/50",
                )}
              >
                {analyzing ? "In progress" : "View analysis"}
                {!analyzing && <ArrowRight className="size-4" />}
              </Link>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

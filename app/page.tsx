import Link from "next/link"
import {
  ArrowRight,
  FileSearch,
  Gauge,
  GitCompare,
  ListChecks,
  Lock,
  MessageSquareText,
  ScrollText,
  Sparkles,
  Trash2,
  Upload,
} from "lucide-react"
import { SiteHeader } from "@/components/marketing/site-header"
import { SiteFooter } from "@/components/marketing/site-footer"
import { HeroPreview } from "@/components/marketing/hero-preview"
import { Disclaimer } from "@/components/disclaimer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const steps = [
  {
    icon: Upload,
    title: "Upload your document",
    body: "Drop in a PDF, Word file, or plain text. Employment contracts, NDAs, leases, and more.",
  },
  {
    icon: Sparkles,
    title: "AI reads and explains it",
    body: "Every clause is translated into plain language, so you understand what you are actually agreeing to.",
  },
  {
    icon: ListChecks,
    title: "Know what to ask",
    body: "See what matters, what to review, and the exact questions to raise before you sign.",
  },
]

const capabilities = [
  {
    icon: ScrollText,
    title: "Plain-language explanations",
    body: "Dense legal language rewritten clearly, clause by clause, with the original text always one click away.",
  },
  {
    icon: FileSearch,
    title: "Clause-by-clause analysis",
    body: "Each section is surfaced with why it matters, so nothing important slips past you.",
  },
  {
    icon: Gauge,
    title: "Review-level highlights",
    body: "Neutral, non-alarming flags — Important, Needs Review, Potential Concern — never verdicts.",
  },
  {
    icon: MessageSquareText,
    title: "Ask your document",
    body: "Type a question in natural language and get an answer grounded in the actual text.",
  },
  {
    icon: ListChecks,
    title: "Suggested questions",
    body: "A ready-made checklist of questions to bring to the other party or your lawyer.",
  },
  {
    icon: GitCompare,
    title: "Compare versions",
    body: "See exactly what changed between two drafts — added, removed, and modified terms.",
  },
]

const privacyPoints = [
  {
    icon: Lock,
    title: "Private by default",
    body: "Your documents are processed securely and never used to train models.",
  },
  {
    icon: Trash2,
    title: "You stay in control",
    body: "Delete any document and its analysis at any time — it is gone for good.",
  },
  {
    icon: ScrollText,
    title: "Clear about limits",
    body: "NyayaLens explains, it does not advise. We are always upfront that this is not legal counsel.",
  },
]

export default function LandingPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-gradient-to-b from-accent/60 to-transparent"
            aria-hidden="true"
          />
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:px-8 lg:py-24">
            <div className="flex flex-col gap-6">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
                <Sparkles className="size-3.5 text-primary" />
                AI-assisted document understanding
              </span>
              <h1 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight text-foreground text-balance sm:text-5xl lg:text-6xl">
                Understand legal documents.{" "}
                <span className="bg-gradient-to-r from-primary via-chart-2 to-chart-3 bg-clip-text text-transparent">
                  Know what matters.
                </span>
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
                NyayaLens reads contracts, NDAs, and agreements the way a careful
                friend would — explaining each clause in plain language and showing you
                exactly what to ask before you sign.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button size="lg" nativeButton={false} render={
                  <Link href="/analyze">
                    Analyze a Document
                    <ArrowRight data-icon="inline-end" />
                  </Link>
                } />
                <Button variant="outline" size="lg" nativeButton={false} render={
                  <Link href="/dashboard">See a sample analysis</Link>
                } />
              </div>
              <p className="text-sm text-muted-foreground">
                No account needed to try. Informational only — not legal advice.
              </p>
            </div>
            <HeroPreview />
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="border-t border-border bg-muted/20">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground text-balance sm:text-4xl">
                From confusing to clear in three steps
              </h2>
              <p className="mt-4 text-lg text-muted-foreground text-pretty">
                No legal background required. NyayaLens does the heavy reading and hands
                you the understanding.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {steps.map((step, i) => (
                <Card key={step.title} className="gap-4 p-6">
                  <div className="flex items-center justify-between">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10">
                      <step.icon className="size-5 text-primary" />
                    </span>
                    <span className="font-display text-sm font-medium text-muted-foreground">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section id="capabilities">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground text-balance sm:text-4xl">
                Everything you need to read with confidence
              </h2>
              <p className="mt-4 text-lg text-muted-foreground text-pretty">
                Built to inform and empower — never to alarm or pretend to be your
                lawyer.
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {capabilities.map((cap) => (
                <Card
                  key={cap.title}
                  className="group gap-3 p-6 transition-colors hover:border-primary/40"
                >
                  <span className="flex size-11 items-center justify-center rounded-xl bg-accent text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <cap.icon className="size-5" />
                  </span>
                  <h3 className="mt-1 text-base font-semibold text-foreground">
                    {cap.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {cap.body}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Privacy */}
        <section id="privacy" className="border-t border-border bg-muted/20">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
              <div className="flex flex-col gap-4">
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
                  <Lock className="size-3.5 text-primary" />
                  Privacy & trust
                </span>
                <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground text-balance sm:text-4xl">
                  Your documents stay yours
                </h2>
                <p className="text-lg text-muted-foreground text-pretty">
                  Legal documents are personal. We treat them that way — with clear
                  boundaries on what NyayaLens does and does not do.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                {privacyPoints.map((point) => (
                  <Card key={point.title} className="flex-row items-start gap-4 p-5">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <point.icon className="size-5 text-primary" />
                    </span>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-base font-semibold text-foreground">
                        {point.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {point.body}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
            <Card className="items-center gap-6 overflow-hidden bg-gradient-to-br from-primary to-chart-2 px-6 py-14 text-center text-primary-foreground">
              <h2 className="max-w-2xl font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                Have a document you need to understand?
              </h2>
              <p className="max-w-xl text-lg text-primary-foreground/80 text-pretty">
                Upload it now and get a clear, clause-by-clause breakdown in moments.
              </p>
              <Button
                size="lg"
                variant="secondary"
                nativeButton={false}
                render={
                  <Link href="/analyze">
                    Analyze a Document
                    <ArrowRight data-icon="inline-end" />
                  </Link>
                }
              />
            </Card>
            <Disclaimer className="mt-8" />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

import Link from "next/link"
import { Logo } from "@/components/logo"

const columns = [
  {
    title: "Product",
    links: ["How it works", "Capabilities", "Document Q&A", "Compare documents"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Contact", "Blog"],
  },
  {
    title: "Legal",
    links: ["Privacy policy", "Terms of service", "Data security", "Disclaimer"],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground text-pretty">
              Understand legal documents. Know what matters. AI-assisted document
              understanding built for clarity, not confusion.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <h4 className="text-sm font-semibold text-foreground">{col.title}</h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 NyayaLens. For informational purposes only — not legal advice.</p>
          <p>Made for clarity.</p>
        </div>
      </div>
    </footer>
  )
}

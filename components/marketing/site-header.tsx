import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"

const navItems = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#capabilities", label: "Capabilities" },
  { href: "#privacy", label: "Privacy" },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="NyayaLens home">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="lg" nativeButton={false} className="hidden sm:inline-flex" render={<Link href="/dashboard">Sign in</Link>} />
          <Button size="lg" nativeButton={false} render={
            <Link href="/analyze">
              Analyze a Document
              <ArrowRight data-icon="inline-end" />
            </Link>
          } />
        </div>
      </div>
    </header>
  )
}

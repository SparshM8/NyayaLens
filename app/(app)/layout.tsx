import type { ReactNode } from "react"
import { AppNav } from "@/components/app-nav"
import { Disclaimer } from "@/components/disclaimer"

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-muted/20">
      <AppNav />
      <main className="flex-1">{children}</main>
      <footer className="border-t border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <Disclaimer />
        </div>
      </footer>
    </div>
  )
}

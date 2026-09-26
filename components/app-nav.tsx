"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  ChevronDown,
  FileText,
  GitCompare,
  Key,
  Layers,
  Menu,
  Settings,
  Sparkles,
  Upload,
  User,
  X,
} from "lucide-react"
import { Logo } from "@/components/logo"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/documents", label: "Documents" },
  { href: "/compare", label: "Compare" },
  { href: "/architecture", label: "Architecture" },
  { href: "/settings", label: "Settings" },
]

export function AppNav() {
  const pathname = usePathname()
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [profile, setProfile] = useState({
    name: "Priya Sharma",
    email: "priya.s@example.com",
    initials: "PS",
  })

  const profileRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("NYAYALENS_USER_PROFILE")
      if (stored) {
        try {
          const parsed = JSON.parse(stored)
          if (parsed.name && parsed.email) {
            const initials = parsed.name
              .split(" ")
              .map((n: string) => n[0])
              .join("")
              .substring(0, 2)
              .toUpperCase()
            setProfile({
              name: parsed.name,
              email: parsed.email,
              initials: initials || "PS",
            })
          }
        } catch {
          // ignore
        }
      }
    }
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Close menus on route change
  useEffect(() => {
    setIsProfileOpen(false)
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link href="/" aria-label="NyayaLens home">
            <Logo />
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {links.map((link) => {
              const active =
                pathname === link.href || pathname.startsWith(`${link.href}/`)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-accent text-accent-foreground font-semibold"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/analyze">
            <Button size="sm" className="hidden sm:inline-flex text-xs">
              <Upload className="size-3.5 mr-1" />
              Analyze
            </Button>
          </Link>

          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              type="button"
              onClick={() => setIsProfileOpen((prev) => !prev)}
              aria-expanded={isProfileOpen}
              aria-label="User profile menu"
              className="flex items-center gap-2 rounded-full p-1 transition-colors hover:bg-muted cursor-pointer ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Avatar className="size-8">
                <AvatarFallback className="bg-primary text-xs font-semibold text-primary-foreground">
                  {profile.initials}
                </AvatarFallback>
              </Avatar>
              <ChevronDown
                className={cn(
                  "hidden size-4 text-muted-foreground transition-transform sm:block",
                  isProfileOpen && "rotate-180",
                )}
              />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 rounded-xl border border-border bg-popover p-2 text-popover-foreground shadow-xl animate-in fade-in-0 zoom-in-95 z-50">
                <div className="flex items-center gap-3 border-b border-border px-3 py-2.5">
                  <Avatar className="size-9">
                    <AvatarFallback className="bg-primary text-xs font-semibold text-primary-foreground">
                      {profile.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col min-w-0">
                    <span className="truncate text-sm font-semibold text-foreground">
                      {profile.name}
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      {profile.email}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-1 py-1.5 text-sm">
                  <Link
                    href="/settings"
                    className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-foreground hover:bg-muted transition-colors"
                  >
                    <Settings className="size-4 text-primary" />
                    <span>Settings & Profile</span>
                  </Link>

                  <Link
                    href="/settings"
                    className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-foreground hover:bg-muted transition-colors"
                  >
                    <Key className="size-4 text-primary" />
                    <span>Gemini API Key</span>
                  </Link>

                  <div className="my-1 border-t border-border" />

                  <Link
                    href="/analyze"
                    className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    <Upload className="size-4" />
                    <span>Upload Document</span>
                  </Link>

                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    <FileText className="size-4" />
                    <span>Active Dashboard</span>
                  </Link>

                  <Link
                    href="/compare"
                    className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    <GitCompare className="size-4" />
                    <span>Compare Contracts</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            className="flex size-9 items-center justify-center rounded-lg border border-border text-foreground hover:bg-muted md:hidden"
          >
            {isMobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="border-t border-border bg-background px-4 py-4 md:hidden animate-in slide-in-from-top-2">
          <nav className="flex flex-col gap-1.5">
            {links.map((link) => {
              const active = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    active
                      ? "bg-accent text-accent-foreground font-semibold"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
            <div className="my-2 border-t border-border" />
            <Link href="/analyze">
              <Button size="sm" className="w-full text-xs">
                <Upload className="size-3.5 mr-1" />
                Analyze New Document
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}


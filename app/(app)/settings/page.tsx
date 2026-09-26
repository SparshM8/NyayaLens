"use client"

import { useEffect, useState } from "react"
import {
  Bell,
  CheckCircle,
  ExternalLink,
  FileText,
  Globe,
  Key,
  Lock,
  ShieldCheck,
  Sparkles,
  Trash2,
  User,
} from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

const preferences = [
  {
    id: "plain-language",
    icon: Sparkles,
    title: "Plain-language mode",
    body: "Always rewrite clauses in the simplest possible language.",
    defaultOn: true,
  },
  {
    id: "highlight-review",
    icon: FileText,
    title: "Highlight items to review",
    body: "Surface clauses that typically deserve a closer look.",
    defaultOn: true,
  },
  {
    id: "suggested-questions",
    icon: Bell,
    title: "Suggested questions",
    body: "Generate a checklist of questions for every document.",
    defaultOn: true,
  },
]

const privacy = [
  {
    id: "no-training",
    title: "Never use my documents for training",
    body: "Your files are only used to produce your analysis.",
    defaultOn: true,
    locked: true,
  },
  {
    id: "auto-delete",
    title: "Auto-delete after 30 days",
    body: "Automatically remove documents and their analysis after a month.",
    defaultOn: false,
    locked: false,
  },
]

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState("")
  const [savedSuccess, setSavedSuccess] = useState(false)
  const [isTesting, setIsTesting] = useState(false)
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null)
  const [serverStatus, setServerStatus] = useState<{ hasServerKey: boolean; model: string; message: string } | null>(null)

  // Profile states
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [profileName, setProfileName] = useState("Priya Sharma")
  const [profileEmail, setProfileEmail] = useState("priya.s@example.com")
  const [profileRole, setProfileRole] = useState("Legal Operations / Reviewer")
  const [profileSaved, setProfileSaved] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("NYAYALENS_GEMINI_API_KEY") || ""
      setApiKey(stored)

      const storedProfile = localStorage.getItem("NYAYALENS_USER_PROFILE")
      if (storedProfile) {
        try {
          const parsed = JSON.parse(storedProfile)
          if (parsed.name) setProfileName(parsed.name)
          if (parsed.email) setProfileEmail(parsed.email)
          if (parsed.role) setProfileRole(parsed.role)
        } catch {
          // ignore
        }
      }
    }

    fetch("/api/status")
      .then((res) => res.json())
      .then((data) => setServerStatus(data))
      .catch((err) => console.warn("Status check failed:", err))
  }, [])

  function handleSaveProfile() {
    if (typeof window !== "undefined") {
      const profileData = {
        name: profileName.trim() || "Priya Sharma",
        email: profileEmail.trim() || "priya.s@example.com",
        role: profileRole.trim() || "Legal Operations / Reviewer",
      }
      localStorage.setItem("NYAYALENS_USER_PROFILE", JSON.stringify(profileData))
      window.dispatchEvent(new Event("storage"))
    }
    setProfileSaved(true)
    setIsEditingProfile(false)
    setTimeout(() => setProfileSaved(false), 2500)
  }

  function handleSaveKey() {
    if (typeof window !== "undefined") {
      if (apiKey.trim()) {
        localStorage.setItem("NYAYALENS_GEMINI_API_KEY", apiKey.trim())
      } else {
        localStorage.removeItem("NYAYALENS_GEMINI_API_KEY")
      }
    }
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 2000)
  }

  async function handleTestKey() {
    setIsTesting(true)
    setTestResult(null)

    if (!apiKey.trim() && serverStatus?.hasServerKey) {
      // Test server-side key
      try {
        const res = await fetch("/api/status")
        if (res.ok) {
          setTestResult({
            success: true,
            message: `Server-side Gemini connection verified (${serverStatus.model})!`,
          })
        }
      } catch {
        setTestResult({
          success: false,
          message: "Could not reach server endpoint.",
        })
      } finally {
        setIsTesting(false)
      }
      return
    }

    if (!apiKey.trim()) {
      setTestResult({ success: false, message: "Please enter a Gemini API key first." })
      setIsTesting(false)
      return
    }

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey.trim()}`,
      )
      if (res.ok) {
        setTestResult({
          success: true,
          message: "API key is valid and connected to Google Gemini!",
        })
      } else {
        setTestResult({
          success: false,
          message: "Invalid Gemini API key. Please check your Google AI Studio dashboard.",
        })
      }
    } catch {
      setTestResult({
        success: false,
        message: "Network error while connecting to Google Gemini.",
      })
    } finally {
      setIsTesting(false)
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-1">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground">
          Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your account, Gemini AI configuration, analysis preferences, and privacy.
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-6">
        {/* Gemini AI Key Card */}
        <Card className="border-primary/40 bg-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-base">
              <span className="flex items-center gap-2">
                <Key className="size-5 text-primary" />
                Google Gemini API Key
              </span>
              <span className="text-xs font-normal text-muted-foreground">
                {apiKey ? (
                  <span className="text-review-low font-medium flex items-center gap-1">
                    <CheckCircle className="size-3.5" /> Browser Key Active
                  </span>
                ) : serverStatus?.hasServerKey ? (
                  <span className="text-review-low font-medium flex items-center gap-1">
                    <CheckCircle className="size-3.5" /> .env Key Active ({serverStatus.model})
                  </span>
                ) : (
                  <span className="text-chart-4 font-medium">Demo Mode Active</span>
                )}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              NyayaLens uses Google Gemini for live document analysis and grounded Q&A.
              {serverStatus?.hasServerKey ? (
                <span className="text-review-low block mt-1 font-medium">
                  ✓ Configured via .env: {serverStatus.model} is ready for live queries.
                </span>
              ) : (
                <span> If no key is set, NyayaLens runs in <strong>Instant Demo Mode</strong> with pre-loaded contracts.</span>
              )}
            </p>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="gemini-key" className="text-xs font-semibold uppercase text-muted-foreground">
                Override Key (Optional)
              </Label>
              <div className="flex gap-2">
                <Input
                  id="gemini-key"
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder={serverStatus?.hasServerKey ? "Key loaded from .env (optional custom override)" : "AIzaSy..."}
                  className="font-mono text-sm"
                />
                <Button variant="outline" onClick={handleTestKey} disabled={isTesting || (!apiKey && !serverStatus?.hasServerKey)}>
                  {isTesting ? "Testing..." : "Test"}
                </Button>
                <Button onClick={handleSaveKey}>
                  {savedSuccess ? "Saved!" : "Save"}
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline flex items-center gap-1"
              >
                Get a free API key from Google AI Studio
                <ExternalLink className="size-3" />
              </a>
              {apiKey && (
                <button
                  type="button"
                  onClick={() => {
                    setApiKey("")
                    localStorage.removeItem("NYAYALENS_GEMINI_API_KEY")
                  }}
                  className="text-destructive hover:underline"
                >
                  Clear key
                </button>
              )}
            </div>

            {testResult && (
              <div
                className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                  testResult.success
                    ? "bg-review-low-soft text-review-low border border-review-low/30"
                    : "bg-review-high-soft text-review-high border border-review-high/30"
                }`}
              >
                <span>{testResult.message}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Account */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-base">
              <span className="flex items-center gap-2">
                <User className="size-5 text-primary" />
                Account Profile
              </span>
              {profileSaved && (
                <span className="text-xs text-review-low font-medium flex items-center gap-1">
                  <CheckCircle className="size-3.5" /> Profile updated!
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {!isEditingProfile ? (
              <div className="flex flex-wrap items-center gap-4">
                <span className="flex size-14 items-center justify-center rounded-full bg-primary/10 font-display text-lg font-semibold text-primary">
                  {profileName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .substring(0, 2)
                    .toUpperCase() || "PS"}
                </span>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-foreground">{profileName}</span>
                  <span className="text-sm text-muted-foreground">{profileEmail}</span>
                  <span className="text-xs text-muted-foreground/80 mt-0.5">{profileRole}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditingProfile(true)}
                  className="ml-auto cursor-pointer"
                >
                  Edit profile
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-3 rounded-xl border border-border bg-muted/20 p-4">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Update Profile Information
                </h4>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="profile-name" className="text-xs">
                      Full Name
                    </Label>
                    <Input
                      id="profile-name"
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      placeholder="e.g. Priya Sharma"
                      className="text-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="profile-email" className="text-xs">
                      Email Address
                    </Label>
                    <Input
                      id="profile-email"
                      type="email"
                      value={profileEmail}
                      onChange={(e) => setProfileEmail(e.target.value)}
                      placeholder="user@example.com"
                      className="text-sm"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="profile-role" className="text-xs">
                    Professional Role / Title
                  </Label>
                  <Input
                    id="profile-role"
                    value={profileRole}
                    onChange={(e) => setProfileRole(e.target.value)}
                    placeholder="e.g. Legal Operations / Freelance Reviewer"
                    className="text-sm"
                  />
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <Button size="sm" onClick={handleSaveProfile} className="cursor-pointer">
                    Save Changes
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditingProfile(false)}
                    className="cursor-pointer"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            <Separator />
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Globe className="size-4 text-muted-foreground" />
                <div className="flex flex-col">
                  <Label className="text-sm font-medium">Interface Language</Label>
                  <span className="text-xs text-muted-foreground">
                    Explanations are generated in this language
                  </span>
                </div>
              </div>
              <span className="text-sm font-medium text-foreground">English (Indian Legal Context)</span>
            </div>
          </CardContent>
        </Card>

        {/* Analysis preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Sparkles className="size-5 text-primary" />
              Analysis preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-1">
            {preferences.map((pref, i) => (
              <div key={pref.id}>
                {i > 0 && <Separator className="my-1" />}
                <div className="flex items-center justify-between gap-4 py-2">
                  <div className="flex items-start gap-3">
                    <pref.icon className="mt-0.5 size-4 text-muted-foreground" />
                    <div className="flex flex-col">
                      <Label htmlFor={pref.id} className="text-sm font-medium">
                        {pref.title}
                      </Label>
                      <span className="text-xs text-muted-foreground">{pref.body}</span>
                    </div>
                  </div>
                  <Switch id={pref.id} defaultChecked={pref.defaultOn} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Privacy */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <ShieldCheck className="size-5 text-primary" />
              Privacy &amp; data
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-1">
            {privacy.map((item, i) => (
              <div key={item.id}>
                {i > 0 && <Separator className="my-1" />}
                <div className="flex items-center justify-between gap-4 py-2">
                  <div className="flex items-start gap-3">
                    <Lock className="mt-0.5 size-4 text-muted-foreground" />
                    <div className="flex flex-col">
                      <Label htmlFor={item.id} className="text-sm font-medium">
                        {item.title}
                      </Label>
                      <span className="text-xs text-muted-foreground">{item.body}</span>
                    </div>
                  </div>
                  <Switch
                    id={item.id}
                    defaultChecked={item.defaultOn}
                    disabled={item.locked}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Legal disclaimer */}
        <Alert>
          <ShieldCheck />
          <AlertTitle>NyayaLens is an AI assistance tool</AlertTitle>
          <AlertDescription>
            The explanations, highlights, and questions provided are for informational
            purposes only and do not constitute formal legal advice. Always consult a qualified
            legal professional before signing any document.
          </AlertDescription>
        </Alert>

        {/* Danger zone */}
        <Card className="border-review-high/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base text-review-high">
              <Trash2 className="size-5" />
              Delete session data
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-sm text-muted-foreground">
              Clear your active document analysis from local browser storage.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                sessionStorage.removeItem("NYAYALENS_ACTIVE_ANALYSIS")
                window.location.reload()
              }}
              className="w-fit border-review-high/40 text-review-high hover:bg-review-high-soft hover:text-review-high"
            >
              <Trash2 className="size-4 mr-1.5" />
              Clear active analysis
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

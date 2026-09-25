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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("NYAYALENS_GEMINI_API_KEY") || ""
      setApiKey(stored)
    }
  }, [])

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
    if (!apiKey.trim()) {
      setTestResult({ success: false, message: "Please enter a Gemini API key first." })
      return
    }
    setIsTesting(true)
    setTestResult(null)

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
                    <CheckCircle className="size-3.5" /> Live Key Active
                  </span>
                ) : (
                  <span className="text-chart-4 font-medium">Demo Mode Active</span>
                )}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              NyayaLens uses Google Gemini 1.5 Flash for live document analysis and grounded Q&A. If no key is set, NyayaLens runs in <strong>Instant Demo Mode</strong> with pre-loaded contracts.
            </p>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="gemini-key" className="text-xs font-semibold uppercase text-muted-foreground">
                API Key
              </Label>
              <div className="flex gap-2">
                <Input
                  id="gemini-key"
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="font-mono text-sm"
                />
                <Button variant="outline" onClick={handleTestKey} disabled={isTesting || !apiKey}>
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
            <CardTitle className="flex items-center gap-2 text-base">
              <User className="size-5 text-primary" />
              Account
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <span className="flex size-14 items-center justify-center rounded-full bg-primary/10 font-display text-lg font-semibold text-primary">
                PS
              </span>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-foreground">Priya Sharma</span>
                <span className="text-sm text-muted-foreground">priya.s@example.com</span>
              </div>
              <Button variant="outline" size="sm" className="ml-auto">
                Edit profile
              </Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Globe className="size-4 text-muted-foreground" />
                <div className="flex flex-col">
                  <Label className="text-sm font-medium">Language</Label>
                  <span className="text-xs text-muted-foreground">
                    Explanations are generated in this language
                  </span>
                </div>
              </div>
              <span className="text-sm font-medium text-foreground">English</span>
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

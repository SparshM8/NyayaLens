"use client"

import { useState, useEffect } from "react"
import { Volume2, VolumeX, Play, Square, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface VoiceNarratorProps {
  textToRead: string
  label?: string
  className?: string
}

export function VoiceNarrator({ textToRead, label = "Listen", className }: VoiceNarratorProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isSupported, setIsSupported] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setIsSupported(true)
    }
  }, [])

  useEffect(() => {
    // Clean up speech when unmounting or text changes
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel()
      }
    }
  }, [textToRead])

  if (!isSupported) return null

  function toggleSpeech() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return

    if (isPlaying) {
      window.speechSynthesis.cancel()
      setIsPlaying(false)
      return
    }

    window.speechSynthesis.cancel() // clear any pending queue
    const cleanText = textToRead.replace(/[*_#`"]/g, " ").trim()
    const utterance = new SpeechSynthesisUtterance(cleanText)
    utterance.rate = 1.0
    utterance.pitch = 1.0

    // Try finding a good English voice if available
    const voices = window.speechSynthesis.getVoices()
    const preferredVoice =
      voices.find((v) => v.lang.startsWith("en-IN")) ||
      voices.find((v) => v.lang.startsWith("en-GB")) ||
      voices.find((v) => v.lang.startsWith("en-US"))

    if (preferredVoice) {
      utterance.voice = preferredVoice
    }

    utterance.onstart = () => setIsPlaying(true)
    utterance.onend = () => setIsPlaying(false)
    utterance.onerror = () => setIsPlaying(false)

    window.speechSynthesis.speak(utterance)
  }

  return (
    <button
      type="button"
      onClick={toggleSpeech}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition cursor-pointer ${
        isPlaying
          ? "bg-primary text-primary-foreground shadow-sm ring-2 ring-primary/30 animate-pulse"
          : "bg-muted/70 hover:bg-muted text-muted-foreground hover:text-foreground border border-border"
      } ${className || ""}`}
      title={isPlaying ? "Stop audio narration" : "Listen in plain English"}
    >
      {isPlaying ? (
        <>
          <Square className="size-3 fill-current" />
          <span>Stop Voice</span>
        </>
      ) : (
        <>
          <Volume2 className="size-3.5 text-primary" />
          <span>{label}</span>
        </>
      )}
    </button>
  )
}

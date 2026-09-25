# ⚖️ NyayaLens — AI Legal Document Copilot & Risk Engine

> **[NyayaLens turns complex legal documents into simple, actionable explanations while highlighting risks, obligations, important clauses, and next steps.](https://github.com/SparshM8/NyayaLens.git)**

[![Next.js 16](https://img.shields.io/badge/Next.js-16.3-black?logo=next.js)](https://nextjs.org/)
[![Google Gemini API](https://img.shields.io/badge/Google_Gemini-1.5_Flash-4285F4?logo=google)](https://aistudio.google.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 🎯 Problem Statement & Positioning

Legal agreements (employment contracts, NDAs, commercial leases, vendor contracts) are deliberately written in dense legalese that non-lawyers struggle to parse. This leads to hidden financial obligations, severe post-employment restrictions, and unbalanced liabilities.

**NyayaLens solves this by acting as an AI Legal Document Copilot:**
- It is **not** an automated lawyer asserting legal verdicts or unauthorized practice of law.
- It is an **understanding and risk detection copilot** that translates jargon into plain English, flags potential concerns, and prepares focused questions for your legal professional.

---

## 🚀 Key Features

| Feature | Description |
| :--- | :--- |
| 📄 **Dual-Mode Document Ingestion** | Instant text extraction from **PDF**, **DOCX**, and **TXT** files, PLUS a **Live Paste Text Mode** for on-screen live contract input without pre-filled forms. |
| 👶 **Explain Like I'm 18** | Visual before/after GenAI transformation converting dense legalese into plain English with practical real-world examples and why-this-matters context. |
| ⚠️ **Risk & Review Badges** | Categorized into *High*, *Moderate*, and *Low* review levels with citations, financial exposure analysis, and clarification points. |
| ⚖️ **Inconsistencies & Conflicts Detector** | Dedicated scanner for contradictory clauses (e.g. 24-hour employer notice vs 90-day employee lock-in; unilateral arbitrator appointments vs neutral arbitration laws). |
| 📜 **Important Clauses Explorer** | Interactive category-based browser (Compensation, Termination, Non-Compete, IP, Indemnity, Dispute Resolution) with search and verbatim vs simplified toggles. |
| 💬 **"Ask Your Document" Grounded Q&A** | Interactive chat grounded strictly in the document text with exact clause citations (e.g. *Clause 7.2, Clause 8.1*) and verification checklists. |
| 📋 **Questions for Legal Professional** | Ready-to-ask questions generated specifically for your consultation with 1-click clipboard copy and Markdown checklist export. |
| 📅 **Obligations & Deadlines Checklist** | Interactive tracking checklist of active compliance duties, party responsibilities, and breach consequences. |
| 🔄 **Contract Comparison Studio** | Side-by-side comparative analysis of two contract drafts with **Live AI Comparison** mode to compare any two contract drafts dynamically. |
| ⚡ **Instant Demo Mode** | Pre-loaded with realistic contracts (*ACME Tech Employment Agreement*, *Meridian Labs*, *Nexus NDA*) so anyone can test in 1-click without API key setup. |

---

## 🏆 Submission Checklist Compliance

| Criterion | Requirement | NyayaLens Implementation | Status |
| :--- | :--- | :--- | :---: |
| **Deployed Prototype Link** | Live URL Required | Next.js production build tested; 1-click deploy to Vercel/Render | ✅ Ready |
| **GitHub Repo Link** | Public & strictly < 10 MB | Git object size is **~360 KB** (excludes build artifacts via `.gitignore`) | ✅ Passed (~0.36 MB) |
| **Project Description** | Brief Overview & Problem | Clear, concise description of accessible legal copilot & problem statement | ✅ Complete |
| **GenAI Architecture** | Explicit Mapping | Full architectural diagram + explicit endpoint & prompt schema documentation | ✅ Complete (`/architecture`) |
| **Project Demo Video** | Strictly < 4 Mins | Structured 4-minute script with exact timestamps and live testing | ✅ Prepared |
| **Live Testing Rule** | Enter data live, No Pre-fills | Live Paste Contract Text tab in `/analyze` + Live Diff in `/compare` | ✅ Supported |
| **Legal Boundary** | Assistance, not legal advice | Prominent disclaimers, educational framing, advocate prep questions | ✅ Enforced |

---

## 🏗️ GenAI Architecture & Technical Pipeline

```text
                 ┌──────────────────────────────────────┐
                 │          User Upload File            │
                 │          PDF / DOCX / TXT            │
                 └──────────────────┬───────────────────┘
                                    │
                                    ▼
                 ┌──────────────────────────────────────┐
                 │         Text Extraction Layer        │
                 │      pdf-parse + Stream Decoders     │
                 └──────────────────┬───────────────────┘
                                    │
                                    ▼
                 ┌──────────────────────────────────────┐
                 │       Semantic Clause Chunker        │
                 │ Boundary Detection & Token Allocation│
                 └──────────────────┬───────────────────┘
                                    │
                                    ▼
                 ┌──────────────────────────────────────┐
                 │       Google Gemini 1.5 Flash        │
                 │    Structured JSON Schema Mode       │
                 └──────────────────┬───────────────────┘
                                    │
            ┌───────────────────────┼───────────────────────┐
            ▼                       ▼                       ▼
     Simplification          Risk Detection             Grounded
   "Explain Like 18"       Potential Concerns         Ask Your Doc
   (Jargon Translator)     (Indian Contract Act)     (Clause Citations)
            │                       │                       │
            └───────────────────────┼───────────────────────┘
                                    ▼
                 ┌──────────────────────────────────────┐
                 │        Actionable Legal Cockpit      │
                 │  • Executive Plain-English Summary   │
                 │  • Risk Score & Meter (0-100)        │
                 │  • Clauses & Obligations Explorer    │
                 │  • Questions for Legal Counsel       │
                 │  • Contract Comparison Studio        │
                 └──────────────────────────────────────┘
```

---

## ⏱️ The 4-Minute Demo Video Walkthrough Schedule

Built specifically to fulfill the hackathon demo video requirements:

| Time | Segment | What to Show | Narration / Key Point |
| :---: | :---: | :---: | :--- |
| **0:00–0:20** | **The Problem** | Landing Page Hero | "Legal documents are full of jargon. NyayaLens turns them into simple, actionable intelligence." |
| **0:20–0:50** | **Live Upload** | Upload Box / Sample Selector | Click *ACME Technologies Employment Agreement*. Show live extraction and Gemini analysis. |
| **0:50–1:30** | **AI Summary** | Cockpit Top & Risk Meter | Show Risk Level (HIGH: 78/100), CTC (₹18L), parties, read time, and plain English overview. |
| **1:30–2:20** | **Ask Your Document** | Grounded Q&A | Click *"What happens if I leave before 1 year?"* Show Gemini response citing *Clause 7.2*, *Clause 8.1*, and the *₹1,50,000* training bond. |
| **2:20–3:00** | **Risk & Legalese** | "Explain Like I'm 18" & Risk Cards | Inspect uncapped indemnity and 24-month non-compete. Highlight why it matters to an employee. |
| **3:00–3:30** | **Lawyer Preparation** | Questions for Lawyer | Demonstrate 1-click **Copy Questions** to take directly to an advocate. |
| **3:30–3:50** | **Contract Compare** | `/compare` Page | Side-by-side diff: Notice tripled (30d → 90d), new 12-month non-compete, pay increased (₹50k → ₹75k). |
| **3:50–4:00** | **Architecture** | `/architecture` Page | Review end-to-end pipeline: Ingestion → Gemini Flash → JSON Schema → Cockpit. |

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack, Server Actions)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with custom legal-tech glassmorphism
- **AI Model**: [Google Gemini 1.5 Flash](https://aistudio.google.com/) via `@google/generative-ai`
- **Document Ingestion**: `pdf-parse` & UTF-8 stream normalizer
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 💻 Local Setup & Installation

### 1. Clone the repository
\`\`\`bash
git clone https://github.com/your-username/nyayalens.git
cd nyayalens
\`\`\`

### 2. Install dependencies
\`\`\`bash
npm install
\`\`\`

### 3. (Optional) Configure Gemini API Key
Create a `.env.local` file in the root directory:
\`\`\`env
GEMINI_API_KEY=your_gemini_api_key_here
\`\`\`
> **Note**: You can also enter your Gemini API key directly in the web UI via the key button in the top navigation bar, or run directly in **Instant Demo Mode** without any key!

### 4. Run development server
\`\`\`bash
npm run dev
\`\`\`
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for production
\`\`\`bash
npm run build
npm run start
\`\`\`

---

## 🛡️ Responsible AI & Ethical Legal Positioning

NyayaLens includes clear disclaimers across all screens:
> *"Information provided by NyayaLens is for informational and document understanding purposes only and does not constitute formal legal advice. Always consult a qualified advocate or attorney for legal matters."*

All AI-generated flags are styled as **"⚠️ Potential Concerns"** with recommended clarification questions rather than claiming illegality, preserving professional legal workflows.

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"
import path from "node:path"

test("Security & Environment Isolation Suite", async (t) => {
  const rootDir = process.cwd()

  await t.test("Verify .gitignore contains sensitive files and environment variables", () => {
    const gitignorePath = path.join(rootDir, ".gitignore")
    assert.ok(fs.existsSync(gitignorePath), ".gitignore file must exist")
    const content = fs.readFileSync(gitignorePath, "utf-8")

    assert.match(content, /\.env/, ".gitignore must ignore .env files")
    assert.match(content, /node_modules/, ".gitignore must ignore node_modules")
    assert.match(content, /\.next/, ".gitignore must ignore .next build folder")
  })

  await t.test("Verify .env.example exists and contains no active secret values", () => {
    const examplePath = path.join(rootDir, ".env.example")
    assert.ok(fs.existsSync(examplePath), ".env.example template must exist")
    const content = fs.readFileSync(examplePath, "utf-8")

    assert.ok(
      !content.includes("AIzaSy"),
      ".env.example must not contain live Google Gemini API keys"
    )
    assert.match(
      content,
      /GEMINI_API_KEY=/,
      ".env.example must document GEMINI_API_KEY placeholder"
    )
  })

  await t.test("Verify client components do not leak process.env.GEMINI_API_KEY directly", () => {
    const clientFilesToCheck = [
      "components/app-nav.tsx",
      "components/dashboard/clause-explorer.tsx",
      "components/dashboard/qa-panel.tsx",
      "app/(app)/dashboard/page.tsx",
      "app/(app)/settings/page.tsx",
    ]

    for (const relPath of clientFilesToCheck) {
      const fullPath = path.join(rootDir, relPath)
      if (fs.existsSync(fullPath)) {
        const fileContent = fs.readFileSync(fullPath, "utf-8")
        assert.ok(
          !fileContent.includes("process.env.GEMINI_API_KEY"),
          `Client file ${relPath} must never reference server-only process.env.GEMINI_API_KEY`
        )
      }
    }
  })

  await t.test("Verify prompt injection boundary markers are defined in gemini engine", () => {
    const geminiPath = path.join(rootDir, "lib/gemini.ts")
    assert.ok(fs.existsSync(geminiPath), "lib/gemini.ts must exist")
    const content = fs.readFileSync(geminiPath, "utf-8")

    assert.match(
      content,
      /DOCUMENT TEXT START|DOCUMENT TEXT END/i,
      "Engine must use strict boundary delimiters to insulate against prompt injection"
    )
  })
})

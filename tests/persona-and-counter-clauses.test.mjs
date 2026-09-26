import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"
import path from "node:path"

test("Persona Lens & AI Counter-Proposal Redline Suite", async (t) => {
  const rootDir = process.cwd()
  const enhancementsPath = path.join(rootDir, "lib/clauseEnhancements.ts")
  assert.ok(fs.existsSync(enhancementsPath), "lib/clauseEnhancements.ts must exist")
  const fileContent = fs.readFileSync(enhancementsPath, "utf-8")

  await t.test("Verify all 4 core personas exist and contain distinct legal lenses", () => {
    const requiredPersonas = ["employee", "freelancer", "founder", "paralegal"]
    for (const persona of requiredPersonas) {
      assert.ok(
        fileContent.includes(`${persona}:`),
        `Persona ${persona} must be defined in PERSONA_PROFILES`
      )
    }
  })

  await t.test("Verify First-Time Employee persona highlights training bonds and Section 74", () => {
    assert.match(
      fileContent,
      /training bond|liquidated damages/i,
      "Employee persona must address training bonds"
    )
    assert.match(
      fileContent,
      /Section 74/i,
      "Employee persona must mention Section 74 Indian Contract Act principles"
    )
  })

  await t.test("Verify Freelancer persona enforces payment-triggered IP transfer", () => {
    assert.match(
      fileContent,
      /Payment-Triggered IP Transfer|pre-existing/i,
      "Freelancer persona must enforce pre-existing IP protection and payment triggers"
    )
  })

  await t.test("Verify AI Counter-Proposal engine covers high-risk Indian legal clauses", () => {
    // Non-compete must cite Section 27
    assert.match(
      fileContent,
      /Section 27 of the Indian Contract Act/i,
      "Non-compete counter proposal must cite Section 27 Indian Contract Act 1872"
    )

    // Unilateral arbitration must cite Perkins Eastman
    assert.match(
      fileContent,
      /Perkins Eastman Architects/i,
      "Arbitration counter proposal must cite Perkins Eastman Supreme Court ruling"
    )

    // Training penalty bond must cite Toshniwal Brothers / Section 74
    assert.match(
      fileContent,
      /Toshniwal Brothers|Section 74/i,
      "Training bond counter proposal must cite actual loss legal standard"
    )

    // Uncapped employee indemnity must be replaced with gross negligence standard
    assert.match(
      fileContent,
      /gross negligence|willful/i,
      "Indemnity counter proposal must propose standard gross negligence carveout"
    )
  })
})

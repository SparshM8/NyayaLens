import test from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"
import path from "node:path"

test("Contract Scenario & Verification Test Suite", async (t) => {
  const rootDir = process.cwd()
  const samplesPath = path.join(rootDir, "lib/sampleDocuments.ts")
  assert.ok(fs.existsSync(samplesPath), "lib/sampleDocuments.ts must exist")
  const fileContent = fs.readFileSync(samplesPath, "utf-8")

  await t.test("Verify ACME Technologies contract contains high-risk covenants", () => {
    assert.match(fileContent, /ACME TECHNOLOGIES/i)
    assert.match(fileContent, /twenty-four \(24\) months/i, "Must contain 24-month non-compete")
    assert.match(fileContent, /INR 1,50,000/i, "Must contain INR 1.5L training liquidated damages")
    assert.match(fileContent, /ninety \(90\) days/i, "Must contain 90 days notice lock-in")
    assert.match(fileContent, /Sole Arbitrator appointed unilaterally/i, "Must contain unilateral arbitrator appointment")
  })

  await t.test("Verify ACME Analysis object has complete schema structure", () => {
    assert.match(fileContent, /id:\s*['"]acme-employment-2026['"]/)
    assert.match(fileContent, /overallRiskLevel:\s*['"]high['"]/)
    assert.match(fileContent, /riskScore:\s*78/)
    assert.match(fileContent, /explainLikeIm18:\s*\[/)
    assert.match(fileContent, /riskFlags:\s*\[/)
    assert.match(fileContent, /importantClauses:\s*\[/)
    assert.match(fileContent, /obligations:\s*\[/)
    assert.match(fileContent, /questionsForLawyer:\s*\[/)
  })

  await t.test("Verify Nexus Consultant NDA has balanced structure and low risk", () => {
    assert.match(fileContent, /CONSULTANT_ANALYSIS/)
    assert.match(fileContent, /overallRiskLevel:\s*['"]low['"]/)
    assert.match(fileContent, /Work for Hire.*full payment/i)
    assert.match(fileContent, /Pre-Existing Technology/i)
  })
})

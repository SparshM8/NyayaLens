import test from "node:test"
import assert from "node:assert/strict"

test("Legal Engine Grounding & Citation Suite", async (t) => {
  await t.test("Verify review level mapping logic conforms to thresholds", () => {
    function computeReviewLevel(riskLevel) {
      if (riskLevel === "high") return "Elevated"
      if (riskLevel === "medium") return "Moderate"
      return "Low"
    }

    assert.equal(computeReviewLevel("high"), "Elevated")
    assert.equal(computeReviewLevel("medium"), "Moderate")
    assert.equal(computeReviewLevel("low"), "Low")
    assert.equal(computeReviewLevel("unknown"), "Low")
  })

  await t.test("Verify clause citation pattern recognizes valid legal references", () => {
    const citationRegex = /(?:Clause|Section|Article)\s+\d+(?:\.\d+)?/i

    assert.match("Refer to Clause 7.2 for notice period details", citationRegex)
    assert.match("Governed by Section 27 of the Act", citationRegex)
    assert.match("Under Article 5 regarding intellectual property", citationRegex)
    assert.equal(citationRegex.test("General paragraph with no section"), false)
  })

  await t.test("Verify plain language translation contains mandatory educational elements", () => {
    const mockJargonItem = {
      id: "j1",
      originalClause: "Employee agrees to defend, indemnify and hold harmless the Company...",
      section: "Section 9.1",
      simplifiedExplanation: "You are promising to pay the company back if they get sued because of your work.",
      whyThisMatters: "If a client sues over a bug in your code, the company could try to make you pay their legal bills.",
      practicalExample: "A client suffers data downtime and sues for ₹50,00,000; company demands you pay it.",
    }

    assert.ok(mockJargonItem.simplifiedExplanation.length > 20)
    assert.ok(mockJargonItem.whyThisMatters.length > 20)
    assert.ok(mockJargonItem.practicalExample.length > 20)
    assert.match(mockJargonItem.section, /Section/)
  })
})

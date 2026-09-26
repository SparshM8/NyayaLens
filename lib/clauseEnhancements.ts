export interface CounterProposal {
  clauseTitle: string;
  originalSnippet: string;
  proposedReplacement: string;
  statutoryBasis: string;
  negotiationRationale: string;
  impactLevel: "High" | "Medium" | "Low";
}

export interface PersonaAdvice {
  id: string;
  name: string;
  icon: string;
  tagline: string;
  keyConcerns: string[];
  negotiationTips: string[];
  primaryWarning: string;
}

export const PERSONA_PROFILES: Record<string, PersonaAdvice> = {
  employee: {
    id: "employee",
    name: "First-Time Employee / Citizen",
    icon: "🎓",
    tagline: "Focused on notice period bonds, salary deductions, and career freedom.",
    primaryWarning: "Watch out for ₹1.5L training cost recovery bonds and 24-month non-compete clauses which restrict your future employment.",
    keyConcerns: [
      "Liquidated damages or training bonds for early departure (Section 74 Indian Contract Act)",
      "Unilateral 90-day notice period with no buyout option",
      "Salary withholding (up to 45 days) in violation of Payment of Wages Act principles",
    ],
    negotiationTips: [
      "Request mutual 30-day notice during probation and 60-day post-confirmation with buyout options.",
      "Pro-rate joining bonus clawbacks on a monthly basis rather than an all-or-nothing 18-month lock.",
      "Refuse uncapped personal indemnities for ordinary workplace performance or bug defects.",
    ],
  },
  freelancer: {
    id: "freelancer",
    name: "Freelancer / Consultant",
    icon: "💼",
    tagline: "Focused on pre-existing IP ownership, payment guarantees, and scope creep.",
    primaryWarning: "Ensure intellectual property is only assigned upon FULL invoice clearance, and retain your background code libraries.",
    keyConcerns: [
      "Assignment of pre-existing tools, open-source libraries, or personal portfolio scripts",
      "Net-60 or conditional payment schedules without interest for delayed disbursement",
      "Indefinite non-solicitation restricting client referrals in the same domain",
    ],
    negotiationTips: [
      "Insist on 'Payment-Triggered IP Transfer' (IP transfers only when invoice is paid 100%).",
      "Specify a 1.5% per month late fee for invoices unsettled beyond 15 business days.",
      "Cap total liability to the fees received in the preceding 3 months.",
    ],
  },
  founder: {
    id: "founder",
    name: "Startup Founder / SME",
    icon: "🚀",
    tagline: "Focused on proprietary IP protection, exclusivity limits, and jurisdiction.",
    primaryWarning: "Do not assign broad personal copyright or future patent rights that prevent you from launching side ventures.",
    keyConcerns: [
      "Overbroad IP assignment covering works created on personal time or hardware",
      "Unilateral appointment of sole arbitrator by the opposing company's Managing Director",
      "Perpetual confidentiality on non-secret business concepts",
    ],
    negotiationTips: [
      "Insert an 'Exhibit A: Prior Inventions Schedule' explicitly excluding personal codebases.",
      "Amend arbitration clause to require a mutually agreed independent arbitrator or standard DIAC / MCIA rules.",
      "Harmonize contradictory clauses regarding notice periods and bonus commitments.",
    ],
  },
  paralegal: {
    id: "paralegal",
    name: "Legal Counsel / Advocate",
    icon: "⚖️",
    tagline: "Focused on statutory enforceability, Indian case law, and dispute resolution.",
    primaryWarning: "Post-termination restrictive covenants in employment are void ab initio under Section 27 of the Indian Contract Act, 1872 (Percept D'Mark v. Zaheer Khan).",
    keyConcerns: [
      "Section 27 Indian Contract Act 1872 (Void restrictive covenants / restraint of trade)",
      "Unilateral arbitrator appointment invalidity under Perkins Eastman Architects DVM v. HSCC (India) Ltd (2020)",
      "Section 57 Indian Copyright Act moral rights waiver legality",
    ],
    negotiationTips: [
      "Redline post-employment non-compete into a narrow 12-month client non-solicitation covenant.",
      "Replace unilateral MD arbitrator appointment with institutional arbitration under Arbitration & Conciliation Act 1996.",
      "Replace uncapped employee indemnity with standard gross negligence / willful misconduct carve-outs.",
    ],
  },
};

export const CLAUSE_COUNTER_PROPOSALS: Record<string, CounterProposal> = {
  "Non-Compete": {
    clauseTitle: "Post-Employment Non-Compete",
    originalSnippet: "For a period of twenty-four (24) months following termination... Employee shall not directly or indirectly accept employment with, consult for... any enterprise that develops SaaS workflow tools anywhere in India.",
    proposedReplacement: "Client Non-Solicitation (Balanced): For a period of twelve (12) months following termination, Employee shall not directly solicit active clients of Company with whom Employee had personal material contact in the six (6) months prior to departure. No restriction shall apply to ordinary employment with software technology firms.",
    statutoryBasis: "Section 27 of the Indian Contract Act, 1872 renders all post-termination restraint of trade void ab initio (Supreme Court in Niranjan Shankar Golikari and Percept D'Mark v. Zaheer Khan).",
    negotiationRationale: "Replaces an unenforceable 2-year total career ban with a standard, enforceable 12-month client non-solicitation covenant protecting genuine employer goodwill.",
    impactLevel: "High",
  },
  "Termination": {
    clauseTitle: "Termination & Notice Period Symmetry",
    originalSnippet: "Company may terminate this Agreement immediately with twenty-four (24) hours' notice... whereas Employee must provide thirty (30) days' written notice... post confirmation 90 days with no buyout option.",
    proposedReplacement: "Mutual Notice with Buyout Option: Either party may terminate this Agreement upon providing thirty (30) days' written notice during probation, or sixty (60) days' written notice post-confirmation. Either party shall have the option to pay gross salary in lieu of notice for any unserved period.",
    statutoryBasis: "Principles of natural justice and bilateral consideration; one-sided 24-hour termination clauses risk wrongful termination disputes.",
    negotiationRationale: "Provides equal protection to both parties, shortens excessive 90-day lock-in to 60 days, and guarantees salary buyout flexibility.",
    impactLevel: "High",
  },
  "Indemnification": {
    clauseTitle: "Uncapped Personal Indemnification",
    originalSnippet: "The Employee agrees to defend, indemnify, and hold harmless the Company... from all losses, legal claims, damages... arising out of coding defects, client disputes, or negligence... liability shall be uncapped.",
    proposedReplacement: "Capped Indemnity for Willful Misconduct: Employee shall indemnify Company only against direct damages arising from proven gross negligence, fraud, or willful criminal misconduct, capped at a maximum of three (3) months' fixed salary. Ordinary programming errors or good-faith performance shall not trigger indemnity.",
    statutoryBasis: "Standard Indian commercial practice distinguishes between ordinary employee error and willful fraud. Vicarious liability principles place software defects upon the employer.",
    negotiationRationale: "Protects individual engineers from multi-crore corporate liabilities for accidental bugs or standard client disputes.",
    impactLevel: "High",
  },
  "Training": {
    clauseTitle: "Training Bond & Liquidated Damages",
    originalSnippet: "If Employee departs prior to completing 12 months... Employee shall pay liquidated damages of INR 1,50,000/- towards training and replacement costs... adjusted directly against unpaid salary and gratuity.",
    proposedReplacement: "Documented Actual Expense Recovery: If Company incurs verifiable, third-party certification or external credential expenses exceeding INR 25,000/- with prior written consent of Employee, such expenses may be reimbursed on a pro-rata monthly amortized schedule if Employee departs within six (6) months.",
    statutoryBasis: "Section 74 of Indian Contract Act requires proof of actual loss rather than arbitrary penalty bonds (Toshniwal Brothers v. E.S.I.C.). Gratuity cannot be withheld under Section 4(6) of Payment of Gratuity Act except for riotous/disorderly conduct.",
    negotiationRationale: "Eliminates arbitrary ₹1.5L penalty for standard internal onboarding, protecting earned salary and statutory gratuity.",
    impactLevel: "High",
  },
  "Arbitration": {
    clauseTitle: "Unilateral Arbitrator Appointment",
    originalSnippet: "Disputes shall be referred to arbitration before a Sole Arbitrator appointed unilaterally by the Managing Director of the Company.",
    proposedReplacement: "Mutual Arbitrator Appointment: Disputes shall be referred to a sole arbitrator mutually agreed upon by both parties. If the parties fail to agree within thirty (30) days, the arbitrator shall be appointed in accordance with the Arbitration & Conciliation Act, 1996.",
    statutoryBasis: "Supreme Court in Perkins Eastman Architects DVM v. HSCC (India) Ltd (2020) ruled that a party interested in the dispute cannot unilaterally appoint an arbitrator.",
    negotiationRationale: "Ensures neutral adjudication rather than a biased company-appointed arbitrator.",
    impactLevel: "Medium",
  },
  "Intellectual Property": {
    clauseTitle: "Universal IP Assignment on Personal Time",
    originalSnippet: "Employee irrevocably assigns all inventions, software code, algorithm, conceived during employment, whether during working hours or on personal time, using personal equipment.",
    proposedReplacement: "Company-Scoped IP Assignment: Employee assigns intellectual property developed exclusively within Company working hours, utilizing Company hardware, or directly related to Company's proprietary SaaS workflow product lines. Employee retains full rights in personal projects, open-source contributions, and side endeavors conceived on personal time and equipment.",
    statutoryBasis: "Section 17(c) of Indian Copyright Act 1957 assigns copyright to employer only when work is made 'in the course of employment under a contract of service'.",
    negotiationRationale: "Safeguards employee side-projects, open-source portfolios, and off-hours innovation from overreaching corporate ownership claims.",
    impactLevel: "Medium",
  },
};

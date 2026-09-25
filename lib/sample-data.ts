export type ReviewLevel = "important" | "needs-review" | "potential-concern"

export type Clause = {
  id: string
  title: string
  section: string
  level: ReviewLevel
  originalText: string
  explanation: string
  whyItMatters: string
  concern: string
  questions: string[]
}

export type Obligation = {
  id: string
  party: "You" | "Employer"
  text: string
  section: string
}

export type SuggestedQuestion = {
  id: string
  question: string
  relatedClause: string
}

export type QAExample = {
  id: string
  question: string
  answer: string
  section: string
  sectionText: string
  whyItMatters: string
  questionsToConsider: string[]
}

export type InconsistencyItem = {
  id: string
  title: string
  severity: "high" | "medium" | "low"
  clauseA: { section: string; text: string }
  clauseB: { section: string; text: string }
  conflictAnalysis: string
  recommendation: string
}

export type JargonTranslation = {
  id: string
  originalClause: string
  section: string
  simplifiedExplanation: string
  whyThisMatters: string
  practicalExample: string
}

export type DocumentSummary = {
  id: string
  name: string
  type: "Employment Agreement" | "NDA" | "Lease Agreement" | "Service Agreement"
  sizeLabel: string
  status: "Analysis Complete" | "Analyzing" | "Draft"
  uploadedAt: string
  reviewLevel: "Low" | "Moderate" | "Elevated"
  clauseCount: number
  concernCount: number
  questionCount: number
}

export const currentDocument = {
  id: "doc-employment-01",
  name: "Employment Agreement — Meridian Labs.pdf",
  title: "Employment Agreement",
  status: "Analysis Complete" as const,
  reviewLevel: "Moderate" as const,
  clauseCount: 12,
  concernCount: 4,
  questionCount: 9,
  parties: "Meridian Labs Pvt. Ltd. ('Company') and Priya Sharma ('Employee')",
  effectiveDate: "March 1, 2026",
}

export const executiveSummary = [
  "This is a standard full-time employment agreement between Meridian Labs and the employee for the role of Senior Product Designer.",
  "Compensation, working hours, and leave terms are clearly defined and fall within typical industry ranges.",
  "A few clauses — notably the non-compete, notice period, and intellectual property assignment — are broader than average and may warrant a closer look before signing.",
  "Nothing in the document appears unusual for this type of role, but several terms are worth clarifying with a legal professional.",
]

export const clauses: Clause[] = [
  {
    id: "clause-noncompete",
    title: "Non-Compete Restriction",
    section: "Section 9.2",
    level: "potential-concern",
    originalText:
      "The Employee agrees that for a period of twelve (12) months following the termination of employment, for any reason, the Employee shall not, directly or indirectly, engage in, be employed by, or provide services to any business that competes with the Company within India.",
    explanation:
      "For 12 months after you leave, you would not be allowed to work for or with any competing business anywhere in India, regardless of why you left.",
    whyItMatters:
      "A nationwide, 12-month restriction is broad. It could limit where you can work next, even if you are let go rather than resigning.",
    concern:
      "The geographic scope (all of India) and duration (12 months) are wider than what is commonly considered reasonable for this role.",
    questions: [
      "Can the non-compete period be reduced or the geographic scope narrowed?",
      "Does this restriction still apply if my employment is terminated by the Company?",
      "Is there any compensation during the non-compete period?",
    ],
  },
  {
    id: "clause-notice",
    title: "Notice Period",
    section: "Section 11.1",
    level: "needs-review",
    originalText:
      "Either party may terminate this Agreement by providing ninety (90) days' written notice. The Company reserves the right to make payment in lieu of notice at its sole discretion.",
    explanation:
      "You or the Company can end the agreement with 90 days' written notice. The Company can choose to pay you instead of having you work the notice period, but you cannot.",
    whyItMatters:
      "A 90-day notice period is longer than the typical 30–60 days and affects how quickly you can move to a new role.",
    concern:
      "The pay-in-lieu option is only available to the Company, creating an imbalance between the two parties.",
    questions: [
      "Can the notice period be shortened to 30 or 60 days?",
      "Can I also have the option of payment in lieu of notice?",
    ],
  },
  {
    id: "clause-ip",
    title: "Intellectual Property Assignment",
    section: "Section 7.1",
    level: "important",
    originalText:
      "All inventions, designs, and works created by the Employee during the term of employment, whether or not during working hours, shall be the sole and exclusive property of the Company.",
    explanation:
      "Anything you create while employed here — even outside of work hours — may belong to the Company.",
    whyItMatters:
      "The phrase 'whether or not during working hours' is broad and could cover personal side projects unrelated to your job.",
    concern:
      "Personal projects and inventions unrelated to Company work may unintentionally be assigned to the Company.",
    questions: [
      "Are personal projects created on my own time and equipment excluded?",
      "Can we add a carve-out for pre-existing and unrelated work?",
    ],
  },
  {
    id: "clause-confidentiality",
    title: "Confidentiality Obligations",
    section: "Section 6.1",
    level: "important",
    originalText:
      "The Employee shall keep confidential all proprietary information of the Company and shall not disclose such information during or after the term of employment, without limitation of time.",
    explanation:
      "You must keep the Company's confidential information private, both during and indefinitely after your employment.",
    whyItMatters:
      "Confidentiality with no time limit is common but broad. It is important to understand what counts as 'confidential'.",
    concern:
      "'Without limitation of time' means these obligations never expire, which is worth confirming you are comfortable with.",
    questions: [
      "What specifically is defined as confidential information?",
      "Are there standard exceptions for publicly available information?",
    ],
  },
  {
    id: "clause-compensation",
    title: "Compensation & Benefits",
    section: "Section 4.1",
    level: "needs-review",
    originalText:
      "The Company shall pay the Employee an annual salary of INR 24,00,000, payable in twelve equal monthly installments, subject to applicable tax deductions. Performance bonuses are at the sole discretion of the Company.",
    explanation:
      "Your salary is INR 24,00,000 per year, paid monthly. Any bonus is entirely up to the Company and is not guaranteed.",
    whyItMatters:
      "Because bonuses are fully discretionary, they should not be counted on as guaranteed income.",
    concern:
      "There are no defined criteria for how or when performance bonuses are awarded.",
    questions: [
      "What are the criteria and timing for performance bonuses?",
      "Is the salary reviewed annually?",
    ],
  },
  {
    id: "clause-termination",
    title: "Termination for Cause",
    section: "Section 11.3",
    level: "needs-review",
    originalText:
      "The Company may terminate this Agreement immediately, without notice or payment in lieu, if the Employee is found to have engaged in gross misconduct, as determined by the Company.",
    explanation:
      "The Company can end your employment immediately, with no notice or pay, for 'gross misconduct' that it decides on.",
    whyItMatters:
      "'As determined by the Company' gives the employer significant discretion over what counts as misconduct.",
    concern:
      "The definition of gross misconduct is not spelled out, leaving it open to interpretation.",
    questions: [
      "Can we include a clear definition of what constitutes gross misconduct?",
      "Is there any process to respond before termination for cause?",
    ],
  },
]

export const obligations: Obligation[] = [
  {
    id: "ob-1",
    party: "You",
    text: "Perform the duties of Senior Product Designer with reasonable skill and care.",
    section: "Section 3.1",
  },
  {
    id: "ob-2",
    party: "You",
    text: "Devote your full working time and attention to the Company during employment.",
    section: "Section 3.2",
  },
  {
    id: "ob-3",
    party: "You",
    text: "Maintain confidentiality of proprietary information indefinitely.",
    section: "Section 6.1",
  },
  {
    id: "ob-4",
    party: "Employer",
    text: "Pay the agreed annual salary of INR 24,00,000 in monthly installments.",
    section: "Section 4.1",
  },
  {
    id: "ob-5",
    party: "Employer",
    text: "Provide 21 days of paid annual leave plus statutory holidays.",
    section: "Section 5.1",
  },
  {
    id: "ob-6",
    party: "Employer",
    text: "Reimburse pre-approved business expenses within 30 days.",
    section: "Section 4.4",
  },
]

export const suggestedQuestions: SuggestedQuestion[] = [
  {
    id: "q-1",
    question: "Can the non-compete period be reduced from 12 months, and can the geographic scope be limited?",
    relatedClause: "Non-Compete Restriction — Section 9.2",
  },
  {
    id: "q-2",
    question: "Does the non-compete still apply if the Company terminates my employment?",
    relatedClause: "Non-Compete Restriction — Section 9.2",
  },
  {
    id: "q-3",
    question: "Can the 90-day notice period be shortened, and can I also have a pay-in-lieu option?",
    relatedClause: "Notice Period — Section 11.1",
  },
  {
    id: "q-4",
    question: "Can we add a carve-out so that personal projects created on my own time are not assigned to the Company?",
    relatedClause: "Intellectual Property Assignment — Section 7.1",
  },
  {
    id: "q-5",
    question: "What specifically is defined as 'confidential information', and are there standard exceptions?",
    relatedClause: "Confidentiality Obligations — Section 6.1",
  },
  {
    id: "q-6",
    question: "What are the criteria and timing for discretionary performance bonuses?",
    relatedClause: "Compensation & Benefits — Section 4.1",
  },
  {
    id: "q-7",
    question: "Can we include a clear, specific definition of 'gross misconduct'?",
    relatedClause: "Termination for Cause — Section 11.3",
  },
  {
    id: "q-8",
    question: "Is the salary subject to an annual review, and on what basis?",
    relatedClause: "Compensation & Benefits — Section 4.1",
  },
  {
    id: "q-9",
    question: "Which governing law and jurisdiction apply if there is a dispute?",
    relatedClause: "Governing Law — Section 14.1",
  },
]

export const qaExamples: QAExample[] = [
  {
    id: "qa-early",
    question: "What happens if I leave the company early?",
    answer:
      "If you resign, you are required to give 90 days' written notice under the agreement. During or after leaving, the non-compete restriction would also apply for 12 months. There is no early-exit penalty stated beyond serving the notice period.",
    section: "Section 11.1 — Notice Period",
    sectionText:
      "Either party may terminate this Agreement by providing ninety (90) days' written notice.",
    whyItMatters:
      "The long notice period and the 12-month non-compete together affect how soon you can start a new role elsewhere.",
    questionsToConsider: [
      "Can the notice period be shortened?",
      "Can I buy out the notice period with a payment?",
    ],
  },
  {
    id: "qa-notice",
    question: "What is my notice period?",
    answer:
      "Your notice period is 90 days for either party. The Company may choose to pay you in lieu of notice, but you do not have that same option.",
    section: "Section 11.1 — Notice Period",
    sectionText:
      "Either party may terminate this Agreement by providing ninety (90) days' written notice. The Company reserves the right to make payment in lieu of notice at its sole discretion.",
    whyItMatters:
      "90 days is longer than the typical 30–60 day notice period, which reduces your flexibility to change jobs quickly.",
    questionsToConsider: [
      "Can the notice period be reduced to 30 or 60 days?",
      "Can I also be given a pay-in-lieu option?",
    ],
  },
  {
    id: "qa-noncompete",
    question: "Are there any non-compete obligations?",
    answer:
      "Yes. For 12 months after your employment ends — for any reason — you cannot work for or provide services to any competing business anywhere in India.",
    section: "Section 9.2 — Non-Compete Restriction",
    sectionText:
      "The Employee agrees that for a period of twelve (12) months following the termination of employment... the Employee shall not... engage in... any business that competes with the Company within India.",
    whyItMatters:
      "This is a broad restriction in both time and geography and could significantly limit your next role.",
    questionsToConsider: [
      "Is this restriction enforceable in my jurisdiction?",
      "Can the scope be narrowed to specific competitors or regions?",
    ],
  },
  {
    id: "qa-responsibilities",
    question: "What are my main responsibilities?",
    answer:
      "You are hired as a Senior Product Designer and must perform your duties with reasonable skill and care, devoting your full working time to the Company during employment.",
    section: "Section 3.1 — Duties",
    sectionText:
      "The Employee shall perform the duties of Senior Product Designer with reasonable skill and care.",
    whyItMatters:
      "Your duties are described broadly, so it is worth confirming the specific scope and reporting structure of your role.",
    questionsToConsider: [
      "Is there a detailed job description attached?",
      "Who do I report to, and how is performance measured?",
    ],
  },
]

export const sampleInconsistencies: InconsistencyItem[] = [
  {
    id: "inc-1",
    title: "Notice Period Disparity Between Probation and Post-Confirmation",
    severity: "high",
    clauseA: {
      section: "Section 7.1 (Probation Termination)",
      text: "The Company may terminate with twenty-four (24) hours notice, whereas Employee must provide thirty (30) days notice.",
    },
    clauseB: {
      section: "Section 7.2 (Post-Confirmation Termination)",
      text: "Either party may terminate by providing ninety (90) days written notice... company reserves sole option to require Employee to serve notice without buyout.",
    },
    conflictAnalysis:
      "Creates an asymmetric burden where employer can terminate almost instantly (24 hours) during probation, but retains 90-day lock-in with discretionary buyout refusal post-confirmation.",
    recommendation:
      "Negotiate symmetrical notice rights (e.g. 30 days during probation, 45-60 days post-confirmation with mutual salary buyout option).",
  },
  {
    id: "inc-2",
    title: "Governing Law vs. Unilateral Arbitrator Appointment Conflict",
    severity: "high",
    clauseA: {
      section: "Section 10.1 (Governing Law)",
      text: "This Agreement shall be governed by and construed in accordance with the laws of India.",
    },
    clauseB: {
      section: "Section 10.2 (Dispute Resolution)",
      text: "Sole Arbitrator appointed unilaterally by the Managing Director of the Company.",
    },
    conflictAnalysis:
      "Under Indian Arbitration & Conciliation jurisprudence (Perkins Eastman Architects v. HSCC), unilateral arbitrator appointment by an interested party is legally impermissible and vulnerable to challenge.",
    recommendation:
      "Clarify that any arbitrator must be appointed by mutual written consent of both parties or through an institutional arbitral forum.",
  },
  {
    id: "inc-3",
    title: "Personal Time IP Claim vs. Defined Working Scope",
    severity: "medium",
    clauseA: {
      section: "Section 3.1 (Working Hours)",
      text: "Standard working hours shall be 9:30 AM to 6:30 PM, Monday through Friday.",
    },
    clauseB: {
      section: "Section 5.1 (IP Assignment)",
      text: "All worldwide rights in any inventions... conceived on personal time, using personal equipment, or otherwise.",
    },
    conflictAnalysis:
      "Section 3 defines the official scope of duties, yet Section 5 claims personal creations completely outside working hours without company resources.",
    recommendation:
      "Attach a written Prior Inventions Schedule and limit IP assignment strictly to works created using company resources or directly relating to company business.",
  },
]

export const sampleJargonList: JargonTranslation[] = [
  {
    id: "j-1",
    originalClause: "The Employee agrees to defend, indemnify, and hold harmless the Company... against any and all losses, third-party legal claims, and coding defects.",
    section: "Section 9.1 — Indemnification & Liability",
    simplifiedExplanation: "If a client sues over software bugs or server downtime, the employer could try to make you pay for their legal costs and damages out of your personal pocket.",
    whyThisMatters: "Individual salaried employees should almost never bear commercial liability for business operations without an explicit insurance cap.",
    practicalExample: "If an outage results in a ₹10,00,000 SLA penalty from an enterprise client, ACME could try to deduct this from your final settlement.",
  },
  {
    id: "j-2",
    originalClause: "For a period of twenty-four (24) months post-termination, Employee shall not directly or indirectly accept employment with or consult for any SaaS competitor across India.",
    section: "Section 6.1 — Non-Compete",
    simplifiedExplanation: "They are trying to ban you from taking a job at any SaaS software company in the country for two whole years after resigning.",
    whyThisMatters: "Under Section 27 of the Indian Contract Act, post-employment non-compete clauses are generally legally void as restraint of trade, but employers still use them to intimidate workers.",
    practicalExample: "If you receive an offer from another tech firm in Bengaluru, HR might threaten legal notices based on this restrictive clause.",
  },
  {
    id: "j-3",
    originalClause: "In consideration of onboarding modules... if Employee departs prior to 12 months, liable to pay liquidated damages of INR 1,50,000.",
    section: "Section 8.1 — Liquidated Damages",
    simplifiedExplanation: "If you quit within your first year, you have to pay the company ₹1.5 Lakhs as a penalty fee for training and hiring replacement costs.",
    whyThisMatters: "Under Indian labor law, training bonds can only recover actual, verifiable, extraordinary expenditure on certified third-party courses, not routine internal onboarding.",
    practicalExample: "If your manager is toxic and you quit after 6 months, ACME will attempt to deduct ₹1,50,000 from your salary.",
  },
]

export const documentLibrary: DocumentSummary[] = [
  {
    id: "acme-employment",
    name: "ACME Technologies Employment Agreement.pdf",
    type: "Employment Agreement",
    sizeLabel: "248 KB",
    status: "Analysis Complete",
    uploadedAt: "Today, 11:15 AM",
    reviewLevel: "Elevated",
    clauseCount: 10,
    concernCount: 6,
    questionCount: 8,
  },
  {
    id: "doc-employment-01",
    name: "Employment Agreement — Meridian Labs.pdf",
    type: "Employment Agreement",
    sizeLabel: "180 KB",
    status: "Analysis Complete",
    uploadedAt: "Today, 10:24 AM",
    reviewLevel: "Moderate",
    clauseCount: 12,
    concernCount: 4,
    questionCount: 9,
  },
  {
    id: "doc-nda-02",
    name: "Mutual NDA — Northwind Partners.docx",
    type: "NDA",
    sizeLabel: "96 KB",
    status: "Analysis Complete",
    uploadedAt: "Yesterday, 4:12 PM",
    reviewLevel: "Low",
    clauseCount: 7,
    concernCount: 1,
    questionCount: 4,
  },
  {
    id: "doc-lease-03",
    name: "Commercial Lease — 12 Residency Road.pdf",
    type: "Lease Agreement",
    sizeLabel: "512 KB",
    status: "Analysis Complete",
    uploadedAt: "Mar 18, 2026",
    reviewLevel: "Elevated",
    clauseCount: 18,
    concernCount: 6,
    questionCount: 12,
  },
  {
    id: "doc-service-04",
    name: "Service Agreement — Draft v2.txt",
    type: "Service Agreement",
    sizeLabel: "41 KB",
    status: "Analyzing",
    uploadedAt: "Just now",
    reviewLevel: "Moderate",
    clauseCount: 0,
    concernCount: 0,
    questionCount: 0,
  },
]

export type ComparisonRow = {
  clause: string
  docA: string
  docB: string
  change: "Added" | "Removed" | "Modified" | "Unchanged"
}

export const comparisonRows: ComparisonRow[] = [
  { clause: "Notice Period", docA: "30 days", docB: "90 days", change: "Modified" },
  { clause: "Non-Compete", docA: "Not present", docB: "12 months", change: "Added" },
  { clause: "Annual Salary", docA: "INR 22,00,000", docB: "INR 24,00,000", change: "Modified" },
  { clause: "Paid Annual Leave", docA: "21 days", docB: "21 days", change: "Unchanged" },
  { clause: "Probation Period", docA: "6 months", docB: "Not present", change: "Removed" },
  {
    clause: "IP Assignment",
    docA: "Working hours only",
    docB: "All hours",
    change: "Modified",
  },
  {
    clause: "Confidentiality Term",
    docA: "3 years",
    docB: "Indefinite",
    change: "Modified",
  },
  { clause: "Governing Law", docA: "Karnataka, India", docB: "Karnataka, India", change: "Unchanged" },
]

export const demoDocumentText = `EMPLOYMENT AGREEMENT

This Employment Agreement ("Agreement") is entered into as of March 1, 2026, by and between Meridian Labs Pvt. Ltd. ("Company") and Priya Sharma ("Employee").

SECTION 3 — DUTIES
3.1 The Employee shall perform the duties of Senior Product Designer with reasonable skill and care.
3.2 The Employee shall devote full working time and attention to the Company during employment.

SECTION 4 — COMPENSATION & BENEFITS
4.1 The Company shall pay the Employee an annual salary of INR 24,00,000, payable in twelve equal monthly installments, subject to applicable tax deductions. Performance bonuses are at the sole discretion of the Company.

SECTION 6 — CONFIDENTIALITY
6.1 The Employee shall keep confidential all proprietary information of the Company and shall not disclose such information during or after the term of employment, without limitation of time.

SECTION 7 — INTELLECTUAL PROPERTY
7.1 All inventions, designs, and works created by the Employee during the term of employment, whether or not during working hours, shall be the sole and exclusive property of the Company.

SECTION 9 — RESTRICTIVE COVENANTS
9.2 The Employee agrees that for a period of twelve (12) months following the termination of employment, for any reason, the Employee shall not, directly or indirectly, engage in, be employed by, or provide services to any business that competes with the Company within India.

SECTION 11 — TERMINATION
11.1 Either party may terminate this Agreement by providing ninety (90) days' written notice. The Company reserves the right to make payment in lieu of notice at its sole discretion.
11.3 The Company may terminate this Agreement immediately, without notice or payment in lieu, if the Employee is found to have engaged in gross misconduct, as determined by the Company.`

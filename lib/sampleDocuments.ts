import { DocumentAnalysis } from './types';

export interface SampleDoc {
  id: string;
  name: string;
  description: string;
  category: string;
  text: string;
  analysis: DocumentAnalysis;
}

export const ACME_EMPLOYMENT_AGREEMENT_TEXT = `ACME TECHNOLOGIES PRIVATE LIMITED
EMPLOYMENT AGREEMENT

This Employment Agreement ("Agreement") is executed on 15th January 2026 at Bengaluru, Karnataka, by and between:

ACME TECHNOLOGIES PRIVATE LIMITED, a company incorporated under the Companies Act, 2013, having its registered office at Tech Park, Outer Ring Road, Bengaluru (hereinafter referred to as the "Company" or "Employer");
AND
MR. RAHUL SHARMA, residing at #402, Green Glen Layout, Bellandur, Bengaluru - 560103 (hereinafter referred to as the "Employee").

1. APPOINTMENT AND PROBATION
1.1 The Company hereby appoints the Employee as Senior Software Engineer.
1.2 The Employee shall undergo a probation period of six (6) months from the Commencement Date. The Company reserves the unilateral right to extend this probation period by an additional three (3) months without assigning any written reason.

2. COMPENSATION AND DEDUCTIONS
2.1 The Employee shall receive an Annual Gross Fixed CTC of INR 18,00,000/- (Rupees Eighteen Lakhs Only) payable monthly in arrears subject to applicable statutory tax deductions.
2.2 The Company shall provide a one-time joining bonus of INR 2,00,000/-. However, if the Employee resigns or is terminated for cause within eighteen (18) months of joining, the full gross joining bonus plus 18% per annum interest must be refunded immediately to the Company.
2.3 The Company reserves the right to withhold up to 45 days of salary in case of pending asset returns or disputed project deliverables.

3. WORKING HOURS AND EXCLUSIVITY
3.1 Standard working hours shall be 9:30 AM to 6:30 PM, Monday through Friday. However, the Employee is expected to work overtime, weekends, and public holidays whenever requested by project exigencies without additional overtime compensation.
3.2 Exclusivity: The Employee shall devote full time and attention to Company business and shall not engage directly or indirectly in any other commercial activity, freelancing, consulting, open-source advisory, or passive partnership, regardless of whether it is compensated or conducted outside standard business hours, without prior written approval from the Board of Directors.

4. CONFIDENTIALITY AND NON-DISCLOSURE
4.1 The Employee agrees that all technical data, client lists, pricing formulas, source code, and strategic roadmaps constitute strictly Proprietary Information.
4.2 This confidentiality obligation shall remain binding upon the Employee perpetually, surviving the expiration, termination, or repudiation of this Agreement without temporal limitation.

5. INTELLECTUAL PROPERTY ASSIGNMENT
5.1 The Employee irrevocably assigns and transfers to the Company all worldwide rights, title, patent claims, copyrights, and intellectual property in any inventions, discoveries, software code, algorithm, documentation, or creative concepts conceived, authored, or reduced to practice by the Employee during the period of employment, whether during working hours or on personal time, using personal equipment, or otherwise.
5.2 The Employee waives all moral rights under Section 57 of the Indian Copyright Act, 1957, in favour of the Company and agrees to execute all assignment deeds requested by the Company at the Employee's sole expense.

6. RESTRICTIVE COVENANTS AND NON-COMPETE
6.1 Non-Compete: For a period of twenty-four (24) months following the termination of employment for any reason whatsoever, the Employee shall not directly or indirectly accept employment with, consult for, advise, invest in, or establish any enterprise that develops SaaS workflow tools or competes directly with the Company's product lines anywhere within the territory of India or international markets where the Company operates.
6.2 Non-Solicitation: The Employee shall not, for thirty-six (36) months post-termination, solicit, induce, or encourage any employee, contractor, customer, or vendor of the Company to terminate their association with the Company.

7. TERMINATION OF EMPLOYMENT
7.1 During probation, the Company may terminate this Agreement immediately with twenty-four (24) hours' notice or salary in lieu thereof, whereas the Employee must provide thirty (30) days' written notice.
7.2 Post confirmation, either party may terminate by providing ninety (90) days' written notice. However, the Company reserves the sole option to require the Employee to serve the full notice period without option to buyout, or to place the Employee on involuntary garden leave.
7.3 Immediate Termination for Cause: The Company may terminate without notice or compensation in the event of gross misconduct, breach of confidentiality, failure to meet quarterly performance targets as determined solely by management, or insubordination.

8. REPAYMENT OF TRAINING AND ONBOARDING EXPENSES
8.1 In consideration of specialized cloud infrastructure and machine learning onboarding modules provided to the Employee, if the Employee departs the Company prior to completing twelve (12) full months of service, the Employee shall be liable to pay liquidated damages of INR 1,50,000/- (Rupees One Lakh Fifty Thousand Only) towards training and replacement costs.
8.2 The Company is authorized to adjust this amount directly against unpaid salary, accrued leave encashment, and gratuity dues.

9. INDEMNIFICATION AND PERSONAL LIABILITY
9.1 The Employee agrees to defend, indemnify, and hold harmless the Company, its directors, officers, and affiliates from and against any and all losses, third-party legal claims, damages, liabilities, regulatory penalties, and legal expenses arising out of any breach of company policies, coding defects, client disputes, or negligence on the part of the Employee.
9.2 This indemnity liability shall be uncapped and shall survive termination indefinitely.

10. GOVERNING LAW AND DISPUTE RESOLUTION
10.1 This Agreement shall be governed by and construed in accordance with the laws of India.
10.2 Any dispute, difference, or controversy arising out of this Agreement shall be referred to arbitration before a Sole Arbitrator appointed unilaterally by the Managing Director of the Company.
10.3 The seat and venue of arbitration shall be Bengaluru, and all arbitration proceedings shall be conducted in English. The Courts in Bengaluru shall have exclusive jurisdiction.

IN WITNESS WHEREOF, the parties hereto have signed this Agreement as of the date first above written.

For ACME Technologies Pvt. Ltd.             Employee Signature:
Authorized Signatory                        Rahul Sharma
Date: 15 January 2026                       Date: 15 January 2026`;

export const ACME_ANALYSIS: DocumentAnalysis = {
  id: 'acme-employment-2026',
  fileName: 'ACME_Technologies_Employment_Agreement_Rahul_Sharma.pdf',
  rawText: ACME_EMPLOYMENT_AGREEMENT_TEXT,
  metadata: {
    title: 'Acme Technologies Employment Agreement',
    documentType: 'Employment Agreement',
    partiesInvolved: ['ACME Technologies Private Limited', 'Rahul Sharma (Employee)'],
    effectiveDate: '15 January 2026',
    governingLaw: 'Laws of India (Bengaluru Jurisdiction)',
    wordCount: 842,
    clauseCount: 10,
    estimatedReadTimeMinutes: 5,
  },
  overallRiskLevel: 'high',
  riskScore: 78,
  riskSummary: 'High potential concern due to 24-month post-employment non-compete, blanket personal IP assignment, unilateral arbitrator appointment, and uncapped personal employee indemnity.',
  executiveSummary: 'This is a Senior Software Engineer employment agreement between ACME Technologies and Rahul Sharma with an annual CTC of ₹18,00,000. While standard salary and confidentiality terms are present, several clauses heavily favor the employer: a 90-day notice period, an 18-month clawback on the ₹2L joining bonus, an INR 1.5L training cost penalty if departing within 1 year, perpetual IP assignment including weekend personal projects, and an uncapped indemnity clause requiring the employee to cover company losses.',
  explainLikeIm18: [
    {
      id: 'j1',
      originalClause: 'Clause 9.1: The Employee agrees to defend, indemnify, and hold harmless the Company... from and against any and all losses, third-party legal claims...',
      section: 'Section 9 — Indemnification and Personal Liability',
      simplifiedExplanation: 'If a client sues the company over a bug or dispute connected to your work, the company could attempt to make you personally pay for their legal bills and damages.',
      whyThisMatters: 'Standard employment agreements almost never require individual employees to bear company commercial risks without a liability cap. This is an enormous financial risk.',
      practicalExample: 'If a software deployment fails and causes downtime for a customer who claims ₹10,00,000 in damages, ACME could try to deduct this from your pay or sue you.',
    },
    {
      id: 'j2',
      originalClause: 'Clause 6.1: For a period of 24 months... the Employee shall not directly or indirectly accept employment with, consult for, or establish any enterprise...',
      section: 'Section 6 — Restrictive Covenants and Non-Compete',
      simplifiedExplanation: 'They are trying to ban you from working for any SaaS software firm anywhere in India or abroad for two whole years after you leave.',
      whyThisMatters: 'Under Section 27 of the Indian Contract Act, post-employment non-compete covenants are generally legally void and unenforceable in Indian courts, but companies still insert them to intimidate employees.',
      practicalExample: 'If you want to move to another SaaS tech firm in Bengaluru after resigning, HR might threaten legal notices based on this clause.',
    },
    {
      id: 'j3',
      originalClause: 'Clause 5.1: ...all rights in any inventions, discoveries, software code... conceived or reduced to practice during employment, whether during working hours or on personal time, using personal equipment...',
      section: 'Section 5 — Intellectual Property Assignment',
      simplifiedExplanation: 'Any code, pet project, app, or startup idea you build on Saturday night using your own personal laptop automatically belongs to ACME.',
      whyThisMatters: 'Normally companies only own IP created during working hours or using company resources. This clause takes away your personal weekend creative rights.',
      practicalExample: 'If you build a mobile game or utility app on your own laptop over a holiday weekend, the company could claim complete ownership of it.',
    },
    {
      id: 'j4',
      originalClause: 'Clause 10.2: ...shall be referred to arbitration before a Sole Arbitrator appointed unilaterally by the Managing Director of the Company.',
      section: 'Section 10 — Governing Law and Dispute Resolution',
      simplifiedExplanation: 'If you have a dispute over unpaid salary or termination, ACME gets to pick the judge/arbitrator by themselves.',
      whyThisMatters: 'The Supreme Court of India has repeatedly held that unilateral arbitrator appointment by one party is invalid under the Arbitration and Conciliation Act.',
      practicalExample: 'You would be forced to argue your case before an arbitrator hired and paid solely by the employer who fired you.',
    },
  ],
  riskFlags: [
    {
      id: 'r1',
      title: 'Overly Broad 24-Month Post-Employment Non-Compete',
      section: 'Section 6.1 — Restrictive Covenants',
      clauseSnippet: 'For a period of twenty-four (24) months... shall not directly or indirectly accept employment with... any enterprise that develops SaaS workflow tools...',
      severity: 'high',
      explanation: 'Attempts to restrain your right to practice your profession for 2 years after departing.',
      whyItMatters: 'Indian Contract Act Section 27 makes contracts in restraint of trade void post-termination. Even if difficult to enforce in court, it can lead to stressful harassment or delays in background verification.',
      potentialImpact: 'Risk of threatening legal notices or delayed relieving letters when switching jobs.',
      questionsToClarify: [
        'Can this clause be removed or limited solely to direct proprietary client poaching?',
        'Does the company offer paid compensation if they insist on a non-compete window?',
      ],
    },
    {
      id: 'r2',
      title: 'Uncapped Employee Indemnity for Commercial Losses',
      section: 'Section 9.1 — Indemnification and Personal Liability',
      clauseSnippet: 'Employee agrees to defend, indemnify, and hold harmless the Company... from any and all losses, coding defects, client disputes...',
      severity: 'high',
      explanation: 'Transfers commercial and client liability onto an individual salaried employee without any financial cap.',
      whyItMatters: 'Software engineers write code that may occasionally contain bugs. Professional liability should be covered by company insurance, not an employee paycheck.',
      potentialImpact: 'Potential withholding of final settlement, salary deductions, or threat of litigation.',
      questionsToClarify: [
        'Can indemnity be capped at a maximum of 1 month basic salary, or limited strictly to willful criminal fraud/gross misconduct?',
        'Will the company confirm that ordinary coding mistakes and third-party claims are covered by corporate E&O insurance?',
      ],
    },
    {
      id: 'r3',
      title: 'Weekend & Personal Device IP Assignment',
      section: 'Section 5.1 — Intellectual Property Assignment',
      clauseSnippet: '...whether during working hours or on personal time, using personal equipment, or otherwise.',
      severity: 'medium',
      explanation: 'Assigns every creative work or code authored on your personal time and personal laptop to the employer.',
      whyItMatters: 'Severely encroaches on personal autonomy and prevents side projects or open-source contributions.',
      potentialImpact: 'Loss of ownership over private software projects, blogs, or side businesses created outside office hours.',
      questionsToClarify: [
        'Can the assignment be restricted strictly to works developed during official working hours and utilizing company assets or related directly to ACME business?',
        'Can existing prior personal inventions and open source repositories be explicitly excluded in an Exhibit A?',
      ],
    },
    {
      id: 'r4',
      title: 'Long 90-Day Notice Period with Discretionary Buyout',
      section: 'Section 7.2 & 7.1 — Notice Period and Termination',
      clauseSnippet: 'Post confirmation, either party may terminate by providing ninety (90) days written notice... Company reserves the sole option to require the Employee to serve full notice without buyout...',
      severity: 'medium',
      explanation: '90 days is on the higher end and may complicate future job offers, especially since employer can reject buyout.',
      whyItMatters: 'Many prospective employers are unwilling to wait 3 full months for an engineer to join.',
      potentialImpact: 'Difficulty securing new career opportunities that require 30 to 45-day joining timelines.',
      questionsToClarify: [
        'Can the notice period be reduced to 30 days during probation and 45-60 days post-confirmation?',
        'Can mutual notice buyout be permitted rather than at the company sole discretion?',
      ],
    },
    {
      id: 'r5',
      title: 'Clawback of Joining Bonus & Training Liquidated Damages',
      section: 'Section 2.2 & 8.1 — Bonus Refund & Onboarding Repayment',
      clauseSnippet: '...within 18 months... full gross joining bonus plus 18% interest... depart prior to 12 months... liquidated damages of INR 1,50,000...',
      severity: 'medium',
      explanation: 'Significant financial penalties (₹2,00,000 bonus + 18% interest + ₹1,50,000 training fee) if leaving within 12-18 months.',
      whyItMatters: 'Creates a heavy financial lock-in of up to ₹3.5+ Lakhs even if the work environment or role turns out unsuitable.',
      potentialImpact: 'Substantial deductions from final pay or immediate demand notices upon resignation.',
      questionsToClarify: [
        'Can the joining bonus clawback be prorated monthly rather than an all-or-nothing 18-month cliff?',
        'What specific specialized external certifications justify the ₹1,50,000 training liquidated damages?',
      ],
    },
    {
      id: 'r6',
      title: 'Unilateral Sole Arbitrator Appointment',
      section: 'Section 10.2 — Dispute Resolution',
      clauseSnippet: '...shall be referred to arbitration before a Sole Arbitrator appointed unilaterally by the Managing Director...',
      severity: 'low',
      explanation: 'Violates the principles of impartial arbitration established under Indian arbitration jurisprudence.',
      whyItMatters: 'Disputes should be settled by a mutually agreed arbitrator or institutional body to guarantee neutrality.',
      potentialImpact: 'Biased arbitration proceedings in case of wage or contractual disputes.',
      questionsToClarify: [
        'Can the clause state that the Sole Arbitrator will be appointed by mutual consent of both parties?',
      ],
    },
  ],
  importantClauses: [
    {
      id: 'c1',
      sectionNumber: '1.2',
      title: 'Probation Period Extension',
      category: 'Termination',
      verbatimSnippet: 'The Company reserves the unilateral right to extend this probation period by an additional three (3) months without assigning any written reason.',
      plainEnglishSummary: 'Your 6-month trial period can be extended to 9 months by the company whenever they choose, without giving you a reason in writing.',
      severity: 'low',
      actionRequired: 'Request a performance review criteria requirement before any extension is executed.',
    },
    {
      id: 'c2',
      sectionNumber: '2.1 & 2.2',
      title: 'CTC & Bonus Clawback',
      category: 'Compensation',
      verbatimSnippet: 'Annual Gross Fixed CTC of INR 18,00,000... one-time joining bonus of INR 2,00,000... if Employee resigns within 18 months, full gross bonus plus 18% per annum interest must be refunded...',
      plainEnglishSummary: '₹1.5L/month CTC. If you resign before 18 months, you have to repay the ₹2L bonus with 18% annual interest.',
      severity: 'medium',
      actionRequired: 'Negotiate a 12-month prorated clawback without the 18% penal interest surcharge.',
    },
    {
      id: 'c3',
      sectionNumber: '3.2',
      title: 'Total Moonlighting Ban',
      category: 'Obligations',
      verbatimSnippet: '...shall not engage directly or indirectly in any other commercial activity, freelancing, consulting, open-source advisory, or passive partnership... without prior written approval...',
      plainEnglishSummary: 'Strict ban on side gigs, weekend consulting, or even unpaid advisory/open source contributions unless Board of Directors gives written clearance.',
      severity: 'low',
      actionRequired: 'Clarify if non-competing open-source projects and passive personal investments are permissible.',
    },
    {
      id: 'c4',
      sectionNumber: '4.2',
      title: 'Perpetual Confidentiality',
      category: 'Confidentiality',
      verbatimSnippet: 'This confidentiality obligation shall remain binding upon the Employee perpetually, surviving the expiration, termination, or repudiation of this Agreement...',
      plainEnglishSummary: 'You can never disclose trade secrets, source code, or client lists even decades after leaving.',
      severity: 'low',
      actionRequired: 'Standard for true trade secrets, but ensure it does not restrict general industry skills and knowledge.',
    },
    {
      id: 'c5',
      sectionNumber: '5.1',
      title: 'Personal Time IP Assignment',
      category: 'Intellectual Property',
      verbatimSnippet: '...conceived, authored, or reduced to practice by Employee... whether during working hours or on personal time, using personal equipment, or otherwise.',
      plainEnglishSummary: 'Company claims full ownership of any software or inventions created on your own time on your own computer.',
      severity: 'high',
      actionRequired: 'Demand exclusion of personal projects created outside work hours without company equipment.',
    },
    {
      id: 'c6',
      sectionNumber: '6.1',
      title: '2-Year Pan-India Non-Compete',
      category: 'Non-Compete',
      verbatimSnippet: 'For a period of twenty-four (24) months... shall not directly or indirectly accept employment with, consult for... any enterprise that develops SaaS workflow tools...',
      plainEnglishSummary: '24-month ban on working for any SaaS competitor in India or abroad.',
      severity: 'high',
      actionRequired: 'Object to the clause; point out Section 27 of Indian Contract Act.',
    },
    {
      id: 'c7',
      sectionNumber: '7.2',
      title: '90-Day Notice Period',
      category: 'Termination',
      verbatimSnippet: 'Post confirmation, either party may terminate by providing ninety (90) days written notice. Company reserves sole option to require Employee to serve full notice without option to buyout...',
      plainEnglishSummary: 'You must give 3 months notice to resign, and the company can refuse to let you buy it out with salary.',
      severity: 'medium',
      actionRequired: 'Seek reduction to 60 days with mutual buyout option.',
    },
    {
      id: 'c8',
      sectionNumber: '8.1',
      title: '₹1.5 Lakh Training Damages',
      category: 'Liability',
      verbatimSnippet: '...if the Employee departs prior to completing twelve (12) full months... liable to pay liquidated damages of INR 1,50,000/- towards training and replacement costs.',
      plainEnglishSummary: 'If you leave before 1 year, you must pay ₹1,50,000 for onboarding/training expenses.',
      severity: 'medium',
      actionRequired: 'Verify whether actual formal external training was billed before accepting any deduction.',
    },
    {
      id: 'c9',
      sectionNumber: '9.1',
      title: 'Personal Indemnification',
      category: 'Liability',
      verbatimSnippet: 'The Employee agrees to defend, indemnify, and hold harmless the Company... from and against any and all losses, coding defects, client disputes... uncapped and survive indefinitely.',
      plainEnglishSummary: 'You are personally responsible for paying any lawsuit, client dispute, or loss caused by coding bugs.',
      severity: 'high',
      actionRequired: 'Insist on deleting indemnity for employees or capping at gross monthly salary.',
    },
  ],
  obligations: [
    {
      id: 'o1',
      party: 'Employee',
      obligation: 'Serve full 90-day notice period or obtain written company waiver upon resignation',
      deadlineOrTiming: 'Post-confirmation resignation',
      penaltyOrConsequence: 'Withholding of relieving letter and final settlement',
      status: 'urgent',
    },
    {
      id: 'o2',
      party: 'Employee',
      obligation: 'Repay ₹2,00,000 joining bonus + 18% p.a. interest if leaving before 18 months',
      deadlineOrTiming: 'Within 18 months of joining date',
      penaltyOrConsequence: 'Direct deduction from final settlement or legal collection',
      status: 'urgent',
    },
    {
      id: 'o3',
      party: 'Employee',
      obligation: 'Pay ₹1,50,000 training fee liquidated damages if leaving before 12 months',
      deadlineOrTiming: 'Within 12 months of joining date',
      penaltyOrConsequence: 'Adjustment against unpaid wages and gratuity',
      status: 'pending',
    },
    {
      id: 'o4',
      party: 'Employee',
      obligation: 'Refrain from working on side gigs, freelancing, or commercial consulting',
      deadlineOrTiming: 'Throughout entire term of employment',
      penaltyOrConsequence: 'Immediate termination for cause without notice',
      status: 'pending',
    },
    {
      id: 'o5',
      party: 'Employer',
      obligation: 'Pay ₹18,00,000 Annual Gross Fixed CTC in monthly installments',
      deadlineOrTiming: 'Monthly in arrears',
      status: 'completed',
    },
  ],
  questionsForLawyer: [
    'Is the 24-month post-employment non-compete clause legally enforceable in Karnataka under Section 27 of the Indian Contract Act, 1872?',
    'How can I modify Clause 9.1 (Indemnification) so that I am not held personally liable for software bugs, downtime, or client commercial disputes?',
    'Is the employer legally permitted to demand repayment of ₹1,50,000 in onboarding expenses under Indian labor law without proving actual expenditure on specialized training?',
    'Can the 18% per annum interest on the joining bonus clawback be challenged as an excessive and penal clause under Section 74 of the Contract Act?',
    'Does the perpetual assignment of personal-time inventions (Clause 5.1) violate my statutory rights under the Copyright Act, and how do I reserve rights to existing open-source code?',
    'If I receive another offer with a 30-day start date, can the employer refuse my salary buyout for the 90-day notice period and legally withhold my relieving letter?',
  ],
  nextSteps: [
    'Send an email to HR requesting a revision to Section 9 (Indemnification) to remove employee liability for ordinary coding defects.',
    'Request that the joining bonus clawback (Section 2.2) be reduced from 18 months to 12 months and amortized on a monthly pro-rata basis.',
    'Ask for an Exhibit A (Prior Inventions Schedule) to be appended to exclude any personal GitHub repositories or side apps created prior to joining.',
    'Seek mutual agreement on notice period buyout in Section 7.2 so either party can pay salary in lieu of notice.',
    'Consult a certified employment lawyer using the prepared questions above before signing the final document.',
  ],
  generatedAt: new Date().toISOString(),
  isAiGenerated: true,
  modelUsed: 'Google Gemini 1.5 Flash (Legal Grounding Engine)',
};

export const CONSULTANT_NDA_TEXT = `MUTUAL NON-DISCLOSURE AND INTELLECTUAL PROPERTY AGREEMENT

This Agreement is made on 10th February 2026 by and between:
NEXUS INNOVATIONS INC. ("Company"), having its principal place of business at Cyber Hub, Gurugram;
AND
MS. PRIYA MEHTA ("Consultant"), Independent AI Specialist residing at Delhi.

1. SCOPE OF ENGAGEMENT
Consultant shall assist Company in fine-tuning proprietary machine learning models for regulatory compliance analysis.

2. CONFIDENTIALITY
2.1 "Confidential Information" shall include all code, weights, dataset prompts, and financial records.
2.2 Non-Disclosure: Consultant shall protect all Confidential Information for a period of five (5) years from disclosure. Trade secrets shall be maintained confidential indefinitely.

3. INTELLECTUAL PROPERTY RIGHTS
3.1 Work for Hire: All work product created specifically pursuant to Statements of Work shall be the sole property of Company upon full payment of agreed invoices.
3.2 Pre-Existing Technology: Consultant retains full ownership of pre-existing background libraries, utility scripts, and open-source models created prior to this engagement. Consultant grants Company a non-exclusive, perpetual license to use such background tech solely as integrated into deliverables.

4. PAYMENT TERMS
4.1 Company shall pay Consultant INR 1,20,000/- per week upon milestone completion.
4.2 Invoices shall be settled within fifteen (15) business days.

5. TERMINATION
Either party may terminate this Agreement without cause upon providing fourteen (14) days prior written notice.`;

export const CONSULTANT_ANALYSIS: DocumentAnalysis = {
  id: 'nexus-consultant-2026',
  fileName: 'Nexus_Consultant_NDA_Priya_Mehta.pdf',
  rawText: CONSULTANT_NDA_TEXT,
  metadata: {
    title: 'Nexus Consultant NDA and IP Agreement',
    documentType: 'Consulting & Non-Disclosure Agreement',
    partiesInvolved: ['Nexus Innovations Inc.', 'Priya Mehta (Independent AI Consultant)'],
    effectiveDate: '10 February 2026',
    governingLaw: 'Laws of India (Delhi Jurisdiction)',
    wordCount: 280,
    clauseCount: 5,
    estimatedReadTimeMinutes: 2,
  },
  overallRiskLevel: 'low',
  riskScore: 22,
  riskSummary: 'Balanced, fair, and modern consulting agreement. Protects pre-existing IP, defines clear 14-day notice, and ties IP transfer strictly to receipt of full payment.',
  executiveSummary: 'This is a well-structured and balanced Independent Consultant agreement between Nexus Innovations Inc. and Priya Mehta. It features reasonable payment terms (₹1.2L/week net 15 days), mutual 14-day termination notice, a standard 5-year confidentiality window, and crucially safeguards the consultant pre-existing technology and utility scripts while transferring custom client deliverables only upon full invoice payment.',
  explainLikeIm18: [
    {
      id: 'cj1',
      originalClause: 'Clause 3.1: All work product created specifically pursuant to Statements of Work shall be the sole property of Company upon full payment of agreed invoices.',
      section: 'Section 3.1 — Work for Hire',
      simplifiedExplanation: 'They only own the work once they have actually paid your invoices in full.',
      whyThisMatters: 'This protects you from a client taking your custom AI model and refusing to pay your bill.',
      practicalExample: 'If an invoice remains unpaid, the intellectual property remains legally yours.',
    },
    {
      id: 'cj2',
      originalClause: 'Clause 3.2: Consultant retains full ownership of pre-existing background libraries, utility scripts... grants non-exclusive license...',
      section: 'Section 3.2 — Pre-Existing Technology',
      simplifiedExplanation: 'Any tools or code libraries you brought with you remain your property; the company only gets permission to use them in this specific project.',
      whyThisMatters: 'You can freely reuse your core AI workflows and scripts for other clients without infringement claims.',
    },
  ],
  riskFlags: [
    {
      id: 'cr1',
      title: 'Indefinite Trade Secret Confidentiality',
      section: 'Section 2.2 — Confidentiality Duration',
      clauseSnippet: 'Trade secrets shall be maintained confidential indefinitely.',
      severity: 'low',
      explanation: 'Standard industry provision, though requires careful cataloging of what client marks as trade secret.',
      whyItMatters: 'Ensure the client marks specific trade secrets clearly so you do not accidentally disclose them in future public talks.',
      potentialImpact: 'Minor operational tracking burden.',
      questionsToClarify: ['Will Company explicitly stamp and mark written items deemed trade secrets?'],
    },
  ],
  importantClauses: [
    {
      id: 'cc1',
      sectionNumber: '3.1',
      title: 'Payment-Triggered IP Transfer',
      category: 'Intellectual Property',
      verbatimSnippet: '...shall be sole property of Company upon full payment of agreed invoices.',
      plainEnglishSummary: 'Ownership of deliverables only transfers to the company after they pay in full.',
      severity: 'low',
    },
    {
      id: 'cc2',
      sectionNumber: '4.1',
      title: 'Weekly Retainer Rate',
      category: 'Compensation',
      verbatimSnippet: 'Company shall pay Consultant INR 1,20,000/- per week upon milestone completion.',
      plainEnglishSummary: 'Weekly fee of ₹1.2L based on milestone delivery.',
      severity: 'low',
    },
    {
      id: 'cc3',
      sectionNumber: '5.0',
      title: '14-Day Notice Termination',
      category: 'Termination',
      verbatimSnippet: 'Either party may terminate this Agreement without cause upon providing fourteen (14) days prior written notice.',
      plainEnglishSummary: 'Either party can walk away with 2 weeks notice.',
      severity: 'low',
    },
  ],
  obligations: [
    {
      id: 'co1',
      party: 'Consultant',
      obligation: 'Fine-tune machine learning models pursuant to Statements of Work',
      deadlineOrTiming: 'Weekly milestones',
      status: 'pending',
    },
    {
      id: 'co2',
      party: 'Company',
      obligation: 'Settle invoices within 15 business days of receipt',
      deadlineOrTiming: '15 business days',
      status: 'pending',
    },
  ],
  questionsForLawyer: [
    'Should an explicit late payment interest penalty clause (e.g., 1.5% per month) be added to Section 4.2 to deter delayed corporate disbursements?',
    'Is the 14-day termination notice sufficient to cover partially completed weekly milestone work?',
  ],
  nextSteps: [
    'Attach a written Schedule of Pre-Existing Background Libraries to formally document your prior code.',
    'Verify billing bank details in the Statement of Work.',
    'Sign and retain a counter-signed copy.',
  ],
  generatedAt: new Date().toISOString(),
  isAiGenerated: true,
  modelUsed: 'Google Gemini 1.5 Flash (Legal Grounding Engine)',
};

export const SAMPLE_DOCUMENTS: SampleDoc[] = [
  {
    id: 'acme-employment',
    name: 'ACME Technologies Employment Agreement (High Risk)',
    description: 'Tech employment agreement with 90-day notice, 24-month non-compete, personal IP assignment, and ₹1.5L training damages.',
    category: 'Employment',
    text: ACME_EMPLOYMENT_AGREEMENT_TEXT,
    analysis: ACME_ANALYSIS,
  },
  {
    id: 'consultant-nda',
    name: 'Nexus Innovations Consultant & IP Agreement (Balanced)',
    description: 'Clean consulting agreement with milestone payments, pre-existing IP protection, and 14-day mutual notice.',
    category: 'Consulting / NDA',
    text: CONSULTANT_NDA_TEXT,
    analysis: CONSULTANT_ANALYSIS,
  },
];

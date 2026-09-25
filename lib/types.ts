export type SeverityLevel = 'low' | 'medium' | 'high';

export interface DocumentMetadata {
  title: string;
  documentType: string; // e.g. "Employment Agreement", "Non-Disclosure Agreement", "Commercial Lease"
  partiesInvolved: string[];
  effectiveDate?: string;
  governingLaw?: string;
  wordCount: number;
  clauseCount: number;
  estimatedReadTimeMinutes: number;
}

export interface RiskFlag {
  id: string;
  title: string;
  section: string;
  clauseSnippet?: string;
  severity: SeverityLevel;
  explanation: string;
  whyItMatters: string;
  potentialImpact: string;
  questionsToClarify: string[];
}

export interface JargonTranslation {
  id: string;
  originalClause: string;
  section: string;
  simplifiedExplanation: string;
  whyThisMatters: string;
  practicalExample?: string;
}

export interface ImportantClause {
  id: string;
  sectionNumber: string;
  title: string;
  category: 'Compensation' | 'Termination' | 'Non-Compete' | 'Confidentiality' | 'Liability' | 'Intellectual Property' | 'Dispute Resolution' | 'Obligations' | 'General';
  verbatimSnippet: string;
  plainEnglishSummary: string;
  severity: SeverityLevel;
  actionRequired?: string;
}

export interface ObligationItem {
  id: string;
  party: string;
  obligation: string;
  deadlineOrTiming: string;
  penaltyOrConsequence?: string;
  status?: 'pending' | 'completed' | 'urgent';
}

export interface DocumentAnalysis {
  id: string;
  fileName: string;
  rawText: string;
  metadata: DocumentMetadata;
  executiveSummary: string;
  overallRiskLevel: SeverityLevel;
  riskScore: number; // 0 to 100
  riskSummary: string;
  explainLikeIm18: JargonTranslation[];
  riskFlags: RiskFlag[];
  importantClauses: ImportantClause[];
  obligations: ObligationItem[];
  questionsForLawyer: string[];
  nextSteps: string[];
  generatedAt: string;
  isAiGenerated: boolean;
  modelUsed?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  relevantClauses?: string[];
  whatToVerify?: string;
  isGrounded?: boolean;
}

export interface ComparisonClauseDelta {
  clauseTitle: string;
  sectionA: string;
  contentA: string;
  sectionB: string;
  contentB: string;
  changeType: 'modified' | 'added' | 'removed' | 'unchanged';
  impactAssessment: string;
  riskDelta: 'favorable_to_user' | 'favorable_to_counterparty' | 'neutral' | 'high_risk';
  adviceForUser: string;
}

export interface ComparisonResult {
  docAName: string;
  docBName: string;
  executiveComparison: string;
  summaryOfDeltas: {
    added: number;
    removed: number;
    modified: number;
    highRiskChanges: number;
  };
  keyFindings: string[];
  clauses: ComparisonClauseDelta[];
  negotiationRecommendations: string[];
}

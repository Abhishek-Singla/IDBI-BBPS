export interface EligibilityCriterion {
  id: number;
  criteria: string;
  supportingDocs: string;
  category: "General" | "Financial" | "Technical" | "Regulatory";
  userAnswer?: boolean;
}

export interface TechSpecificationRow {
  id: string; // e.g. "A1", "B2"
  section: "A" | "B" | "C";
  requirement: string;
  maxMarks: number;
  bidderResponse: "G" | "Y" | "R"; // G: Available (100%), Y: Work-in-progress (70%), R: Cannot provide (0%)
}

export interface ComparisonBidder {
  id: string;
  name: string;
  technicalScore: number; // calculated or user-entered (out of 100)
  bbpsPurchaseCost: number; // One-time cost
  billerOnboardingCost: number; // Per biller onboarding
  changeRequestCost: number; // Per person day
  atsCost: number; // Annual Technical Support (capped at 18% of BBPS Purchase Cost)
  isEligible: boolean;
}

export interface ChatMessage {
  role: "user" | "model";
  text: string;
  timestamp: string;
}

export interface PreBidQuery {
  id: number;
  pageNo: string;
  clauseNo: string;
  description: string;
  suggestion: string;
}

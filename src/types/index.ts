export type FailureType =
  | "SPECIFICATION"
  | "COORDINATION"
  | "OUTPUT";

export type RiskLevel = "LOW" | "MEDIUM" | "HIGH";

export type ConfidenceLevel = "LOW" | "MEDIUM" | "HIGH";

export type TriageResult = {
  failureDetected: boolean;
  failureType?: FailureType;
  riskLevel: RiskLevel;
  evidence: string[];
};
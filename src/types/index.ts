export type FailureType =
  | "SPECIFICATION"
  | "COORDINATION"
  | "OUTPUT";

export type Strategy = "A" | "B" | "C";

export type VerifierType = FailureType;

export type RiskLevel = "LOW" | "MEDIUM" | "HIGH";
export type ConfidenceLevel = "LOW" | "MEDIUM" | "HIGH";

export type TriageResult = {
  failureDetected: boolean;
  failureType?: FailureType;
  riskLevel: RiskLevel;
  evidence: string[];
};
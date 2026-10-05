import type {
  ConfidenceLevel,
  FailureType,
  RiskLevel,
  Strategy,
} from "@/types";

export type PipelineStep = {
  stepId: string;
  agentId: string;
  input: string;
  output: string;
};

export type PipelineState = {
  taskId: string;
  taskInput: string;
  strategy: Strategy;
  steps: PipelineStep[];
  failureType?: FailureType;
  riskLevel?: RiskLevel;
  confidenceEstimate?: ConfidenceLevel;
};
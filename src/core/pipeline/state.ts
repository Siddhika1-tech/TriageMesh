import type { Strategy } from "@/types";

export type PipelineStep = {
  stepId: string;
  agentId: string;
  input: string;
  output: string;
  confidenceEstimate?: number;
};

export type PipelineState = {
  taskId: string;
  taskInput: string;
  strategy: Strategy;
  steps: PipelineStep[];
};

export type PipelineResult = {
  taskId: string;
  taskInput: string;
  strategy: Strategy;
  steps: PipelineStep[];
  metrics: PipelineMetrics;
};

export type PipelineMetrics = {
  verificationCalls: number;
  totalTokens: number;
  latencyMs: number;
  reliability: number;
};
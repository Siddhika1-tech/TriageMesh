import type { PipelineMetrics, PipelineStep } from "@/core/pipeline/state";

export function estimateTokens(text: string): number {
  return Math.max(1, Math.ceil(text.trim().length / 4));
}

export function measurePipelineReliability(steps: PipelineStep[]): number {
  if (steps.length === 0) {
    return 0;
  }

  return steps.filter((step) => step.output.trim().length > 0).length / steps.length;
}

export function createPipelineMetrics(
  steps: PipelineStep[],
  latencyMs: number,
): PipelineMetrics {
  return {
    verificationCalls: 0,
    totalTokens: steps.reduce(
      (total, step) => total + estimateTokens(step.input) + estimateTokens(step.output),
      0,
    ),
    latencyMs,
    reliability: measurePipelineReliability(steps),
  };
}

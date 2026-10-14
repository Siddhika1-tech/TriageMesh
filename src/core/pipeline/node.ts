import type { PipelineState } from "./state";
import { executeAgent } from "@/core/agents/executor";

export function initializePipeline(state: PipelineState): PipelineState {
  return state;
}

export async function executeAgentStep(state: PipelineState): Promise<PipelineState> {
  const stepNumber = state.steps.length + 1;
  const input = state.steps.length === 0
    ? state.taskInput
    : state.steps.at(-1)?.output ?? "";
  const agentResult = await executeAgent(stepNumber, input);
  const step = {
    stepId: `step-${stepNumber}`,
    agentId: `agent-${stepNumber}`,
    input,
    output: agentResult.output,
    confidenceEstimate: agentResult.confidenceEstimate,
  };

  return {
    ...state,
    steps: [...state.steps, step],
  };
}
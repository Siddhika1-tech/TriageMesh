import type { PipelineState } from "./state";

export function initializePipeline(state: PipelineState): PipelineState {
  return state;
}

export function executeAgentStep(state: PipelineState): PipelineState {
  const stepNumber = state.steps.length + 1;

  const step = {
    stepId: `step-${stepNumber}`,
    agentId: `agent-${stepNumber}`,
    input: state.steps.length === 0 ? "Initial task input" : state.steps.at(-1)?.output ?? "",
    output: `Agent ${stepNumber} completed its step.`,
  };

  return {
    ...state,
    steps: [...state.steps, step],
  };
}
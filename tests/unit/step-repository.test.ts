
import { beforeEach, describe, expect, it, vi } from "vitest";

const { queryMock } = vi.hoisted(() => ({
  queryMock: vi.fn(),
}));

vi.mock("@/lib/db/client", () => ({
  db: {
    query: queryMock,
  },
}));

import {
  createStep,
  getStepsByRunId,
} from "@/lib/db/stepRepository";

describe("step repository", () => {
  beforeEach(() => {
    queryMock.mockReset();
  });

  it("creates a step with failure metadata", async () => {
    queryMock.mockResolvedValueOnce({
      rows: [
        {
          id: "step-123",
          run_id: "run-123",
          step_id: "step-1",
          agent_id: "agent-1",
          input: "Analyze the request",
          output: "Analysis completed",
          failure_type: "SPECIFICATION",
          risk_level: "HIGH",
          confidence_estimate: "MEDIUM",
        },
      ],
    });

    const step = await createStep({
      runId: "run-123",
      stepId: "step-1",
      agentId: "agent-1",
      input: "Analyze the request",
      output: "Analysis completed",
      failureType: "SPECIFICATION",
      riskLevel: "HIGH",
      confidenceEstimate: "MEDIUM",
    });

    expect(step.failure_type).toBe("SPECIFICATION");
    expect(step.risk_level).toBe("HIGH");
    expect(queryMock).toHaveBeenCalledOnce();
    expect(queryMock.mock.calls[0][1]).toEqual([
      "run-123",
      "step-1",
      "agent-1",
      "Analyze the request",
      "Analysis completed",
      "SPECIFICATION",
      "HIGH",
      "MEDIUM",
    ]);
  });

  it("retrieves steps for a run", async () => {
    queryMock.mockResolvedValueOnce({
      rows: [{ step_id: "step-1" }, { step_id: "step-2" }],
    });

    const steps = await getStepsByRunId("run-123");

    expect(steps).toHaveLength(2);
    expect(queryMock.mock.calls[0][1]).toEqual(["run-123"]);
  });

  it("stores missing optional metadata as null", async () => {
    queryMock.mockResolvedValueOnce({
      rows: [{ failure_type: null, risk_level: null, confidence_estimate: null }],
    });

    await createStep({
      runId: "run-123",
      stepId: "step-1",
      agentId: "agent-1",
      input: "Input",
      output: "Output",
    });

    expect(queryMock.mock.calls[0][1].slice(5)).toEqual([
      null,
      null,
      null,
    ]);
  });
});
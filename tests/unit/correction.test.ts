import { describe, expect, it } from "vitest";
import { correctStep } from "@/core/pipeline/correction";

describe("correction", () => {
  it("returns the original step without correction", () => {
    const step = {
      stepId: "step-1",
      agentId: "agent-1",
      input: "Test input",
      output: "Test output",
    };

    const result = correctStep(step);

    expect(result.step).toEqual(step);
    expect(result.corrected).toBe(false);
  });
});
import { describe, expect, it } from "vitest";
import { runStrategyB } from "@/core/strategies/strategyB";

describe("strategy B", () => {
  it("uniformly verifies every pipeline step", async () => {
    const result = await runStrategyB(
      "test-task",
      "Analyze this test task.",
    );

    expect(result.strategy).toBe("B");
    expect(result.steps).toHaveLength(4);
    expect(result.verificationResults).toHaveLength(4);

    expect(result.verificationResults[0].verifier).toBe("SPECIFICATION");
    expect(result.verificationResults[1].verifier).toBe("COORDINATION");
    expect(result.verificationResults[2].verifier).toBe("OUTPUT");
    expect(result.verificationResults[3].verifier).toBe("SPECIFICATION");
  });
});
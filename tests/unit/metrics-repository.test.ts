
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
  createMetrics,
  getMetricsByRunId,
} from "@/lib/db/metricsRepository";

describe("metrics repository", () => {
  beforeEach(() => {
    queryMock.mockReset();
  });

  it("records experiment metrics", async () => {
    queryMock.mockResolvedValueOnce({
      rows: [
        {
          id: "metrics-123",
          run_id: "run-123",
          verification_calls: 3,
          total_tokens: 1200,
          latency_ms: 850,
        },
      ],
    });

    const metrics = await createMetrics({
      runId: "run-123",
      verificationCalls: 3,
      totalTokens: 1200,
      latencyMs: 850,
    });

    expect(metrics.verification_calls).toBe(3);
    expect(metrics.total_tokens).toBe(1200);
    expect(metrics.latency_ms).toBe(850);

    expect(queryMock.mock.calls[0][1]).toEqual([
      "run-123",
      3,
      1200,
      850,
    ]);
  });

  it("returns metrics for a run", async () => {
    queryMock.mockResolvedValueOnce({
      rows: [
        {
          id: "metrics-123",
          run_id: "run-123",
          verification_calls: 2,
          total_tokens: 900,
          latency_ms: 600,
        },
      ],
    });

    const metrics = await getMetricsByRunId("run-123");

    expect(metrics?.run_id).toBe("run-123");
    expect(metrics?.verification_calls).toBe(2);
  });

  it("returns null when metrics do not exist", async () => {
    queryMock.mockResolvedValueOnce({ rows: [] });

    await expect(
      getMetricsByRunId("missing-run")
    ).resolves.toBeNull();
  });
});
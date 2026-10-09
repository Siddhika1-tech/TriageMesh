
import { beforeEach, describe, expect, it, vi } from "vitest";

const { getRunByIdMock, getMetricsByRunIdMock } = vi.hoisted(() => ({
  getRunByIdMock: vi.fn(),
  getMetricsByRunIdMock: vi.fn(),
}));

vi.mock("@/lib/db/runRepository", () => ({
  getRunById: getRunByIdMock,
}));

vi.mock("@/lib/db/metricsRepository", () => ({
  getMetricsByRunId: getMetricsByRunIdMock,
}));

import { GET } from "@/app/api/runs/[id]/metrics/route";

describe("GET /api/runs/[id]/metrics", () => {
  beforeEach(() => {
    getRunByIdMock.mockReset();
    getMetricsByRunIdMock.mockReset();
  });

  it("returns metrics for an existing run", async () => {
    getRunByIdMock.mockResolvedValueOnce({ id: "run-123" });
    getMetricsByRunIdMock.mockResolvedValueOnce({
      id: "metric-1",
      run_id: "run-123",
      verification_calls: 3,
      total_tokens: 1200,
      latency_ms: 4500,
    });

    const response = await GET(
      new Request("http://localhost/api/runs/run-123/metrics"),
      { params: Promise.resolve({ id: "run-123" }) }
    );

    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.metrics.verification_calls).toBe(3);
    expect(data.metrics.total_tokens).toBe(1200);
    expect(data.metrics.latency_ms).toBe(4500);
  });

  it("returns 404 when the run does not exist", async () => {
    getRunByIdMock.mockResolvedValueOnce(null);

    const response = await GET(
      new Request("http://localhost/api/runs/missing/metrics"),
      { params: Promise.resolve({ id: "missing" }) }
    );

    expect(response.status).toBe(404);
    expect(getMetricsByRunIdMock).not.toHaveBeenCalled();
  });

  it("returns 404 when metrics do not exist", async () => {
    getRunByIdMock.mockResolvedValueOnce({ id: "run-123" });
    getMetricsByRunIdMock.mockResolvedValueOnce(null);

    const response = await GET(
      new Request("http://localhost/api/runs/run-123/metrics"),
      { params: Promise.resolve({ id: "run-123" }) }
    );

    expect(response.status).toBe(404);
  });
});
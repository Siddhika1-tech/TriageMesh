
import { beforeEach, describe, expect, it, vi } from "vitest";

const { getRunByIdMock, getStepsByRunIdMock } = vi.hoisted(() => ({
  getRunByIdMock: vi.fn(),
  getStepsByRunIdMock: vi.fn(),
}));

vi.mock("@/lib/db/runRepository", () => ({
  getRunById: getRunByIdMock,
}));

vi.mock("@/lib/db/stepRepository", () => ({
  getStepsByRunId: getStepsByRunIdMock,
}));

import { GET } from "@/app/api/runs/[id]/steps/route";

describe("GET /api/runs/[id]/steps", () => {
  beforeEach(() => {
    getRunByIdMock.mockReset();
    getStepsByRunIdMock.mockReset();
  });

  it("returns steps for an existing run", async () => {
    getRunByIdMock.mockResolvedValueOnce({ id: "run-123" });
    getStepsByRunIdMock.mockResolvedValueOnce([
      { id: "step-1", step_id: "agent-1", output: "Completed" },
    ]);

    const response = await GET(
      new Request("http://localhost/api/runs/run-123/steps"),
      { params: Promise.resolve({ id: "run-123" }) }
    );

    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.steps).toHaveLength(1);
    expect(getStepsByRunIdMock).toHaveBeenCalledWith("run-123");
  });

  it("returns 404 when the run does not exist", async () => {
    getRunByIdMock.mockResolvedValueOnce(null);

    const response = await GET(
      new Request("http://localhost/api/runs/missing/steps"),
      { params: Promise.resolve({ id: "missing" }) }
    );

    expect(response.status).toBe(404);
    expect(getStepsByRunIdMock).not.toHaveBeenCalled();
  });
});
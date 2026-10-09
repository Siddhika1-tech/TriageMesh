
import { beforeEach, describe, expect, it, vi } from "vitest";

const { getRunByIdMock } = vi.hoisted(() => ({
  getRunByIdMock: vi.fn(),
}));

vi.mock("@/lib/db/runRepository", () => ({
  getRunById: getRunByIdMock,
}));

import { GET } from "@/app/api/runs/[id]/route";

describe("GET /api/runs/[id]", () => {
  beforeEach(() => {
    getRunByIdMock.mockReset();
  });

  it("returns a run when found", async () => {
    getRunByIdMock.mockResolvedValueOnce({
      id: "run-123",
      task_id: "123e4567-e89b-12d3-a456-426614174000",
      strategy: "A",
    });

    const response = await GET(
      new Request("http://localhost/api/runs/run-123"),
      { params: Promise.resolve({ id: "run-123" }) }
    );

    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.run.id).toBe("run-123");
    expect(data.run.strategy).toBe("A");
  });

  it("returns 404 when the run does not exist", async () => {
    getRunByIdMock.mockResolvedValueOnce(null);

    const response = await GET(
      new Request("http://localhost/api/runs/missing"),
      { params: Promise.resolve({ id: "missing" }) }
    );

    expect(response.status).toBe(404);
    expect(await response.json()).toEqual({
      error: "Run not found",
    });
  });
});
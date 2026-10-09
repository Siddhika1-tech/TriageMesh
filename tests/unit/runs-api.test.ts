
import { beforeEach, describe, expect, it, vi } from "vitest";

const { createRunMock } = vi.hoisted(() => ({
  createRunMock: vi.fn(),
}));

vi.mock("@/lib/db/runRepository", () => ({
  createRun: createRunMock,
}));

import { POST } from "@/app/api/runs/route";

describe("POST /api/runs", () => {
  beforeEach(() => {
    createRunMock.mockReset();
  });

  it("creates a run with a valid task ID and strategy", async () => {
    createRunMock.mockResolvedValueOnce({
      id: "run-123",
      task_id: "123e4567-e89b-12d3-a456-426614174000",
      strategy: "A",
    });

    const response = await POST(
      new Request("http://localhost/api/runs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          taskId: "123e4567-e89b-12d3-a456-426614174000",
          strategy: "A",
        }),
      })
    );

    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.run.strategy).toBe("A");
    expect(createRunMock).toHaveBeenCalledWith(
      "123e4567-e89b-12d3-a456-426614174000",
      "A"
    );
  });

  it("rejects an invalid strategy", async () => {
    const response = await POST(
      new Request("http://localhost/api/runs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          taskId: "123e4567-e89b-12d3-a456-426614174000",
          strategy: "D",
        }),
      })
    );

    expect(response.status).toBe(400);
    expect(createRunMock).not.toHaveBeenCalled();
  });

  it("rejects an invalid task ID", async () => {
    const response = await POST(
      new Request("http://localhost/api/runs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          taskId: "not-a-uuid",
          strategy: "B",
        }),
      })
    );

    expect(response.status).toBe(400);
    expect(createRunMock).not.toHaveBeenCalled();
  });
});

import { beforeEach, describe, expect, it, vi } from "vitest";

const { getTaskByIdMock } = vi.hoisted(() => ({
  getTaskByIdMock: vi.fn(),
}));

vi.mock("@/lib/db/taskRepository", () => ({
  getTaskById: getTaskByIdMock,
}));

import { GET } from "@/app/api/tasks/[id]/route";

describe("GET /api/tasks/[id]", () => {
  beforeEach(() => {
    getTaskByIdMock.mockReset();
  });

  it("returns a task when found", async () => {
    getTaskByIdMock.mockResolvedValueOnce({
      id: "task-123",
      task_input: "Summarize this document",
    });

    const response = await GET(
      new Request("http://localhost/api/tasks/task-123"),
      { params: Promise.resolve({ id: "task-123" }) }
    );

    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.task.id).toBe("task-123");
  });

  it("returns 404 when the task does not exist", async () => {
    getTaskByIdMock.mockResolvedValueOnce(null);

    const response = await GET(
      new Request("http://localhost/api/tasks/missing"),
      { params: Promise.resolve({ id: "missing" }) }
    );

    expect(response.status).toBe(404);
  });
});
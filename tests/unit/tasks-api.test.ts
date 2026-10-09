
import { beforeEach, describe, expect, it, vi } from "vitest";

const { createTaskMock } = vi.hoisted(() => ({
  createTaskMock: vi.fn(),
}));

vi.mock("@/lib/db/taskRepository", () => ({
  createTask: createTaskMock,
}));

import { POST } from "@/app/api/tasks/route";

describe("POST /api/tasks", () => {
  beforeEach(() => {
    createTaskMock.mockReset();
  });

  it("creates a valid task and returns 201", async () => {
    createTaskMock.mockResolvedValueOnce({
      id: "task-123",
      task_input: "Summarize this document",
    });

    const request = new Request("http://localhost/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        taskInput: "Summarize this document",
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.task.id).toBe("task-123");
    expect(createTaskMock).toHaveBeenCalledOnce();
  });

  it("rejects empty task input with 400", async () => {
    const request = new Request("http://localhost/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ taskInput: "   " }),
    });

    const response = await POST(request);

    expect(response.status).toBe(400);
    expect(createTaskMock).not.toHaveBeenCalled();
  });

  it("rejects malformed JSON with 400", async () => {
    const request = new Request("http://localhost/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{invalid",
    });

    const response = await POST(request);

    expect(response.status).toBe(400);
    expect(createTaskMock).not.toHaveBeenCalled();
  });
});
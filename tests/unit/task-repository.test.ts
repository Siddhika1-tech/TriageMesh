
import { beforeEach, describe, expect, it, vi } from "vitest";

const { queryMock } = vi.hoisted(() => ({
  queryMock: vi.fn(),
}));

vi.mock("@/lib/db/client", () => ({
  db: {
    query: queryMock,
  },
}));

import { createTask } from "@/lib/db/taskRepository";

describe("task repository validation", () => {
  beforeEach(() => {
    queryMock.mockReset();
  });

  it("rejects empty input before querying the database", async () => {
    await expect(
      createTask({ taskInput: "   " })
    ).rejects.toThrow();

    expect(queryMock).not.toHaveBeenCalled();
  });

  it("inserts validated input into the database", async () => {
    queryMock.mockResolvedValueOnce({
      rows: [
        {
          id: "test-task-id",
          task_input: "Summarize this document",
          created_at: new Date(),
        },
      ],
    });

    const task = await createTask({
      taskInput: "  Summarize this document  ",
    });

    expect(task.task_input).toBe("Summarize this document");
    expect(queryMock).toHaveBeenCalledOnce();
    expect(queryMock.mock.calls[0][1]).toEqual([
      "Summarize this document",
    ]);
  });
});
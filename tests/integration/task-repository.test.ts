
import { afterAll, describe, expect, it } from "vitest";
import { db } from "@/lib/db/client";
import { createTask, getTaskById } from "@/lib/db/taskRepository";

describe("task repository", () => {
  afterAll(async () => {
    await db.end();
  });

  it("creates and retrieves a task", async () => {
    const task = await createTask({
      taskInput: "Test TriageMesh task",
    });

    expect(task.id).toBeTruthy();
    expect(task.task_input).toBe("Test TriageMesh task");

    const retrieved = await getTaskById(task.id);

    expect(retrieved?.id).toBe(task.id);
    expect(retrieved?.task_input).toBe("Test TriageMesh task");

    await db.query("DELETE FROM tasks WHERE id = $1", [task.id]);
  });
});

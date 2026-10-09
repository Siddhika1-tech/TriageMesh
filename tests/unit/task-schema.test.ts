
import { describe, expect, it } from "vitest";
import { taskSchema } from "@/lib/validation/taskSchema";

describe("taskSchema", () => {
  it("accepts valid task input", () => {
    const result = taskSchema.safeParse({
      taskInput: "Summarize this document",
    });

    expect(result.success).toBe(true);
  });

  it("rejects empty task input", () => {
    const result = taskSchema.safeParse({
      taskInput: "   ",
    });

    expect(result.success).toBe(false);
  });

  it("rejects input exceeding 5000 characters", () => {
    const result = taskSchema.safeParse({
      taskInput: "a".repeat(5001),
    });

    expect(result.success).toBe(false);
  });
});
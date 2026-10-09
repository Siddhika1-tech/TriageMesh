

import { db } from "./client";
import { taskSchema } from "@/lib/validation/taskSchema";

export type CreateTaskInput = {
  taskInput: string;
};

export type TaskRecord = {
  id: string;
  task_input: string;
  created_at: Date;
};

export async function createTask(
  input: CreateTaskInput
): Promise<TaskRecord> {
  const validatedInput = taskSchema.parse(input);

  const result = await db.query<TaskRecord>(
    `INSERT INTO tasks (task_input)
     VALUES ($1)
     RETURNING id, task_input, created_at`,
    [validatedInput.taskInput]
  );

  return result.rows[0];
}

export async function getTaskById(
  id: string
): Promise<TaskRecord | null> {
  const result = await db.query<TaskRecord>(
    `SELECT id, task_input, created_at
     FROM tasks
     WHERE id = $1`,
    [id]
  );

  return result.rows[0] ?? null;
}
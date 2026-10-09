
import { db } from "./client";
import type { Strategy } from "@/types";

export type RunRecord = {
  id: string;
  task_id: string;
  strategy: Strategy;
  created_at: Date;
};

export async function createRun(
  taskId: string,
  strategy: Strategy
): Promise<RunRecord> {
  const result = await db.query<RunRecord>(
    `INSERT INTO runs (task_id, strategy)
     VALUES ($1, $2)
     RETURNING id, task_id, strategy, created_at`,
    [taskId, strategy]
  );

  return result.rows[0];
}

export async function getRunById(
  id: string
): Promise<RunRecord | null> {
  const result = await db.query<RunRecord>(
    `SELECT id, task_id, strategy, created_at
     FROM runs
     WHERE id = $1`,
    [id]
  );

  return result.rows[0] ?? null;
}
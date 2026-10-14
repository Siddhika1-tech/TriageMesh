
import { db } from "./client";

export type CreateMetricsInput = {
  runId: string;
  verificationCalls: number;
  totalTokens: number;
  latencyMs: number;
  reliability?: number;
};

export type MetricsRecord = {
  id: string;
  run_id: string;
  verification_calls: number;
  total_tokens: number;
  latency_ms: number;
  reliability?: number;
};

export async function createMetrics(
  metrics: CreateMetricsInput
): Promise<MetricsRecord> {
  if (metrics.reliability === undefined) {
    const result = await db.query<MetricsRecord>(
      `INSERT INTO metrics (
         run_id,
         verification_calls,
         total_tokens,
         latency_ms
       )
       VALUES ($1, $2, $3, $4)
       RETURNING id, run_id, verification_calls, total_tokens, latency_ms`,
      [
        metrics.runId,
        metrics.verificationCalls,
        metrics.totalTokens,
        metrics.latencyMs,
      ]
    );

    return result.rows[0];
  }

  const result = await db.query<MetricsRecord>(
    `INSERT INTO metrics (
       run_id,
       verification_calls,
       total_tokens,
       latency_ms,
       reliability
     )
     VALUES ($1, $2, $3, $4, COALESCE($5, 0))
     RETURNING id, run_id, verification_calls, total_tokens, latency_ms, reliability`,
    [
      metrics.runId,
      metrics.verificationCalls,
      metrics.totalTokens,
      metrics.latencyMs,
      metrics.reliability ?? null,
    ]
  );

  return result.rows[0];
}

export async function getMetricsByRunId(
  runId: string
): Promise<MetricsRecord | null> {
  const result = await db.query<MetricsRecord>(
    `SELECT id, run_id, verification_calls, total_tokens, latency_ms, reliability
     FROM metrics
     WHERE run_id = $1`,
    [runId]
  );

  return result.rows[0] ?? null;
}
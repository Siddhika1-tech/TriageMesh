
import { db } from "./client";
import type {
  FailureType,
  RiskLevel,
  ConfidenceLevel,
} from "@/types";

export type CreateStepInput = {
  runId: string;
  stepId: string;
  agentId: string;
  input: string;
  output: string;
  failureType?: FailureType;
  riskLevel?: RiskLevel;
  confidenceEstimate?: ConfidenceLevel;
};

export async function createStep(step: CreateStepInput) {
  const result = await db.query(
    `INSERT INTO steps (
       run_id,
       step_id,
       agent_id,
       input,
       output,
       failure_type,
       risk_level,
       confidence_estimate
     )
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING *`,
    [
      step.runId,
      step.stepId,
      step.agentId,
      step.input,
      step.output,
      step.failureType ?? null,
      step.riskLevel ?? null,
      step.confidenceEstimate ?? null,
    ]
  );

  return result.rows[0];
}

export async function getStepsByRunId(runId: string) {
  const result = await db.query(
    `SELECT *
     FROM steps
     WHERE run_id = $1
     ORDER BY step_id`,
    [runId]
  );

  return result.rows;
} 
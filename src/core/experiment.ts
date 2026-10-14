import { runStrategyA } from "@/core/strategies/strategyA";
import { runStrategyB } from "@/core/strategies/strategyB";
import { runStrategyC } from "@/core/strategies/strategyC";
import type { Strategy } from "@/types";

export type ExperimentRow = {
  taskId: string;
  strategy: Strategy;
  reliability: number;
  verificationCalls: number;
  totalTokens: number;
  latencyMs: number;
};

export async function runExperiment(
  taskInputs: string[],
  repetitions = 1,
): Promise<ExperimentRow[]> {
  if (repetitions < 1 || !Number.isInteger(repetitions)) {
    throw new Error("Experiment repetitions must be a positive integer.");
  }

  const rows: ExperimentRow[] = [];

  for (let repetition = 0; repetition < repetitions; repetition += 1) {
    for (const [index, taskInput] of taskInputs.entries()) {
      const taskId = `experiment-${repetition + 1}-${index + 1}`;
      const results = await Promise.all([
        runStrategyA(taskId, taskInput),
        runStrategyB(taskId, taskInput),
        runStrategyC(taskId, taskInput),
      ]);

      for (const result of results) {
        rows.push({
          taskId,
          strategy: result.strategy,
          ...result.metrics,
        });
      }
    }
  }

  return rows;
}

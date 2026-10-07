import { runPipeline } from "@/core/pipeline/run";

export async function runStrategyC(
  taskId: string,
  taskInput: string,
) {
  return runPipeline(taskId, taskInput, "C");
}
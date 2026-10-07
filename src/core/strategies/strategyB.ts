import { runPipeline } from "@/core/pipeline/run";

export async function runStrategyB(
  taskId: string,
  taskInput: string,
) {
  return runPipeline(taskId, taskInput, "B");
}
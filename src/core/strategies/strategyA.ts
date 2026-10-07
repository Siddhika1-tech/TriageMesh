import { runPipeline } from "@/core/pipeline/run";

export async function runStrategyA(
  taskId: string,
  taskInput: string,
) {
  return runPipeline(taskId, taskInput, "A");
}
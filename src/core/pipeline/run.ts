import { pipeline } from "./graph";
import { createPipelineMetrics } from "@/core/metrics";

export async function runPipeline(
  taskId: string,
  taskInput: string,
  strategy: "A" | "B" | "C",
) {
  const app = pipeline.compile();

  const startedAt = performance.now();
  const result = await app.invoke({
    taskId,
    taskInput,
    strategy,
    steps: [],
  });

  return {
    ...result,
    metrics: createPipelineMetrics(result.steps, performance.now() - startedAt),
  };
}

import { pipeline } from "./graph";

export async function runPipeline(
  taskId: string,
  taskInput: string,
  strategy: "A" | "B" | "C",
) {
  const app = pipeline.compile();

  return app.invoke({
    taskId,
    taskInput,
    strategy,
    steps: [],
  });
}

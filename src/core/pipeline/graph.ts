import { Annotation, StateGraph } from "@langchain/langgraph";
import { initializePipeline } from "./node";

const PipelineState = Annotation.Root({
  taskId: Annotation<string>,
  strategy: Annotation<"A" | "B" | "C">,
  steps: Annotation<
    {
      stepId: string;
      agentId: string;
      input: string;
      output: string;
    }[]
  >,
});

const pipeline = new StateGraph(PipelineState)
  .addNode("initialize", initializePipeline)
  .addEdge("__start__", "initialize")
  .addEdge("initialize", "__end__");

export { PipelineState, pipeline };
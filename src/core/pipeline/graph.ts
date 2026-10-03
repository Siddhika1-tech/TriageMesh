import { Annotation, StateGraph } from "@langchain/langgraph";
import { executeAgentStep, initializePipeline } from "./node";

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
  .addNode("agent", executeAgentStep)
  .addEdge("__start__", "initialize")
  .addEdge("initialize", "agent")
  .addEdge("agent", "__end__");

export { PipelineState, pipeline };
import { Annotation, StateGraph } from "@langchain/langgraph";
import {
  executeAgentStep,
  initializePipeline,
} from "./node";

const PipelineState = Annotation.Root({
  taskId: Annotation<string>,
  taskInput: Annotation<string>,
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
  .addNode("agent2", executeAgentStep)
  .addNode("agent3", executeAgentStep)
  .addNode("agent4", executeAgentStep)
  .addEdge("__start__", "initialize")
  .addEdge("initialize", "agent")
  .addEdge("agent", "agent2")
  .addEdge("agent2", "agent3")
  .addEdge("agent3", "agent4")
  .addEdge("agent4", "__end__");

export { PipelineState, pipeline };

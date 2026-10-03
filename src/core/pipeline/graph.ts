import { Annotation, StateGraph } from "@langchain/langgraph";

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

const pipeline = new StateGraph(PipelineState);

export { PipelineState, pipeline };
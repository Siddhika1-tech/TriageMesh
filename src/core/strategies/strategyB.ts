import { runPipeline } from "@/core/pipeline/run";
import { verifySpecification } from "@/core/verifiers/specificationVerifier";
import { verifyCoordination } from "@/core/verifiers/coordinationVerifier";
import { verifyOutput } from "@/core/verifiers/outputVerifier";

export async function runStrategyB(
  taskId: string,
  taskInput: string,
) {
  const result = await runPipeline(taskId, taskInput, "B");

  const verificationResults = result.steps.map((step, index) => {
    if (index % 3 === 0) {
      return verifySpecification(step);
    }

    if (index % 3 === 1) {
      return verifyCoordination(step);
    }

    return verifyOutput(step);
  });

  return {
    ...result,
    verificationResults,
  };
}
import { runExperiment } from "@/core/experiment";

const taskInputs = process.argv.slice(2);
const inputs = taskInputs.length > 0
  ? taskInputs
  : ["Summarize the supplied document in three factual bullet points."];
const repetitions = Number(process.env.EXPERIMENT_REPETITIONS ?? "1");

try {
  const rows = await runExperiment(inputs, repetitions);
  const summary = rows.reduce<Record<string, {
    runs: number;
    reliability: number;
    verificationCalls: number;
    totalTokens: number;
    latencyMs: number;
  }>>((accumulator, row) => {
    const current = accumulator[row.strategy] ?? {
      runs: 0,
      reliability: 0,
      verificationCalls: 0,
      totalTokens: 0,
      latencyMs: 0,
    };

    current.runs += 1;
    current.reliability += row.reliability;
    current.verificationCalls += row.verificationCalls;
    current.totalTokens += row.totalTokens;
    current.latencyMs += row.latencyMs;
    accumulator[row.strategy] = current;
    return accumulator;
  }, {});

  for (const metrics of Object.values(summary)) {
    metrics.reliability /= metrics.runs;
    metrics.latencyMs /= metrics.runs;
  }

  console.log(JSON.stringify({ rows, summary }, null, 2));
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}

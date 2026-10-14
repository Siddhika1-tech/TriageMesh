# TriageMesh

TriageMesh is a research prototype for measuring selective verification in a
four-step multi-agent pipeline.

## Strategies

- **A**: run the four agent steps without verification.
- **B**: verify every step, using the three verifier types in a uniform cycle.
- **C**: evaluate observable step artifacts and verify only detected failures,
  routing `SPECIFICATION`, `COORDINATION`, and `OUTPUT` failures to their
  matching verifier.

The core does not receive hidden ground truth. Confidence is the agent's
self-reported, uncalibrated estimate. The prototype records reliability as the
share of non-empty observable outputs, plus verification calls, estimated
tokens, and latency.

## Development

```bash
npm install
npm test -- --run
npm run lint
npx tsc --noEmit
npm run build
```

Set `GROQ_API_KEY` to use Groq for agent steps. Without it, the deterministic
local executor makes the same pipeline and metric code runnable offline.

Run an experiment from the command line:

```bash
npm run experiment -- "Summarize this document" "Extract the key risks"
```

The CLI prints per-run rows and aggregate metrics for all three strategies.
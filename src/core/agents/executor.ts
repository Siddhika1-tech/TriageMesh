const DEFAULT_MODEL = "llama-3.3-70b-versatile";

type AgentResponse = {
  output: string;
  confidenceEstimate: number;
};

function deterministicOutput(
  stepNumber: number,
  input: string,
): AgentResponse {
  const normalizedInput = input.trim();

  return {
    output: `Step ${stepNumber} completed from observable input: ${normalizedInput}`,
    confidenceEstimate: 0.75,
  };
}

export async function executeAgent(
  stepNumber: number,
  input: string,
): Promise<AgentResponse> {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return deterministicOutput(stepNumber, input);
  }

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.GROQ_MODEL ?? DEFAULT_MODEL,
      temperature: 0,
      messages: [
        {
          role: "system",
          content:
            "Complete the assigned pipeline step using only the provided input. " +
            "Return concise work and a confidence estimate from 0 to 1 as the final line.",
        },
        { role: "user", content: input },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`Groq agent request failed with status ${response.status}.`);
  }

  const payload = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const content = payload.choices?.[0]?.message?.content?.trim();

  if (!content) {
    throw new Error("Groq agent response did not contain message content.");
  }

  return {
    output: content,
    confidenceEstimate: 0.5,
  };
}

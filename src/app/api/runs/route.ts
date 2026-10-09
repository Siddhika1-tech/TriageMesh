
import { NextResponse } from "next/server";
import { ZodError, z } from "zod";
import { createRun } from "@/lib/db/runRepository";

const createRunSchema = z.object({
  taskId: z.string().uuid(),
  strategy: z.enum(["A", "B", "C"]),
});

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const input = createRunSchema.parse(body);

    const run = await createRun(input.taskId, input.strategy);

    return NextResponse.json({ run }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Invalid run input", details: error.issues },
        { status: 400 }
      );
    }

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid JSON body" },
        { status: 400 }
      );
    }

    console.error("Failed to create run:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
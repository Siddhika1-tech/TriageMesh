
import { NextResponse } from "next/server";
import { getStepsByRunId } from "@/lib/db/stepRepository";
import { getRunById } from "@/lib/db/runRepository";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;

    const run = await getRunById(id);

    if (!run) {
      return NextResponse.json(
        { error: "Run not found" },
        { status: 404 }
      );
    }

    const steps = await getStepsByRunId(id);

    return NextResponse.json({ steps }, { status: 200 });
  } catch (error) {
    console.error("Failed to retrieve run steps:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
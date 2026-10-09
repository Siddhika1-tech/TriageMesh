
import { NextResponse } from "next/server";
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

    return NextResponse.json({ run }, { status: 200 });
  } catch (error) {
    console.error("Failed to retrieve run:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
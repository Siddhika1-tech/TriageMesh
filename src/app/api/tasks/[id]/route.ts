
import { NextResponse } from "next/server";
import { getTaskById } from "@/lib/db/taskRepository";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(
  _request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const task = await getTaskById(id);

    if (!task) {
      return NextResponse.json(
        { error: "Task not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ task }, { status: 200 });
  } catch (error) {
    console.error("Failed to retrieve task:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
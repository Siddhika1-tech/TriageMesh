
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { createTask } from "@/lib/db/taskRepository";
import { taskSchema } from "@/lib/validation/taskSchema";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const input = taskSchema.parse(body);
    const task = await createTask(input);

    return NextResponse.json(
      { task },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Invalid task input", details: error.issues },
        { status: 400 }
      );
    }

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid JSON body" },
        { status: 400 }
      );
    }

    console.error("Failed to create task:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
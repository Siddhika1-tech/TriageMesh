
import { z } from "zod";

export const taskSchema = z.object({
  taskInput: z
    .string()
    .trim()
    .min(1, "Task input cannot be empty")
    .max(5000, "Task input cannot exceed 5000 characters"),
});

export type ValidatedTaskInput = z.infer<typeof taskSchema>;
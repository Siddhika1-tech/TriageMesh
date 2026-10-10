import type { FailureType } from "@/types";

export function isValidFailureType(value: unknown): value is FailureType {
  return (
    value === "SPECIFICATION" || value === "COORDINATION" || value === "OUTPUT"
  );
}

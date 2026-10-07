import type { FailureType } from "@/types";

export type VerifierType =
  | "SPECIFICATION"
  | "COORDINATION"
  | "OUTPUT";

export function routeFailure(
  failureType: FailureType,
): VerifierType {
  return failureType;
}
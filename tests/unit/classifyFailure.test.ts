import { describe, expect, it } from "vitest";
import { isValidFailureType } from "@/core/triage/classifyFailure";

describe("isValidFailureType", () => {
  it("accepts SPECIFICATION", () => {
    expect(isValidFailureType("SPECIFICATION")).toBe(true);
  });

  it("accepts COORDINATION", () => {
    expect(isValidFailureType("COORDINATION")).toBe(true);
  });

  it("accepts OUTPUT", () => {
    expect(isValidFailureType("OUTPUT")).toBe(true);
  });

  it("rejects an unknown failure type", () => {
    expect(isValidFailureType("UNKNOWN")).toBe(false);
  });

  it("rejects undefined", () => {
    expect(isValidFailureType(undefined)).toBe(false);
  });
});

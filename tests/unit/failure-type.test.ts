import { describe, expect, it } from "vitest";
import { isValidFailureType } from "@/core/triage/classifyFailure";

describe("Failure type validation", () => {
  it.each(["SPECIFICATION", "COORDINATION", "OUTPUT"])(
    "accepts the valid failure type %s",
    (value) => {
      expect(isValidFailureType(value)).toBe(true);
    },
  );

  it.each(["UNKNOWN", "", null, undefined, 123])(
    "rejects the invalid failure type %s",
    (value) => {
      expect(isValidFailureType(value)).toBe(false);
    },
  );
});

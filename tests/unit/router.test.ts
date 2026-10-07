import { describe, expect, it } from "vitest";
import { routeFailure } from "@/core/router/router";

describe("router", () => {
  it("routes specification failures", () => {
    expect(routeFailure("SPECIFICATION")).toBe("SPECIFICATION");
  });

  it("routes coordination failures", () => {
    expect(routeFailure("COORDINATION")).toBe("COORDINATION");
  });

  it("routes output failures", () => {
    expect(routeFailure("OUTPUT")).toBe("OUTPUT");
  });
});
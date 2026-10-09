
import { beforeEach, describe, expect, it, vi } from "vitest";

const { queryMock } = vi.hoisted(() => ({
  queryMock: vi.fn(),
}));

vi.mock("@/lib/db/client", () => ({
  db: {
    query: queryMock,
  },
}));

import { createRun, getRunById } from "@/lib/db/runRepository";

describe("run repository", () => {
  beforeEach(() => {
    queryMock.mockReset();
  });

  it.each(["A", "B", "C"] as const)(
    "creates a run using strategy %s",
    async (strategy) => {
      queryMock.mockResolvedValueOnce({
        rows: [
          {
            id: "run-123",
            task_id: "task-123",
            strategy,
            created_at: new Date(),
          },
        ],
      });

      const run = await createRun("task-123", strategy);

      expect(run.strategy).toBe(strategy);
      expect(queryMock).toHaveBeenCalledOnce();
      expect(queryMock.mock.calls[0][1]).toEqual([
        "task-123",
        strategy,
      ]);
    }
  );

  it("returns a run when found", async () => {
    queryMock.mockResolvedValueOnce({
      rows: [
        {
          id: "run-123",
          task_id: "task-123",
          strategy: "A",
          created_at: new Date(),
        },
      ],
    });

    const run = await getRunById("run-123");

    expect(run?.id).toBe("run-123");
  });

  it("returns null when the run does not exist", async () => {
    queryMock.mockResolvedValueOnce({ rows: [] });

    await expect(getRunById("missing-id")).resolves.toBeNull();
  });
});

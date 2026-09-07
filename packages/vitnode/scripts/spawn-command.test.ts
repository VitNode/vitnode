import { beforeEach, describe, expect, it, vi } from "vitest";

const { spawn } = vi.hoisted(() => ({
  spawn: vi.fn(),
}));

vi.mock("node:child_process", () => ({
  default: { spawn },
  spawn,
}));

import { spawnCommand } from "./spawn-command";

const withPlatform = (platform: NodeJS.Platform, run: () => void) => {
  const original = Object.getOwnPropertyDescriptor(process, "platform");
  Object.defineProperty(process, "platform", { value: platform });
  try {
    run();
  } finally {
    if (original) {
      Object.defineProperty(process, "platform", original);
    }
  }
};

describe("spawnCommand", () => {
  beforeEach(() => {
    spawn.mockReset();
  });

  it("runs the command directly off Windows", () => {
    withPlatform("darwin", () => {
      spawnCommand("pnpm", ["install", "--offline"], { stdio: "pipe" });
    });

    expect(spawn).toHaveBeenCalledWith(
      "pnpm",
      ["install", "--offline"],
      expect.objectContaining({ stdio: "pipe" }),
    );
  });

  it("reaches Windows .cmd shims through cmd.exe with the arguments intact", () => {
    withPlatform("win32", () => {
      spawnCommand("pnpm", ["install", "--offline"]);
    });

    expect(spawn).toHaveBeenCalledWith(
      "cmd.exe",
      ["/c", "pnpm", "install", "--offline"],
      expect.any(Object),
    );
  });

  it("never asks for a shell, on either platform", () => {
    withPlatform("darwin", () => spawnCommand("tsc", ["-w"]));
    withPlatform("win32", () => spawnCommand("tsc", ["-w"]));

    for (const call of spawn.mock.calls) {
      expect(call[2]).toMatchObject({ shell: false });
    }
  });

  it("cannot have a shell forced back on by a caller", () => {
    withPlatform("darwin", () => {
      spawnCommand("tsc", ["-w"], {
        shell: true,
      } as Parameters<typeof spawnCommand>[2]);
    });

    expect(spawn).toHaveBeenCalledWith(
      "tsc",
      ["-w"],
      expect.objectContaining({ shell: false }),
    );
  });
});

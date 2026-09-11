import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { initGitRepository } from "./init-git.js";

const git = (args: string[], cwd: string): string =>
  execFileSync("git", args, { cwd, encoding: "utf8" }).trim();

describe("initGitRepository", () => {
  let root = "";

  beforeEach(async () => {
    root = await mkdtemp(join(tmpdir(), "create-vitnode-git-"));
    await writeFile(join(root, "package.json"), "{}\n");
    process.env.GIT_AUTHOR_NAME = "VitNode";
    process.env.GIT_AUTHOR_EMAIL = "test@vitnode.com";
    process.env.GIT_COMMITTER_NAME = "VitNode";
    process.env.GIT_COMMITTER_EMAIL = "test@vitnode.com";
  });

  afterEach(async () => {
    await rm(root, { force: true, recursive: true });
  });

  it("creates a repository on the main branch with an initial commit", async () => {
    await expect(initGitRepository({ root })).resolves.toBe("created");

    expect(existsSync(join(root, ".git"))).toBe(true);
    expect(git(["rev-parse", "--abbrev-ref", "HEAD"], root)).toBe("main");
    expect(git(["rev-list", "--count", "HEAD"], root)).toBe("1");
    expect(git(["show", "--name-only", "--format=", "HEAD"], root)).toContain(
      "package.json",
    );
  });

  it("honours a custom branch name", async () => {
    await expect(initGitRepository({ root, branch: "trunk" })).resolves.toBe(
      "created",
    );

    expect(git(["rev-parse", "--abbrev-ref", "HEAD"], root)).toBe("trunk");
  });

  it("leaves an existing repository alone", async () => {
    git(["init"], root);

    await expect(initGitRepository({ root })).resolves.toBe(
      "already-in-repository",
    );
    expect(git(["rev-list", "--count", "--all"], root)).toBe("0");
  });
});

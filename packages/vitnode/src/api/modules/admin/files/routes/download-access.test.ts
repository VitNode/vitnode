// @vitest-environment node
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import { downloadUserFileRoute } from "../../../users/files/routes/download.route";
import { downloadFileAdminRoute } from "./download.route";

const here = dirname(fileURLToPath(import.meta.url));

const USER_ROUTE = join(here, "../../../users/files/routes/download.route.ts");
const ADMIN_ROUTE = join(here, "download.route.ts");

const sourceOf = (path: string): string => readFileSync(path, "utf8");

/**
 * Who may download which file is the one thing the shared streaming helper is
 * not allowed to have absorbed. Each route still asks its own question.
 */
describe("the download routes' access semantics", () => {
  it("scopes the user's own download to the rows they own", () => {
    expect(sourceOf(USER_ROUTE)).toContain("eq(core_files.userId, user.id)");
  });

  it("refuses the user's download without a session", () => {
    expect(sourceOf(USER_ROUTE)).toContain("new HTTPException(401");
    expect(downloadUserFileRoute.route.responses).toHaveProperty("401");
  });

  it("lets an admin reach any row, behind a staff permission", () => {
    const source = sourceOf(ADMIN_ROUTE);

    expect(source).toContain("eq(core_files.id, fileId)");
    expect(source).not.toContain("core_files.userId");
    expect(source).toContain(
      'adminStaffPermission: { module: "files", permission: "can_download" }',
    );
  });

  it("keeps the admin route out of the anonymous case entirely", () => {
    // No `401` to declare: the staff-permission middleware answers first.
    expect(downloadFileAdminRoute.route.responses).not.toHaveProperty("401");
  });
});

describe("the 404 both routes answer", () => {
  it.each([
    ["the user's own", downloadUserFileRoute],
    ["the admin's", downloadFileAdminRoute],
  ])("is still %s `{ error }` body", (_name, built) => {
    const notFound = built.route.responses[404];

    expect(notFound.description).toBe("File not found");
    expect(
      notFound.content["application/json"].schema.parse({
        error: "File not found",
      }),
    ).toEqual({ error: "File not found" });
  });

  it.each([
    ["the user's own", USER_ROUTE],
    ["the admin's", ADMIN_ROUTE],
  ])("is what %s route falls back to when nothing streamed", (_name, path) => {
    const source = sourceOf(path);

    expect(source).toContain("(await attachStoredFile(c, file)) ??");
    expect(source).toContain('c.json({ error: "File not found" }, 404)');
  });
});

describe("the streaming itself", () => {
  it.each([
    ["the user's own", USER_ROUTE],
    ["the admin's", ADMIN_ROUTE],
  ])("is the shared helper in %s route, not a copy", (_name, path) => {
    const source = sourceOf(path);

    expect(source).toContain(
      'import { attachStoredFile } from "@/api/lib/file-download";',
    );
    // The duplication this removed: the fetch, the two headers and the
    // re-streamed body, written out twice.
    expect(source).not.toContain("Content-Disposition");
    expect(source).not.toContain("content-length");
    expect(source).not.toContain("c.body(");
  });
});

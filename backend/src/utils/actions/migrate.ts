import { createHash } from "crypto";
import * as fs from "fs";

import { sql } from "drizzle-orm";
import { MigrationMeta } from "drizzle-orm/migrator";

import { ABSOLUTE_PATHS } from "@/config";
import { db } from "@/database/client";

// Source: https://github.com/drizzle-team/drizzle-orm/blob/main/drizzle-orm/src/migrator.ts
const readMigrationFiles = (): MigrationMeta[] => {
  const migrationFolderTo = ABSOLUTE_PATHS.plugin({ code: "forum" }).database
    .migrations;
  const journalPath = `${migrationFolderTo}/meta/_journal.json`;
  if (!fs.existsSync(journalPath)) {
    throw new Error(`Can't find meta/_journal.json file`);
  }
  const journalAsString = fs
    .readFileSync(`${migrationFolderTo}/meta/_journal.json`)
    .toString();

  const journal = JSON.parse(journalAsString) as {
    entries: { breakpoints: boolean; idx: number; tag: string; when: number }[];
  };
  const migrationQueries: MigrationMeta[] = [];

  for (const journalEntry of journal.entries) {
    const migrationPath = `${migrationFolderTo}/${journalEntry.tag}.sql`;

    try {
      const query = fs
        .readFileSync(`${migrationFolderTo}/${journalEntry.tag}.sql`)
        .toString();

      const result = query.split("--> statement-breakpoint").map(it => {
        return it;
      });

      migrationQueries.push({
        sql: result,
        bps: journalEntry.breakpoints,
        folderMillis: journalEntry.when,
        hash: createHash("sha256").update(query).digest("hex")
      });
    } catch {
      throw new Error(
        `No file ${migrationPath} found in ${migrationFolderTo} folder`
      );
    }
  }

  return migrationQueries;
};

// Source: https://github.com/drizzle-team/drizzle-orm/blob/main/drizzle-orm/src/pg-core/dialect.ts
(async () => {
  const migrationsTable = "core_migrations";
  const migrationsSchema = "public";

  // Create the migration table
  await db.execute(
    sql`CREATE SCHEMA IF NOT EXISTS ${sql.identifier(migrationsSchema)}`
  );
  await db.execute(sql`
  CREATE TABLE IF NOT EXISTS ${sql.identifier(migrationsSchema)}.${sql.identifier(migrationsTable)} (
    id SERIAL PRIMARY KEY,
    hash text NOT NULL,
    created_at bigint
  )`);

  const migrations = readMigrationFiles();

  // TODO: Add handle for core_migrations

  await db.transaction(async tx => {
    for await (const migration of migrations) {
      // Execute the migration
      for (const stmt of migration.sql) {
        await tx.execute(sql.raw(stmt));
      }

      // Insert the migration into the migrations table
      await tx.execute(
        sql`insert into ${sql.identifier(migrationsSchema)}.${sql.identifier(
          migrationsTable
        )} ("hash", "created_at") values(${migration.hash}, ${migration.folderMillis})`
      );
    }
  });
})();

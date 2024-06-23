import * as fs from "fs";

import { execShellCommand } from "../src";

export const generateDatabaseMigrations = async ({
  pluginsPath,
}: {
  pluginsPath: string;
}) => {
  await Promise.all(
    fs
      .readdirSync(pluginsPath)
      .filter(plugin => plugin !== "plugins.module.ts")
      .map(async plugin => {
        await execShellCommand(
          `npx drizzle-kit up --config src/plugins/${plugin}/admin/database/drizzle.config.ts && npx drizzle-kit generate --config src/plugins/${plugin}/admin/database/drizzle.config.ts`,
        );
      }),
  );
};

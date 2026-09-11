import type { Plugin } from "vite";

import { rootConfigPathFor } from "./config-path";

const ERROR_PREFIX = "[VitNode client guard]";

const CLIENT_ENVIRONMENT = "client";

const normalize = (path: string): string => path.replaceAll("\\", "/");

export const DEFAULT_FORBIDDEN_CLIENT_MODULES: readonly RegExp[] = [
  /\/vitnode\.api\.config\.[cm]?[jt]sx?(?:\?|$)/,
  /\/vitnode\.server\.config\.[cm]?[jt]sx?(?:\?|$)/,
  /\/config\.api\.[cm]?[jt]sx?(?:\?|$)/,
  /\/@vitnode\/core\/(?:dist\/src|src)\/config\/server\.[jt]s(?:\?|$)/,
  /\/@vitnode\/core\/(?:dist\/src|src)\/api\/config\.[jt]s(?:\?|$)/,
  /\/node_modules\/drizzle-orm\//,
  /\/node_modules\/postgres\//,
  /\/node_modules\/@redis\//,
  /\/node_modules\/redis\//,
  /\/node_modules\/@vitnode\/(?:supabase-storage|s3|nodemailer|resend|node-cron|elasticsearch)\//,
];

const SECRET_ENV_KEY_PATTERN =
  /(?:SECRET|PASSWORD|PASSWD|API_KEY|APIKEY|TOKEN|PRIVATE_KEY|DATABASE_URL|POSTGRES_URL|REDIS_URL|CONNECTION_STRING)/i;

const MIN_SECRET_LENGTH = 8;

const LOCAL_HOST_PATTERN =
  /localhost|127\.0\.0\.1|0\.0\.0\.0|host\.docker\.internal|\[::1\]/i;

export interface VitNodeClientGuardOptions {
  appRoot: string;
  configPath?: string;
  env?: Readonly<Record<string, string | undefined>>;
  forbiddenModules?: readonly RegExp[];
  ignoreEnvKeys?: readonly string[];
}

export const secretValuesOf = (
  env: Readonly<Record<string, string | undefined>>,
  ignoreKeys: readonly string[] = [],
): { key: string; value: string }[] => {
  const ignored = new Set(ignoreKeys);

  return Object.entries(env).flatMap(([key, value]) =>
    SECRET_ENV_KEY_PATTERN.test(key) &&
    !ignored.has(key) &&
    typeof value === "string" &&
    value.length >= MIN_SECRET_LENGTH &&
    !LOCAL_HOST_PATTERN.test(value)
      ? [{ key, value }]
      : [],
  );
};

const isRootConfig = (id: string, configPath: string): boolean =>
  normalize(id).split("?")[0] === normalize(configPath);

export interface ClientChunkLike {
  code?: string;
  fileName: string;
  moduleIds?: readonly string[];
  modules?: Record<string, unknown>;
  type: "asset" | "chunk";
}

export const findClientLeaks = (
  chunks: readonly ClientChunkLike[],
  {
    configPath,
    forbiddenModules = DEFAULT_FORBIDDEN_CLIENT_MODULES,
    secrets = [],
  }: {
    configPath: string;
    forbiddenModules?: readonly RegExp[];
    secrets?: readonly { key: string; value: string }[];
  },
): string[] => {
  const problems: string[] = [];

  for (const chunk of chunks) {
    if (chunk.type !== "chunk") continue;

    const moduleIds = chunk.moduleIds ?? Object.keys(chunk.modules ?? {});

    for (const id of moduleIds) {
      const normalized = normalize(id);

      if (isRootConfig(id, configPath)) {
        problems.push(
          `${chunk.fileName} bundles the root config ${normalized}. Browser code has to import the generated \`src/vitnode.public.gen.ts\` instead.`,
        );
        continue;
      }

      const pattern = forbiddenModules.find(candidate =>
        candidate.test(normalized),
      );

      if (pattern) {
        problems.push(
          `${chunk.fileName} bundles the server-only module ${normalized} (matched ${String(pattern)}).`,
        );
      }
    }

    const code = chunk.code ?? "";

    for (const { key, value } of secrets) {
      if (code.includes(value)) {
        problems.push(
          `${chunk.fileName} contains the value of the ${key} environment variable.`,
        );
      }
    }
  }

  return problems;
};

export const vitNodeClientGuard = ({
  appRoot,
  configPath = rootConfigPathFor(appRoot),
  env,
  forbiddenModules = DEFAULT_FORBIDDEN_CLIENT_MODULES,
  ignoreEnvKeys = [],
}: VitNodeClientGuardOptions): Plugin => ({
  enforce: "pre",

  generateBundle(_options, bundle) {
    if (this.environment.name !== CLIENT_ENVIRONMENT) return;

    const problems = findClientLeaks(Object.values(bundle), {
      configPath,
      forbiddenModules,
      secrets: secretValuesOf(env ?? process.env, ignoreEnvKeys),
    });

    if (problems.length === 0) return;

    throw new Error(
      `${ERROR_PREFIX} The browser bundle would ship server-only code:\n${problems.map(problem => `  - ${problem}`).join("\n")}`,
    );
  },
  name: "vitnode:client-guard",

  async resolveId(source, importer) {
    if (this.environment.name !== CLIENT_ENVIRONMENT) return null;
    if (importer === undefined) return null;

    const resolved = await this.resolve(source, importer, { skipSelf: true });

    if (resolved === null || !isRootConfig(resolved.id, configPath))
      return null;

    throw new Error(
      `${ERROR_PREFIX} ${normalize(importer)} imports the root config (${normalize(configPath)}) into the browser bundle. The root config may hold a database provider, secrets and server-only plugin capabilities, so it is build- and server-only. Import the generated \`src/vitnode.public.gen.ts\` instead.`,
    );
  },
});

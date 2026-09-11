import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { describe, expect, it } from "vitest";

const packageRoot = resolve(import.meta.dirname, "../..");
const appTemplate = join(packageRoot, "copy-of-vitnode-app");
const pluginTemplate = join(packageRoot, "copy-of-vitnode-plugin");

const SKIP = new Set([".git", "dist", "node_modules"]);

/** Every file in a template, as paths relative to the template root. */
const filesUnder = (directory: string): string[] => {
  if (!existsSync(directory)) return [];

  const walk = (current: string): string[] =>
    readdirSync(current).flatMap(name => {
      if (SKIP.has(name)) return [];

      const path = join(current, name);

      return statSync(path).isDirectory()
        ? walk(path)
        : [relative(directory, path).replaceAll("\\", "/")];
    });

  return walk(directory).sort();
};

const appFiles = filesUnder(appTemplate);
const pluginFiles = filesUnder(pluginTemplate);
const allFiles = [...appFiles, ...pluginFiles];

const read = (root: string, file: string): string =>
  readFileSync(join(root, file), "utf8");

const withoutComments = (source: string): string =>
  source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");

describe("the generated application", () => {
  it("is a TanStack Start application", () => {
    expect(appFiles).toContain("root/vite.config.ts");
    expect(appFiles).toContain("root/tsr.config.json");
    expect(appFiles).toContain("root/src/router.tsx");
    expect(appFiles).toContain("root/src/start.ts");
    expect(appFiles).toContain("root/src/routes/__root.tsx");
  });

  it("mounts the API through a server route, not a Route Handler", () => {
    expect(appFiles).toContain("api-single-app/src/routes/api/$.ts");
    expect(read(appTemplate, "api-single-app/src/routes/api/$.ts")).toContain(
      "createFileRoute('/api/$')",
    );
  });
});

describe("the single-app template's two trees", () => {
  const overlayFiles = filesUnder(join(appTemplate, "api-single-app"));
  const rootFiles = filesUnder(join(appTemplate, "root"));

  it("share no path at all", () => {
    expect(overlayFiles.filter(file => rootFiles.includes(file))).toEqual([]);
  });

  it("keeps only API-specific files and the authored config in the overlay", () => {
    expect(overlayFiles.length).toBeGreaterThan(0);
    for (const file of overlayFiles) {
      expect(file).toMatch(
        /^(?:drizzle\.config\.ts|src\/(?:routes\/api\/|server\/|vitnode\.config\.ts))/,
      );
    }
  });

  /** No generic host file, by name - the two that were actually there. */
  it.each([".gitignore_template", ".env.example", "global.d.ts"])(
    "does not duplicate %s",
    file => {
      expect(existsSync(join(appTemplate, "api-single-app", file))).toBe(false);
      expect(existsSync(join(appTemplate, "root", file))).toBe(true);
    },
  );

  it("is copied base-then-overlay, sequentially", () => {
    const code = withoutComments(
      read(join(packageRoot, "src"), "create/create-vitnode.ts"),
    );
    const singleApp = code.slice(
      code.indexOf('if (mode === "singleApp")'),
      code.indexOf('} else if (mode === "apiMonorepo")'),
    );

    expect(singleApp).toContain('await cp(join(templatePath, "root")');
    expect(singleApp).toContain(
      'await cp(join(templatePath, "api-single-app")',
    );
    expect(singleApp.indexOf('"root"')).toBeLessThan(
      singleApp.indexOf('"api-single-app"'),
    );
    // The race itself: two trees into one directory, concurrently.
    expect(singleApp).not.toContain("Promise.all");
  });
});

describe("what a generated single app starts from", () => {
  const gitignore = read(appTemplate, "root/.gitignore_template");
  const env = read(appTemplate, "root/.env.example");

  /** The directories a TanStack Start build actually writes. */
  it.each(["/.output/", "/.nitro/", "/.vite/", "/.tanstack/", "src/*.gen.ts"])(
    "ignores %s",
    entry => {
      expect(gitignore).toContain(entry);
    },
  );

  /**
   * And nothing from a build this scaffold never runs. A fresh scaffold has no
   * migration to explain, so these do not belong even as a comment.
   */
  it.each([".contentlayer", ".content-collections"])(
    "does not mention %s",
    entry => {
      expect(gitignore).not.toContain(entry);
    },
  );

  it("ships the single-app environment", () => {
    expect(env).toContain("POSTGRES_URL=");
    expect(env).toContain("VITNODE_WEB_URL=http://localhost:3000");
    expect(env).toContain("CRON_SECRET=");
  });

  it("names no API server for an app that serves its own", () => {
    expect(env).not.toMatch(/^VITNODE_API_URL=/m);
  });

  it("points a split web app at the API's own port", () => {
    expect(read(appTemplate, "monorepo/apps/web/.env.example")).toContain(
      "VITNODE_API_URL=http://localhost:8000",
    );
    expect(read(appTemplate, "api-bun/src/index.ts")).toContain("port: 8000");
  });

  /**
   * One authored config per app shape. The web-only overlay and the single-app
   * overlay each ship their own `vitnode.config.ts`; the shared `root` tree
   * ships none, so the two shapes cannot disagree about which file is authored.
   */
  it("authors exactly one vitnode.config.ts per app shape", () => {
    expect(appFiles).not.toContain("root/src/vitnode.config.ts");
    expect(appFiles).toContain("api-single-app/src/vitnode.config.ts");
    expect(appFiles).toContain("web-only/src/vitnode.config.ts");
    expect(appFiles).toContain("api/src/vitnode.config.ts");

    expect(
      allFiles.filter(file =>
        /vitnode\.(?:api|server|shell)\.config\.ts$/.test(file),
      ),
    ).toEqual([]);
    expect(allFiles.filter(file => /(^|\/)src\/i18n\.ts$/.test(file))).toEqual(
      [],
    );
  });

  const CONFIGS = {
    api: "api/src/vitnode.config.ts",
    single: "api-single-app/src/vitnode.config.ts",
    web: "web-only/src/vitnode.config.ts",
  } as const;

  it.each(Object.values(CONFIGS))("%s is a unified default export", file => {
    const config = withoutComments(read(appTemplate, file));

    expect(config).toContain("@vitnode/core/config");
    expect(config).toMatch(/export default defineVitNodeConfig\(\{/);
    expect(config).toMatch(/defaultLocale:\s*"en"/);
    expect(config).toMatch(/locales:\s*\[/);
    expect(config).toMatch(/timeZone:\s*"/);
    expect(config).not.toContain("buildConfig");
    expect(config).not.toContain("buildApiConfig");
    expect(config).not.toContain("buildServerConfig");
  });

  it("declares the runtimes each shape actually runs", () => {
    const single = withoutComments(read(appTemplate, CONFIGS.single));
    const web = withoutComments(read(appTemplate, CONFIGS.web));
    const api = withoutComments(read(appTemplate, CONFIGS.api));

    expect(single).toMatch(/api:\s*defineApiRuntime\(/);
    expect(single).toMatch(/web:\s*defineWebRuntime\(/);

    expect(web).toMatch(/web:\s*defineWebRuntime\(/);
    expect(web).not.toContain("defineApiRuntime");
    expect(web).not.toContain("drizzle");

    expect(api).toMatch(/api:\s*defineApiRuntime\(/);
    expect(api).not.toContain("defineWebRuntime");
    expect(api).not.toContain("@tanstack/");
  });

  /**
   * Importing a driver is free; constructing a client is not. `drizzle(...)`
   * and every adapter call live inside the `api` factory, so evaluating the
   * file - which Vite does on every regeneration pass - connects to nothing.
   */
  it("constructs server dependencies inside the api runtime, never at config evaluation", () => {
    for (const file of [CONFIGS.single, CONFIGS.api]) {
      const config = withoutComments(read(appTemplate, file));
      const factoryStart = config.indexOf("defineApiRuntime(");

      expect(factoryStart).toBeGreaterThan(-1);
      expect(config.indexOf("drizzle(")).toBeGreaterThan(factoryStart);
      expect(config.indexOf("loadEnv(")).toBeGreaterThan(factoryStart);
      expect(config).not.toMatch(/^(?:const|let|var) .*drizzle\(/m);
      expect(config).toMatch(/env\.POSTGRES_URL/);
      expect(config).not.toContain("process.env");
    }
  });

  it("registers the app's message loaders through the web runtime", () => {
    for (const file of [CONFIGS.single, CONFIGS.web]) {
      const config = withoutComments(read(appTemplate, file));
      const serverStart = config.indexOf("server:");

      expect(config).toContain('from "./locales/app"');
      expect(config).toContain('from "./locales/packages"');
      expect(serverStart).toBeGreaterThan(-1);
      expect(config.indexOf("messages: appMessages")).toBeGreaterThan(
        serverStart,
      );
      expect(config.lastIndexOf("packageMessages")).toBeGreaterThan(
        serverStart,
      );
    }
  });

  /**
   * Browser code reads the generated projection. The root config is imported
   * only by server modules, and the Vite client guard fails a build that does
   * otherwise - so the templates have to be on the right side of it.
   */
  it("keeps the root config out of every browser-reachable file", () => {
    const browserFiles = [
      "root/src/start.ts",
      "root/src/routes/__root.tsx",
      "root/src/lib/page-head.ts",
      "root/src/lib/i18n/runtime.ts",
      "root/src/lib/i18n/shared.ts",
      "root/src/router.tsx",
    ];

    for (const file of browserFiles) {
      const code = withoutComments(read(appTemplate, file));

      expect(code).not.toContain("@/vitnode.config");
    }

    for (const file of [
      "root/src/start.ts",
      "root/src/routes/__root.tsx",
      "root/src/lib/page-head.ts",
      "root/src/lib/i18n/runtime.ts",
    ]) {
      expect(withoutComments(read(appTemplate, file))).toContain(
        "@/vitnode.public.gen",
      );
    }
  });

  it("hands the root config only to server modules", () => {
    expect(
      withoutComments(read(appTemplate, "root/src/server/messages.server.ts")),
    ).toContain('import vitNodeConfig from "@/vitnode.config"');
    expect(
      withoutComments(
        read(appTemplate, "api-single-app/src/server/vitnode-api.server.ts"),
      ),
    ).toContain("resolveApiConfig(vitNodeConfig)");
    expect(withoutComments(read(appTemplate, "api/src/index.ts"))).toContain(
      "resolveApiConfig(vitNodeConfig",
    );
    expect(
      withoutComments(read(appTemplate, "api-bun/src/index.ts")),
    ).toContain("resolveApiConfig(vitNodeConfig");
  });

  it("points drizzle-kit at the unified config", () => {
    for (const file of [
      "api/drizzle.config.ts",
      "api-single-app/drizzle.config.ts",
    ]) {
      const drizzle = withoutComments(read(appTemplate, file));

      expect(drizzle).toMatch(/config:\s*vitNodeConfig/);
      expect(drizzle).not.toContain("vitNodeApiConfig");
      expect(drizzle).not.toContain("POSTGRES_URL");
    }
  });

  it("copies the web-only overlay onto the monorepo web app", () => {
    const code = withoutComments(
      read(join(packageRoot, "src"), "create/create-vitnode.ts"),
    );
    const monorepo = code.slice(
      code.indexOf('} else if (mode === "apiMonorepo")'),
      code.indexOf('} else if (mode === "onlyApi")'),
    );

    expect(monorepo).toContain('cp(join(templatePath, "web-only")');
    expect(monorepo.indexOf('"root"')).toBeLessThan(
      monorepo.indexOf('"web-only"'),
    );
  });
});

describe("what a generated application does to every request", () => {
  const start = withoutComments(read(appTemplate, "root/src/start.ts"));

  it("builds its Start instance through the Core factory", () => {
    expect(start).toContain(
      'import { createVitNodeStart } from "@vitnode/core/tanstack/start"',
    );
    expect(start).toMatch(
      /export const startInstance = createVitNodeStart\(\{\s*config: vitNodePublicConfig,?\s*\}\)/,
    );
  });

  it("hand-rolls none of the pipeline the factory owns", () => {
    for (const primitive of [
      "createStart",
      "createMiddleware",
      "createCsrfMiddleware",
      "handleLocaleRequest",
      "localeRouting",
    ]) {
      expect(start).not.toContain(primitive);
    }

    // The header rule moved into Core with the middleware that applies it.
    expect(
      allFiles.filter(file => file.endsWith("lib/document-headers.ts")),
    ).toEqual([]);
  });

  /**
   * One VitNode plugin in the Vite config, for the same reason: four calls in
   * a fixed order is four things to copy wrong.
   */
  it("configures Vite through one VitNode plugin", () => {
    const vite = withoutComments(read(appTemplate, "root/vite.config.ts"));

    expect(vite).toContain(
      'import { vitnode } from "@vitnode/core/framework/vite"',
    );
    expect(vite).toMatch(/vitnode\(\{ appRoot: import\.meta\.dirname \}\)/);
    for (const removed of [
      "vitNodeEnv",
      "vitNodeOptimizeDeps",
      "vitNodePluginRoutes",
    ]) {
      expect(vite).not.toContain(removed);
    }
  });

  it("leaves the SSR externals to that plugin", () => {
    const vite = withoutComments(read(appTemplate, "root/vite.config.ts"));

    expect(vite).not.toMatch(/ssr\s*:/);
    expect(vite).not.toContain('external: ["@vitnode/core"');
  });
});

describe("what a generated application shows during a slow navigation", () => {
  const router = withoutComments(read(appTemplate, "root/src/router.tsx"));

  it("imports the shared loader through the narrow package entry", () => {
    expect(router).toContain(
      'import { RoutePendingSpinner } from "@vitnode/core/tanstack/pending"',
    );
  });

  it("hands it to the router as the default pending component", () => {
    expect(router).toMatch(/defaultPendingComponent:\s*RoutePendingSpinner\b/);
  });

  it("declares how long a navigation may take before it appears", () => {
    expect(router).toMatch(/defaultPendingMs:\s*150\b/);
  });

  it("keeps it up for at least 300ms once it is showing", () => {
    expect(router).toMatch(/defaultPendingMinMs:\s*300\b/);
  });

  it("blocks on a stale reload, so a preloaded link still shows one", () => {
    expect(router).toMatch(/defaultStaleReloadMode:\s*["']blocking["']/);
  });

  it("reaches it through no barrel a client entry would then have to download", () => {
    const heavy = [
      "@vitnode/core/tanstack/admin",
      "@vitnode/core/tanstack/layout",
      "@vitnode/core/tanstack/settings",
      "@vitnode/core/content",
    ];

    expect(heavy.filter(entry => router.includes(`"${entry}"`))).toEqual([]);
  });
});

describe("the generated plugin", () => {
  /**
   * A plugin declares its routes; it does not ship a directory of pages for
   * something else to copy.
   */
  it("scaffolds a route tree rather than route directories", async () => {
    const { pluginRouteScaffold } =
      await import("../plugin/create/route-templates.js");
    const scaffold = pluginRouteScaffold("@acme/blog");

    expect(Object.keys(scaffold)).toContain("src/routes.ts");
    expect(scaffold["src/routes.ts"]).toContain("definePluginRoutes");

    for (const legacy of ["main", "admin", "blank", "breadcrumb"]) {
      expect(Object.keys(scaffold)).not.toContain(
        `src/routes/${legacy}/page.tsx`,
      );
    }
  });

  it("declares no host framework dependency of its own", () => {
    // A plugin is compiled into its own `dist` and imported by whichever app
    // installed it, so a router in its dependencies is one every installing app
    // inherits. `use-intl` is the framework-neutral translator it renders
    // through, and is the only i18n dependency it may declare.
    const builder = withoutComments(
      read(join(packageRoot, "src"), "plugin/create/create-package-json.ts"),
    );
    const dependencies = builder.slice(
      builder.indexOf("dependencies: {"),
      builder.indexOf("devDependencies: {"),
    );

    expect(dependencies).toContain('"use-intl": versionsPackageJson.useIntl');
    expect(dependencies).not.toContain("@tanstack/");
  });
});

describe("the generator's own wiring", () => {
  /**
   * `vitnode prepare-plugins` and `vitnode plugin --w` were the route copier's
   * two entry points, and the generator ran the first one in every app it
   * created. Both commands are gone from the CLI, so invoking one now prints
   * "Command not found" and exits 1 - a generated project that still called it
   * would fail on its first `dev`.
   */
  it("runs no route copier command after creating a project", () => {
    const offenders = filesUnder(join(packageRoot, "src"))
      .filter(file => file.endsWith(".ts") && !file.endsWith(".test.ts"))
      .filter(file => {
        const code = withoutComments(read(join(packageRoot, "src"), file));

        return (
          code.includes("prepare-plugins") || code.includes("initFilesVitnode")
        );
      });

    expect(offenders).toEqual([]);
  });

  it("spawns package managers without a shell, as DEP0190 requires", () => {
    const offenders = filesUnder(join(packageRoot, "src"))
      .filter(file => file.endsWith(".ts") && !file.endsWith(".test.ts"))
      .filter(file => {
        const code = withoutComments(read(join(packageRoot, "src"), file));

        return /shell:(?!\s*false)/.test(code);
      });

    expect(offenders).toEqual([]);
  });
});

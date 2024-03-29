import { join } from "path";

export const pluginPaths = ({ code }: { code: string }) => {
  const backend_root = join(process.cwd(), "plugins", code);
  const frontend_root = join(process.cwd(), "..", "frontend");

  return {
    backend: {
      root: backend_root,
      database_schema: join(backend_root, "admin", "database", "schema"),
      database_migration: join(backend_root, "admin", "database", "migrations"),
      database_migration_info: join(
        backend_root,
        "admin",
        "database",
        "migrations",
        "meta",
        "_journal.json"
      ),
      versions: join(backend_root, "versions.json"),
      info: join(backend_root, "plugin.json")
    },
    frontend: {
      admin_pages: join(
        frontend_root,
        "app",
        "[locale]",
        "(apps)",
        "(admin)",
        "admin",
        "(auth)",
        code
      ),
      admin_templates: join(frontend_root, "admin", code),
      pages_container: join(
        frontend_root,
        "app",
        "[locale]",
        "(apps)",
        "(main)",
        "(container)",
        code
      ),
      default_page: join(
        frontend_root,
        "themes",
        "1",
        code,
        "default-page.tsx"
      ),
      pages: join(frontend_root, "app", "[locale]", "(apps)", "(main)", code),
      hooks: join(frontend_root, "hooks", code),
      templates: join(frontend_root, "themes", "1", code),
      graphql_queries: join(frontend_root, "graphql", "queries", code),
      graphql_mutations: join(frontend_root, "graphql", "mutations", code),
      language: join(frontend_root, "langs", "en", `${code}.json`)
    }
  };
};

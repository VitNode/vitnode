import * as fs from "fs";
import { join } from "path";

const internalPaths = {
  uploads: join(process.cwd(), "uploads"),
  frontend: join(process.cwd(), "..", "frontend"),
  plugins: join(process.cwd(), "src", "plugins")
};

export const ABSOLUTE_PATHS = {
  uploads: {
    init: internalPaths.uploads,
    public: join(internalPaths.uploads, "public"),
    private: join(internalPaths.uploads, "private"),
    temp: join(internalPaths.uploads, "temp")
  },
  frontend: {
    init: internalPaths.frontend
  },
  backend: join(process.cwd(), "src"),
  plugins: internalPaths.plugins,
  plugin: ({ code }: { code: string }) => ({
    root: join(internalPaths.plugins, code),
    config: join(internalPaths.plugins, code, "config.json"),
    versions: join(internalPaths.plugins, code, "versions.json"),
    database: {
      schema: join(internalPaths.plugins, code, "admin", "database", "schema"),
      migrations: join(
        internalPaths.plugins,
        code,
        "admin",
        "database",
        "migrations"
      ),
      migration_info: join(
        internalPaths.plugins,
        code,
        "admin",
        "database",
        "migrations",
        "meta",
        "_journal.json"
      )
    },
    frontend: {
      admin_pages: join(
        internalPaths.frontend,
        "app",
        "[locale]",
        "(admin)",
        "admin",
        "(auth)",
        code
      ),
      admin_templates: join(internalPaths.frontend, "plugins", code, "admin"),
      pages_container: join(
        internalPaths.frontend,
        "app",
        "[locale]",
        "(main)",
        "(container)",
        code
      ),
      default_page: join(
        internalPaths.frontend,
        "plugins",
        code,
        "templates",
        "default-page.tsx"
      ),
      pages: join(internalPaths.frontend, "app", "[locale]", "(main)", code),
      templates: join(internalPaths.frontend, "plugins", code, "templates"),
      plugin: join(internalPaths.frontend, "plugins", code),
      language: join(internalPaths.frontend, "plugins", code, "langs")
    }
  })
};

export interface ConfigType {
  editor: {
    files: {
      allow_type: "all" | "images_videos" | "images" | "none";
    };
    sticky: boolean;
  };
  langs: {
    code: string;
    default: boolean;
    enabled: boolean;
  }[];
  rebuild_required: {
    langs: boolean;
    plugins: boolean;
  };
  settings: {
    email: {
      color_primary: string;
      color_primary_foreground: string;
    };
    general: {
      site_name: string;
      site_short_name: string;
    };
  };
}

export const configPath = join(
  process.cwd(),
  "..",
  "frontend",
  "config",
  "config.json"
);

export const getConfigFile = () => {
  const file = fs.readFileSync(configPath, "utf-8");

  return JSON.parse(file) as ConfigType;
};

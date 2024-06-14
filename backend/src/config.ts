import * as fs from "fs";
import { join } from "path";

import { parseFrontendUrlFromEnv } from "./functions/envs";

export const configForAppModule = () => {
  const frontend_url = parseFrontendUrlFromEnv();

  const data = {
    login_token_secret: process.env.LOGIN_TOKEN_SECRET ?? "",
    frontend_url: frontend_url.url,
    port: parseInt(process.env.PORT, 10) || 8080,
    password_salt: 10,
    cookies: {
      domain:
        frontend_url.hostname === "localhost"
          ? "localhost"
          : frontend_url.hostname
              .replace(/:\d+$/, "")
              .split(".")
              .slice(-2)
              .join("."),
      login_token: {
        expiresIn: 3, // 3 days
        expiresInRemember: 90, // 90 days
        name: "vitnode-login-token",
        admin: {
          name: "vitnode-login-token-admin",
          expiresIn: 1 // 1 day
        }
      },
      known_device: {
        name: "vitnode-device",
        expiresIn: 365 // 1 year
      },
      theme_id: {
        name: "vitnode-theme-id",
        expiresIn: 365 // 1 year
      }
    }
  };

  if (!data.login_token_secret) {
    throw new Error("`LOGIN_TOKEN_SECRET` is not defined in .env file");
  }

  return data;
};

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
    init: internalPaths.frontend,
    themes: join(internalPaths.frontend, "themes"),
    theme: ({ theme_id }: { theme_id: number }) => ({
      root: join(internalPaths.frontend, "themes", theme_id.toString()),
      config: join(
        internalPaths.frontend,
        "themes",
        theme_id.toString(),
        "config.json"
      )
    })
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
        "themes",
        "1",
        code,
        "default-page.tsx"
      ),
      pages: join(internalPaths.frontend, "app", "[locale]", "(main)", code),
      templates: join(internalPaths.frontend, "themes", "1", code),
      plugin: join(internalPaths.frontend, "plugins", code),
      language: join(internalPaths.frontend, "plugins", code, "langs"),
      theme: ({ theme_id }: { theme_id: number }) =>
        join(internalPaths.frontend, "themes", theme_id.toString(), code)
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
    themes: boolean;
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

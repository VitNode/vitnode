import { promises } from "fs";
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
        expiresIn: 7, // 7 days
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
    throw new Error("Login token secret is not defined in .env file");
  }

  return data;
};

const internalPaths = {
  uploads: join(process.cwd(), "uploads"),
  frontend: join(process.cwd(), "..", "frontend")
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
    langs: join(internalPaths.frontend, "langs")
  }
};

export interface ConfigType {
  editor: {
    allow_head_h1: boolean;
    files: {
      allow_type: "all" | "images_videos" | "images" | "none";
    };
    sticky: boolean;
  };
  rebuild_required: {
    langs: boolean;
    plugins: boolean;
    themes: boolean;
  };
  settings: {
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

export const getConfigFile = async () => {
  const file = await promises.readFile(configPath, "utf8");

  return JSON.parse(file) as ConfigType;
};

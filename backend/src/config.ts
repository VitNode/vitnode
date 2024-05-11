import { join } from "path";

export const configForAppModule = () => {
  const data = {
    login_token_secret: process.env.LOGIN_TOKEN_SECRET ?? "",
    frontend_url: process.env.NEXT_PUBLIC_FRONTEND_URL
      ? `https://${process.env.NEXT_PUBLIC_FRONTEND_URL}`
      : "http://localhost:3000",
    port: parseInt(process.env.PORT, 10) || 8080,
    password_salt: 10,
    cookies: {
      domain: process.env.NEXT_PUBLIC_FRONTEND_URL
        ? process.env.NEXT_PUBLIC_FRONTEND_URL
        : "localhost",
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
  uploads: join(process.cwd(), "uploads")
};

export const ABSOLUTE_PATHS = {
  uploads: {
    init: internalPaths.uploads,
    public: join(internalPaths.uploads, "public"),
    private: join(internalPaths.uploads, "private"),
    temp: join(internalPaths.uploads, "temp")
  }
};

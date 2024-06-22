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

export const DEFAULT_CONFIG_DATA: ConfigType = {
  rebuild_required: {
    langs: false,
    plugins: false,
  },
  editor: {
    sticky: true,
    files: {
      allow_type: "all",
    },
  },
  settings: {
    general: {
      site_name: "VitNode Community",
      site_short_name: "VitNode",
    },
    email: {
      color_primary: "hsl(220, 74%, 50%)",
      color_primary_foreground: "hsl(210, 40%, 98%)",
    },
  },
  langs: [
    {
      code: "en",
      enabled: true,
      default: true,
    },
    {
      code: "pl",
      enabled: true,
      default: false,
    },
  ],
};

const ENVS = {
  graphql_url: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  backend_url: process.env.NEXT_PUBLIC_BACKEND_URL,
  frontend_url: process.env.NEXT_PUBLIC_FRONTEND_URL,
};

export const CONFIG = {
  graphql_url: ENVS.graphql_url ?? "http://localhost:8080",
  backend_url: ENVS.backend_url ?? "http://localhost:8080",
  frontend_url: ENVS.frontend_url ?? "http://localhost:3000",
  graphql_public_url: `${ENVS.graphql_url ?? "http://localhost:8080"}/public`,
  backend_public_url: `${ENVS.backend_url ?? "http://localhost:8080"}/public`,
  local_storage: {
    editor_skin_tone: "emoji:skin-tone",
  },
  node_development: process.env.NODE_ENV === "development",
};

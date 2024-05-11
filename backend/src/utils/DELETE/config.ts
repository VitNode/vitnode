const ENVS = {
  graphql_url: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  backend_url: process.env.NEXT_PUBLIC_BACKEND_URL,
  frontend_url: process.env.NEXT_PUBLIC_FRONTEND_URL
};

export const CONFIG = {
  graphql_url: ENVS.graphql_url ?? "http://localhost:8080",
  backend_url: ENVS.backend_url ?? "http://localhost:8080",
  frontend_url: ENVS.frontend_url ?? "http://localhost:3000",
  backend_public_url: `${ENVS.backend_url ?? "http://localhost:8080"}/public`,
  local_storage: {
    editor_skin_tone: "emoji:skin-tone"
  },
  node_development: process.env.NODE_ENV === "development"
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

export const DEFAULT_CONFIG_DATA: ConfigType = {
  rebuild_required: {
    themes: false,
    langs: false,
    plugins: false
  },
  editor: {
    sticky: true,
    allow_head_h1: false,
    files: {
      allow_type: "all"
    }
  },
  settings: {
    general: {
      site_name: "VitNode Community",
      site_short_name: "VitNode"
    }
  }
};

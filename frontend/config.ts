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

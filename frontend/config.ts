const ENVS = {
  graphql_url: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  backend_url: process.env.NEXT_PUBLIC_BACKEND_URL
};

export const CONFIG = {
  graphql_url: ENVS.graphql_url ?? "http://localhost:8080",
  editor: {
    skin_tone: "emoji:skin-tone"
  },
  backend_url: ENVS.backend_url ?? "http://localhost:8080"
};

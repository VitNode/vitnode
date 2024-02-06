const ENVS = {
  graphql_url: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  client_graphql_url: process.env.NEXT_PUBLIC_CLIENT_GRAPHQL_URL
};

export const CONFIG = {
  graphql_url: ENVS.graphql_url ?? "http://localhost:8080",
  client_graphql_url: ENVS.client_graphql_url ?? "http://localhost:8080",
  editor: {
    skin_tone: "emoji:skin-tone"
  }
};

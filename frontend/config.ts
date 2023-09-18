const ENVS = {
  graphql_url: process.env.NEXT_PUBLIC_GRAPHQL_URL
};

export const CONFIG = {
  default_theme: 'default',
  graphql_url: ENVS.graphql_url ? ENVS.graphql_url : 'http://[::1]:8080/graphql'
};

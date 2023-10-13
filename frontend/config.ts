const ENVS = {
  graphql_url: process.env.NEXT_PUBLIC_GRAPHQL_URL
};

export const CONFIG = {
  default_theme: 'default',
  graphql_url: ENVS.graphql_url ? ENVS.graphql_url : 'http://localhost:8080',
  refresh_token: 'vitnode-ref-auth',
  access_token: 'vitnode-acc-auth',
  admin: {
    refresh_token: 'vitnode-ref-auth-admin',
    access_token: 'vitnode-acc-auth-admin'
  }
};

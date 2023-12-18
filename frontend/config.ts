const ENVS = {
  graphql_url: process.env.NEXT_PUBLIC_GRAPHQL_URL
};

export const CONFIG = {
  default_theme: 'default',
  graphql_url: ENVS.graphql_url ? ENVS.graphql_url : 'http://localhost:8080',
  login_token: {
    expiresIn: 60 * 60 * 24, // 24 days
    expiresInRemember: 60 * 60 * 24 * 90, // 90 days
    name: 'vitnode-login-token',
    admin: {
      name: 'vitnode-login-token-admin',
      expiresIn: 60 * 60 * 24 // 1 day
    }
  },
  editor: {
    skin_tone: 'vitnode-skin-tone'
  }
};

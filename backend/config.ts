const ENVS = {
  refresh_token: process.env.REFRESH_TOKEN_SECRET,
  access_token: process.env.ACCESS_TOKEN_SECRET,
  cookie_domain: process.env.COOKIE_DOMAIN
};

export const CONFIG = {
  password_salt: 10,
  refresh_token: {
    secret: ENVS.refresh_token,
    expiresIn: 60 * 60 * 24 * 365, // 365 days
    name: 'vitnode-ref-auth',
    admin: {
      name: 'vitnode-ref-auth-admin',
      expiresIn: 60 * 60 * 24 // 24 hours
    }
  },
  access_token: {
    secret: ENVS.access_token,
    expiresIn: 60 * 60 * 24, // 24 hours
    name: 'vitnode-acc-auth',
    admin: {
      name: 'vitnode-acc-auth-admin',
      expiresIn: 60 * 5 // 5 min
    }
  },
  cookie: {
    domain: ENVS.cookie_domain ? ENVS.cookie_domain : 'localhost'
  }
};

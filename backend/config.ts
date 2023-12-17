export const ENVS = {
  tokens: {
    login: process.env.LOGIN_TOKEN_SECRET
  },
  redis: {
    url: process.env.REDIS_URL,
    password: process.env.REDIS_PASSWORD
  },
  cookie_domain: process.env.COOKIE_DOMAIN,
  port: process.env.PORT
};

export const CONFIG = {
  password_salt: 10,
  port: ENVS.port ? ENVS.port : 8080,
  login_token: {
    secret: ENVS.tokens.login,
    expiresIn: 60 * 60 * 24, // 24 days
    expiresInRemember: 60 * 60 * 24 * 90, // 90 days
    name: 'vitnode-login-token',
    admin: {
      name: 'vitnode-login-token-admin',
      expiresIn: 60 * 60 * 24 // 1 day
    }
  },
  redis: {
    url: ENVS.redis.url ? ENVS.redis.url : 'redis://localhost:6379',
    password: ENVS.redis.password ? ENVS.redis.password : ''
  },
  cookie: {
    domain: ENVS.cookie_domain ? ENVS.cookie_domain : 'localhost'
  }
};

export const ENVS = {
  tokens: {
    refresh: process.env.REFRESH_TOKEN_SECRET,
    access: process.env.ACCESS_TOKEN_SECRET
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
  refresh_token: {
    secret: ENVS.tokens.refresh,
    expiresIn: 60 * 60 * 24 * 90, // 90 days
    name: 'vitnode-ref-auth',
    admin: {
      name: 'vitnode-ref-auth-admin',
      expiresIn: 60 * 60 * 24 // 24 hours
    }
  },
  access_token: {
    secret: ENVS.tokens.access,
    expiresIn: 60 * 60 * 24, // 24 hours
    name: 'vitnode-acc-auth',
    admin: {
      name: 'vitnode-acc-auth-admin',
      expiresIn: 60 * 5 // 5 min
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

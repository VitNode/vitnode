export const CONFIG = {
  password_salt: 10,
  refresh_token: {
    secret: process.env.REFRESH_TOKEN_SECRET,
    expiresIn: 60 * 60 * 24 * 365 // 365 days
  },
  access_token: {
    secret: process.env.ACCESS_TOKEN_SECRET,
    expiresIn: 60 * 60 * 24 // 24 hours
  },
  cookie: {
    prefix: 'vitnode',
    domain: process.env.COOKIE_DOMAIN
  }
};

export const CONFIG_COOKIE_REFRESH_TOKEN = `${CONFIG.cookie.prefix}-ref-auth`;
export const CONFIG_COOKIE_ACCESS_TOKEN = `${CONFIG.cookie.prefix}-acc-auth`;

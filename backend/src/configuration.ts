export const configuration = () => {
  const data = {
    login_token_secret: process.env.LOGIN_TOKEN_SECRET ?? '',
    port: parseInt(process.env.PORT, 10) || 8080,
    password_salt: 10,
    cookies: {
      domain: process.env.COOKIE_DOMAIN ? process.env.COOKIE_DOMAIN : 'localhost',
      login_token: {
        expiresIn: 60 * 60 * 24 * 7, // 7 days
        expiresInRemember: 60 * 60 * 24 * 90, // 90 days
        name: 'vitnode-login-token',
        admin: {
          name: 'vitnode-login-token-admin',
          expiresIn: 60 * 60 * 24 // 1 day
        }
      },
      known_device: {
        name: 'vitnode-device',
        expiresIn: 60 * 60 * 24 * 365 // 1 year
      }
    }
  };

  if (!data.login_token_secret) {
    throw new Error('Login token secret is not defined in .env file');
  }

  return data;
};

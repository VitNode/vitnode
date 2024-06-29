import 'server-only';

import { cookies } from 'next/headers';

const cookieFromStringToObject = (
  str: string[],
): {
  Domain: string;
  Expires: string;
  HttpOnly: boolean;
  Path: string;
  SameSite: boolean | 'lax' | 'none' | 'strict' | undefined;
  Secure: boolean;
  // eslint-disable-next-line typescript-sort-keys/interface
  [key: string]: boolean | string | 'lax' | 'none' | 'strict' | undefined;
}[] => {
  return str.map(item =>
    Object.fromEntries(
      item.split('; ').map(v => {
        const current = v.split(/=(.*)/s).map(decodeURIComponent);

        if (current.length === 1) {
          return [current[0], true];
        }

        return current;
      }),
    ),
  );
};

export const setCookieFromApi = ({ res }: { res: Response }) => {
  return cookieFromStringToObject(res.headers.getSetCookie()).forEach(
    cookie => {
      const key = Object.keys(cookie)[0];
      const value = Object.values(cookie)[0];

      if (typeof value !== 'string' || typeof key !== 'string') return;

      cookies().set(key, value, {
        domain: cookie.Domain,
        path: cookie.Path,
        expires: new Date(cookie.Expires),
        secure: cookie.Secure,
        httpOnly: cookie.HttpOnly,
        sameSite: cookie.SameSite,
      });
    },
  );
};

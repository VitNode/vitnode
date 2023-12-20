export const cookieFromStringToObject = (
  str: string[]
): {
  [key: string]: string | boolean | 'lax' | 'strict' | 'none' | undefined;
  Domain: string;
  Expires: string;
  HttpOnly: boolean;
  Path: string;
  SameSite: boolean | 'lax' | 'strict' | 'none' | undefined;
  Secure: boolean;
}[] => {
  return str.map(item =>
    Object.fromEntries(
      item.split('; ').map(v => {
        const current = v.split(/=(.*)/s).map(decodeURIComponent);

        if (current.length === 1) {
          return [current[0], true];
        }

        return current;
      })
    )
  );
};

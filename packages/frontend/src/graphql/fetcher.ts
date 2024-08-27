import 'server-only';

import { DocumentNode } from 'graphql';
import { cookies, headers as nextHeaders } from 'next/headers';

import { CONFIG } from '../helpers/config-with-env';

const getGqlString = (doc: DocumentNode) => {
  return doc.loc?.source.body ?? '';
};

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

export interface FetcherUploads {
  files: File | File[];
  variable: string;
}

export interface FetcherArgs<TVariables> {
  query: DocumentNode;
  cache?: RequestCache;
  files?: FetcherUploads[];
  headers?: HeadersInit;
  next?: NextFetchRequestConfig;
  signal?: AbortSignal;
  variables?: TVariables;
}

interface FetcherErrorType {
  message: string;
  extensions?: {
    code: string;
  };
}

export async function fetcher<TData, TVariables = object>({
  cache,
  headers,
  next,
  query,
  signal,
  files,
  variables,
}: FetcherArgs<TVariables>): Promise<TData> {
  const formData = new FormData();

  if (files) {
    const preVariables = {} as Record<string, unknown>;

    files.forEach(({ files, variable }) => {
      if (Array.isArray(files)) {
        preVariables[variable] = files.map(() => null);
      } else {
        preVariables[variable] = null;
      }
    });

    formData.append(
      'operations',
      JSON.stringify({
        query: getGqlString(query),
        variables: {
          ...variables,
          ...preVariables,
        },
      }),
    );

    const preMap = new Map<string, string[]>();

    // Map
    let mapIndex = 0;
    files.forEach(({ files, variable }) => {
      if (Array.isArray(files)) {
        files.forEach((_file, index) => {
          preMap.set(`${mapIndex}`, [`variables.${variable}.${index}`]);

          mapIndex += 1;
        });
      } else {
        if (files) {
          preMap.set(`${mapIndex}`, [`variables.${variable}`]);

          mapIndex += 1;
        }
      }
    });
    formData.append('map', JSON.stringify(Object.fromEntries(preMap)));

    let currentIndex = 0;
    files.forEach(({ files }) => {
      if (Array.isArray(files)) {
        files.forEach(file => {
          formData.append(`${currentIndex}`, file);

          currentIndex += 1;
        });
      } else {
        if (files) {
          formData.append(`${currentIndex}`, files);

          currentIndex += 1;
        }
      }
    });
  }

  const nextInternalHeaders = nextHeaders();

  const internalHeaders = {
    Cookie: cookies().toString(),
    ['user-agent']: nextInternalHeaders.get('user-agent') ?? 'node',
    ['x-forwarded-for']:
      nextInternalHeaders.get('x-forwarded-for') ?? '0.0.0.0',
    ['x-real-ip']: nextInternalHeaders.get('x-real-ip') ?? '0.0.0.0',
    'x-vitnode-user-language': cookies().get('NEXT_LOCALE')?.value ?? 'en',
    ...headers,
  };

  const internalQuery = getGqlString(query);

  const res = await fetch(`${CONFIG.backend_url}/graphql`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    signal,
    headers: files
      ? {
          'x-apollo-operation-name': '*',
          ...internalHeaders,
        }
      : {
          'Content-Type': 'application/json',
          ...internalHeaders,
        },
    body: files
      ? formData
      : JSON.stringify({ query: internalQuery, variables }),
    next,
    cache,
  });

  if (internalQuery.trim().startsWith('mutation')) {
    setCookieFromApi({ res });
  }

  const json = await res.json();

  if (json.errors) {
    // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
    return Promise.reject(
      (json.errors.at(0) as FetcherErrorType).extensions?.code ??
        'INTERNAL_SERVER_ERROR',
    );
  }

  return json.data;
}

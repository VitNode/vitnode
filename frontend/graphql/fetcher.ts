import type { DocumentNode } from 'graphql';

import { getGqlString } from '@/functions/get-qql-string';
import { CONFIG } from '@/config';

interface Args<TVariables> {
  query: DocumentNode;
  headers?: HeadersInit;
  next?: NextFetchRequestConfig;
  signal?: AbortSignal;
  uploads?: {
    files: File | File[];
    variable: string;
  }[];
  variables?: TVariables;
}

export async function fetcher<TData, TVariables>({
  headers,
  next,
  query,
  signal,
  uploads,
  variables
}: Args<TVariables>): Promise<{
  data: TData;
  res: Response;
}> {
  const formData = new FormData();

  if (uploads) {
    const preVariables = {} as Record<string, unknown>;

    uploads.forEach(({ files, variable }) => {
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
          ...preVariables
        }
      })
    );

    const preMap = new Map<string, string[]>();

    // Map
    let mapIndex = 0;
    uploads.forEach(({ files, variable }) => {
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
    uploads.forEach(({ files }) => {
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

  const isClient = typeof window !== 'undefined' && CONFIG.client_graphql_url;

  const res = await fetch(
    isClient ? `${CONFIG.client_graphql_url}/graphql` : `${CONFIG.graphql_url}/graphql`,
    {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      signal,
      headers: uploads
        ? {
            'x-apollo-operation-name': '*',
            ...headers
          }
        : {
            'Content-Type': 'application/json',
            ...headers
          },
      body: uploads ? formData : JSON.stringify({ query: getGqlString(query), variables }),
      next
    }
  );

  const json = await res.json();

  if (json.errors) {
    return Promise.reject(json.errors.at(0));
  }

  return {
    data: json.data,
    res
  };
}

export interface ErrorType {
  message: string;
  extensions?: {
    code: string;
  };
}

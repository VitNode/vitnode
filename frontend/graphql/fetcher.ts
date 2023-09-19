import { DocumentNode } from 'graphql';

import { CONFIG } from '@/config';
import { getGqlString } from '@/functions/get-qql-string';

interface OptionsFetcher {
  signal?: AbortSignal;
  upload?: {
    files: File[];
    variable: string;
  };
}

export async function fetcher<TData, TVariables>(
  query: DocumentNode,
  variables?: TVariables,
  options?: OptionsFetcher
): Promise<TData> {
  const formData = new FormData();

  if (options?.upload) {
    const {
      upload: { files, variable }
    } = options;

    formData.append(
      'operations',
      JSON.stringify({
        query: getGqlString(query),
        variables: {
          ...variables,
          files: files.map(() => null)
        }
      })
    );

    const preMap = new Map<string, string[]>();

    files.forEach((file, index) => {
      preMap.set(`${index + 1}`, [`variables.${variable}.${index}`]);
      formData.append(`${index + 1}`, file);
    });

    formData.append('map', JSON.stringify(Object.fromEntries(preMap)));
  }

  const res = await fetch(CONFIG.graphql_url, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    signal: options?.signal,
    headers: options?.upload
      ? undefined
      : {
          'Content-Type': 'application/json'
        },
    body: options?.upload ? formData : JSON.stringify({ query: getGqlString(query), variables })
  });

  const json = await res.json();

  if (json.errors) {
    return Promise.reject(json.errors.at(0).extensions.code);
  }

  return json.data;
}

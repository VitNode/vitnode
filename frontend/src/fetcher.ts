import { GLOBAL_CONFIG } from '@/config';

interface OptionsFetcher {
  signal?: AbortSignal;
  upload?: {
    files: File[];
    variable: string;
  };
}

export function fetcher<TData, TVariables>(
  query: string,
  variables?: TVariables,
  options?: OptionsFetcher
) {
  return async (): Promise<TData> => {
    const formData = new FormData();

    if (options?.upload) {
      const {
        upload: { files, variable }
      } = options;

      formData.append(
        'operations',
        JSON.stringify({
          query,
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

    const res = await fetch(GLOBAL_CONFIG.apiUrl, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      signal: options?.signal,
      headers: options?.upload
        ? undefined
        : {
            'Content-Type': 'application/json'
          },
      body: options?.upload ? formData : JSON.stringify({ query, variables })
    });

    const json = await res.json();

    if (json.errors) {
      throw json.errors[0];
    }

    return json.data;
  };
}

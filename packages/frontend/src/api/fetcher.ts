import { CONFIG } from '@/helpers/config-with-env';

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters, @typescript-eslint/no-explicit-any
export async function fetcher<TData extends Record<string, any>>({
  url,
  ...options
}: {
  url: string;
} & RequestInit): Promise<{
  data: TData;
  res: Response;
}> {
  const res = await fetch(`${CONFIG.backend_url}${url}`, {
    method: options?.method ?? 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`${res.status} - ${res.statusText}`);
  }

  const data: TData = await res.json();

  return { res, data };
}

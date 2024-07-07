import { fetcher } from './fetcher';
import { Core_Global, Core_GlobalQuery } from './graphql';

export const getGlobalData = async () => {
  const { data } = await fetcher<Core_GlobalQuery>({
    query: Core_Global,
    cache: 'force-cache',
  });

  return data;
};

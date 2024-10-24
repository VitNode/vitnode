import { ShowAuthObj } from 'vitnode-shared/auth.dto';

import { fetcher } from './fetcher';

export const getSessionData = async () => {
  const { data } = await fetcher<ShowAuthObj>({
    url: '/core/auth',
    cache: 'force-cache',
  });

  return data;
};

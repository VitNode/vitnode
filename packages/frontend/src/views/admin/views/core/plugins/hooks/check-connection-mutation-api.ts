'use server';

import { getGlobalData } from '@/graphql/get-global-data';

export const checkConnectionMutationApi = async () => {
  try {
    await getGlobalData();
  } catch (error) {
    const e = error as Error;

    return { error: e.message };
  }
};

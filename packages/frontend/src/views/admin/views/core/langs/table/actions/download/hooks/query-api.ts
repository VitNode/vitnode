'use server';

import {
  Admin__Core_Plugins__Show__Quick,
  Admin__Core_Plugins__Show__QuickQuery,
  Admin__Core_Plugins__Show__QuickQueryVariables,
} from '@/graphql/graphql';
import { fetcher, FetcherErrorType } from '@/graphql/fetcher';

export const queryApi = async (
  variables: Admin__Core_Plugins__Show__QuickQueryVariables,
) => {
  try {
    const data = await fetcher<
      Admin__Core_Plugins__Show__QuickQuery,
      Admin__Core_Plugins__Show__QuickQueryVariables
    >({
      query: Admin__Core_Plugins__Show__Quick,
      variables,
    });

    return { data };
  } catch (e) {
    return { error: e as FetcherErrorType };
  }
};

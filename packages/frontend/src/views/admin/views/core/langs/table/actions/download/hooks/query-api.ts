'use server';

import { fetcher } from '@/graphql/fetcher';
import {
  Admin__Core_Plugins__Show__Quick,
  Admin__Core_Plugins__Show__QuickQuery,
  Admin__Core_Plugins__Show__QuickQueryVariables,
} from '@/graphql/queries/admin/languages/admin__core_plugins__show__quick.generated';

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
  } catch (error) {
    const e = error as Error;

    return { error: e.message };
  }
};

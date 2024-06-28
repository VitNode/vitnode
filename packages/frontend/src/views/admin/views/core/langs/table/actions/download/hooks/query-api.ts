'use server';

import {
  Admin__Core_Plugins__Show__Quick,
  Admin__Core_Plugins__Show__QuickQuery,
  Admin__Core_Plugins__Show__QuickQueryVariables,
} from '../../../../../../../../../graphql/code';
import { fetcher } from '../../../../../../../../../graphql/fetcher';

export const queryApi = async (
  variables: Admin__Core_Plugins__Show__QuickQueryVariables,
) => {
  const { data } = await fetcher<
    Admin__Core_Plugins__Show__QuickQuery,
    Admin__Core_Plugins__Show__QuickQueryVariables
  >({
    query: Admin__Core_Plugins__Show__Quick,
    variables,
  });

  return data;
};

'use server';

import {
  Admin__Core_Plugins__Show__Item,
  Admin__Core_Plugins__Show__ItemQuery,
  Admin__Core_Plugins__Show__ItemQueryVariables,
} from '@/graphql/graphql';
import { fetcher } from '@/graphql/fetcher';

export const getPluginDataAdmin = async (
  variables: Admin__Core_Plugins__Show__ItemQueryVariables,
) => {
  const data = await fetcher<
    Admin__Core_Plugins__Show__ItemQuery,
    Admin__Core_Plugins__Show__ItemQueryVariables
  >({
    query: Admin__Core_Plugins__Show__Item,
    variables,
  });

  return data;
};

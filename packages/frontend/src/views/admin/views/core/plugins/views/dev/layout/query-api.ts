'use server';

import { fetcher } from '@/graphql/fetcher';
import {
  Admin__Core_Plugins__Show__Item,
  Admin__Core_Plugins__Show__ItemQuery,
  Admin__Core_Plugins__Show__ItemQueryVariables,
} from '@/graphql/queries/admin/plugins/dev/admin__core_plugins__show__item.generated';

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

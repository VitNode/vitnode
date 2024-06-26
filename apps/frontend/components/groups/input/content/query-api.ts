'use server';

import { fetcher } from 'vitnode-frontend/graphql/fetcher';

import {
  Admin__Core_Groups__Show_Short,
  Admin__Core_Groups__Show_ShortQuery,
  Admin__Core_Groups__Show_ShortQueryVariables,
} from '@/graphql/hooks';

export const queryApi = async (
  variables: Admin__Core_Groups__Show_ShortQueryVariables,
) => {
  const { data } = await fetcher<
    Admin__Core_Groups__Show_ShortQuery,
    Admin__Core_Groups__Show_ShortQueryVariables
  >({
    query: Admin__Core_Groups__Show_Short,
    variables,
  });

  return data;
};

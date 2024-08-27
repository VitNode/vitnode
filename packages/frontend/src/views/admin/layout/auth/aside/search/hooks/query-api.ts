'use server';

import { fetcher } from '@/graphql/fetcher';
import {
  Admin__Sessions__Search,
  Admin__Sessions__SearchQuery,
  Admin__Sessions__SearchQueryVariables,
} from '@/graphql/queries/admin/admin__sessions__search.generated';

export const queryApi = async (
  variables: Admin__Sessions__SearchQueryVariables,
) => {
  try {
    const data = await fetcher<
      Admin__Sessions__SearchQuery,
      Admin__Sessions__SearchQueryVariables
    >({
      query: Admin__Sessions__Search,
      variables,
    });

    return { data };
  } catch (error) {
    const e = error as Error;

    return { error: e.message };
  }
};

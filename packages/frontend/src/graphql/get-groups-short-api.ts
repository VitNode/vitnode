'use server';

import { fetcher, FetcherErrorType } from './fetcher';
import {
  Admin__Core_Groups__Show_Short,
  Admin__Core_Groups__Show_ShortQuery,
  Admin__Core_Groups__Show_ShortQueryVariables,
} from './graphql';

export const getGroupsShortApi = async (
  variables: Admin__Core_Groups__Show_ShortQueryVariables,
) => {
  try {
    const data = await fetcher<
      Admin__Core_Groups__Show_ShortQuery,
      Admin__Core_Groups__Show_ShortQueryVariables
    >({
      query: Admin__Core_Groups__Show_Short,
      variables,
    });

    return { data };
  } catch (e) {
    return { error: e as FetcherErrorType };
  }
};

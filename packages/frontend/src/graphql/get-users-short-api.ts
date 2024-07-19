'use server';

import {
  Core_Members__Show__Search,
  Core_Members__Show__SearchQuery,
  Core_Members__Show__SearchQueryVariables,
} from './graphql';
import { fetcher, FetcherErrorType } from './fetcher';

export const getUsersShortApi = async (
  variables: Core_Members__Show__SearchQueryVariables,
) => {
  try {
    const data = await fetcher<
      Core_Members__Show__SearchQuery,
      Core_Members__Show__SearchQueryVariables
    >({
      query: Core_Members__Show__Search,
      variables,
    });

    return { data };
  } catch (e) {
    return { error: e as FetcherErrorType };
  }
};

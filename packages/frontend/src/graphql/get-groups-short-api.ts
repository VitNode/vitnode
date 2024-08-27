'use server';

import { fetcher } from './fetcher';
import {
  Admin__Core_Groups__Show_Short,
  Admin__Core_Groups__Show_ShortQuery,
  Admin__Core_Groups__Show_ShortQueryVariables,
} from './queries/admin/groups/admin__core_groups__show_short.generated';

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
  } catch (error) {
    const e = error as Error;

    return { error: e.message };
  }
};

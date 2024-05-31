"use server";

import {
  Admin__Core_Groups__Show_Short,
  Admin__Core_Groups__Show_ShortQuery,
  Admin__Core_Groups__Show_ShortQueryVariables
} from "@/utils/graphql/hooks";
import { fetcher } from "@/utils/graphql/fetcher";

export const queryApi = async (
  variables: Admin__Core_Groups__Show_ShortQueryVariables
) => {
  const { data } = await fetcher<
    Admin__Core_Groups__Show_ShortQuery,
    Admin__Core_Groups__Show_ShortQueryVariables
  >({
    query: Admin__Core_Groups__Show_Short,
    variables
  });

  return data;
};

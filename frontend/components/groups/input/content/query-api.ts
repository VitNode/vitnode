"use server";

import { fetcher } from "@/graphql/fetcher";
import {
  Admin__Core_Groups__Show_Short,
  type Admin__Core_Groups__Show_ShortQuery,
  type Admin__Core_Groups__Show_ShortQueryVariables
} from "@/graphql/hooks";

export const queryApi = async (
  variables: Admin__Core_Groups__Show_ShortQueryVariables
): Promise<Admin__Core_Groups__Show_ShortQuery> => {
  const { data } = await fetcher<
    Admin__Core_Groups__Show_ShortQuery,
    Admin__Core_Groups__Show_ShortQueryVariables
  >({
    query: Admin__Core_Groups__Show_Short,
    variables
  });

  return data;
};

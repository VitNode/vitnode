"use server";

import {
  Admin__Forum_Forums__Show_ShortQuery,
  Admin__Forum_Forums__Show_ShortQueryVariables,
  Admin__Forum_Forums__Show_Short
} from "@/utils/graphql/hooks";
import { fetcher } from "@/utils/graphql/fetcher";

export const queryApi = async (
  variables: Admin__Forum_Forums__Show_ShortQueryVariables
) => {
  const { data } = await fetcher<
    Admin__Forum_Forums__Show_ShortQuery,
    Admin__Forum_Forums__Show_ShortQueryVariables
  >({
    query: Admin__Forum_Forums__Show_Short,
    variables
  });

  return data;
};

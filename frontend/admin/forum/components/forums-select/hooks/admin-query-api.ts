"use server";

import { fetcher } from "@/graphql/fetcher";
import {
  type Admin__Forum_Forums__Show_ShortQuery,
  type Admin__Forum_Forums__Show_ShortQueryVariables,
  Admin__Forum_Forums__Show_Short
} from "@/graphql/hooks";

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

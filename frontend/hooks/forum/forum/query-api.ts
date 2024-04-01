"use server";

import { fetcher } from "@/graphql/fetcher";
import {
  Forum_Forums__Show_Item_More,
  type Forum_Forums__Show_Item_MoreQuery,
  type Forum_Forums__Show_Item_MoreQueryVariables
} from "@/graphql/hooks";

export const queryApi = async (
  variables: Forum_Forums__Show_Item_MoreQueryVariables
): Promise<Forum_Forums__Show_Item_MoreQuery> => {
  const { data } = await fetcher<
    Forum_Forums__Show_Item_MoreQuery,
    Forum_Forums__Show_Item_MoreQueryVariables
  >({
    query: Forum_Forums__Show_Item_More,
    variables
  });

  return data;
};

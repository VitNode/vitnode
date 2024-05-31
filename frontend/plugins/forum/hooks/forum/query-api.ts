"use server";

import {
  Forum_Forums__Show_Item_More,
  Forum_Forums__Show_Item_MoreQuery,
  Forum_Forums__Show_Item_MoreQueryVariables
} from "@/utils/graphql/hooks";
import { fetcher } from "@/utils/graphql/fetcher";

export const queryApi = async (
  variables: Forum_Forums__Show_Item_MoreQueryVariables
) => {
  const { data } = await fetcher<
    Forum_Forums__Show_Item_MoreQuery,
    Forum_Forums__Show_Item_MoreQueryVariables
  >({
    query: Forum_Forums__Show_Item_More,
    variables
  });

  return data;
};

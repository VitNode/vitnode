"use server";

import {
  Forum_Posts__Show_More,
  Forum_Posts__Show_MoreQuery,
  Forum_Posts__Show_MoreQueryVariables
} from "@/utils/graphql/hooks";
import { fetcher } from "@/utils/graphql/fetcher";

export const queryApi = async (
  variables: Forum_Posts__Show_MoreQueryVariables
) => {
  const { data } = await fetcher<
    Forum_Posts__Show_MoreQuery,
    Forum_Posts__Show_MoreQueryVariables
  >({
    query: Forum_Posts__Show_More,
    variables
  });

  return data;
};

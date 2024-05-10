"use server";

import { fetcher } from "@/graphql/fetcher";
import {
  Forum_Posts__Show_More,
  type Forum_Posts__Show_MoreQuery,
  type Forum_Posts__Show_MoreQueryVariables
} from "@/graphql/hooks";

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

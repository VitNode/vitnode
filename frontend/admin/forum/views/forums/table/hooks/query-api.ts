"use server";

import { fetcher } from "@/graphql/fetcher";
import {
  Admin__Forum_Forums__Show,
  Admin__Forum_Forums__ShowQuery,
  Admin__Forum_Forums__ShowQueryVariables
} from "@/graphql/hooks";

export const queryApi = async (
  variables: Admin__Forum_Forums__ShowQueryVariables
) => {
  const { data } = await fetcher<
    Admin__Forum_Forums__ShowQuery,
    Admin__Forum_Forums__ShowQueryVariables
  >({
    query: Admin__Forum_Forums__Show,
    variables
  });

  return data;
};

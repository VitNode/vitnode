"use server";

import {
  Admin__Forum_Forums__Show,
  Admin__Forum_Forums__ShowQuery,
  Admin__Forum_Forums__ShowQueryVariables
} from "@/utils/graphql/hooks";
import { fetcher } from "@/utils/graphql/fetcher";

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

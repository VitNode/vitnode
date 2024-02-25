"use server";

import { fetcher } from "@/graphql/fetcher";
import {
  Admin__Forum_Forums__Show,
  type Admin__Forum_Forums__ShowQuery,
  type Admin__Forum_Forums__ShowQueryVariables
} from "@/graphql/hooks";

export const mutationUpdateDataApi = async (
  variables: Admin__Forum_Forums__ShowQueryVariables
) => {
  try {
    const { data } = await fetcher<
      Admin__Forum_Forums__ShowQuery,
      Admin__Forum_Forums__ShowQueryVariables
    >({
      query: Admin__Forum_Forums__Show,
      variables
    });

    return { data };
  } catch (error) {
    return { error };
  }
};

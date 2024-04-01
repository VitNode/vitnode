"use server";

import { revalidateTag } from "next/cache";

import { fetcher } from "@/graphql/fetcher";
import {
  Core_Members__Sign_Up,
  type Core_Members__Sign_UpMutation,
  type Core_Members__Sign_UpMutationVariables
} from "@/graphql/hooks";

interface Args {
  variables: Core_Members__Sign_UpMutationVariables;
  installPage?: boolean;
}

export const mutationApi = async ({
  installPage,
  variables
}: Args): Promise<{
  data?: Core_Members__Sign_UpMutation;
  error?: unknown;
}> => {
  try {
    const { data } = await fetcher<
      Core_Members__Sign_UpMutation,
      Core_Members__Sign_UpMutationVariables
    >({
      query: Core_Members__Sign_Up,
      variables
    });

    if (installPage) {
      revalidateTag("Core_Sessions__Authorization");
    }

    return { data };
  } catch (error) {
    return { error };
  }
};

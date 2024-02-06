"use server";

import { cookies } from "next/headers";

import { fetcher } from "@/graphql/fetcher";
import {
  type Core_Nav__Admin__Change_PositionMutation,
  type Core_Nav__Admin__Change_PositionMutationVariables,
  Core_Nav__Admin__Change_Position
} from "@/graphql/hooks";

export const mutationChangePositionApi = async (
  variables: Core_Nav__Admin__Change_PositionMutationVariables
) => {
  try {
    const { data } = await fetcher<
      Core_Nav__Admin__Change_PositionMutation,
      Core_Nav__Admin__Change_PositionMutationVariables
    >({
      query: Core_Nav__Admin__Change_Position,
      variables,
      headers: {
        Cookie: cookies().toString()
      }
    });

    return { data };
  } catch (error) {
    return { error };
  }
};

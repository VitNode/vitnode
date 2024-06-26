"use server";

import { fetcher } from "vitnode-frontend/helpers/fetcher";

import {
  Admin__Core_Plugins__Show,
  Admin__Core_Plugins__ShowQuery,
  Admin__Core_Plugins__ShowQueryVariables,
} from "@/graphql/hooks";

export const queryApi = async (
  variables: Admin__Core_Plugins__ShowQueryVariables,
) => {
  const { data } = await fetcher<
    Admin__Core_Plugins__ShowQuery,
    Admin__Core_Plugins__ShowQueryVariables
  >({
    query: Admin__Core_Plugins__Show,
    variables,
  });

  return data;
};

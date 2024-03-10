"use server";

import { fetcher } from "@/graphql/fetcher";
import {
  Admin__Core_Plugins__Download_Check,
  type Admin__Core_Plugins__Download_CheckQuery,
  type Admin__Core_Plugins__Download_CheckQueryVariables
} from "@/graphql/hooks";

export const queryApi = async (
  variables: Admin__Core_Plugins__Download_CheckQueryVariables
) => {
  const { data } = await fetcher<
    Admin__Core_Plugins__Download_CheckQuery,
    Admin__Core_Plugins__Download_CheckQueryVariables
  >({
    query: Admin__Core_Plugins__Download_Check,
    variables
  });

  return data;
};

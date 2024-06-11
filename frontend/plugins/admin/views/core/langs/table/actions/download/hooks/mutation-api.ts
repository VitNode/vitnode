"use server";

import {
  Admin__Core_Languages__Download,
  Admin__Core_Languages__DownloadMutation,
  Admin__Core_Languages__DownloadMutationVariables
} from "@/graphql/hooks";
import { fetcher } from "@/graphql/fetcher";

export const mutationApi = async (
  variables: Admin__Core_Languages__DownloadMutationVariables
) => {
  try {
    const { data } = await fetcher<
      Admin__Core_Languages__DownloadMutation,
      Admin__Core_Languages__DownloadMutationVariables
    >({
      query: Admin__Core_Languages__Download,
      variables
    });

    return { data };
  } catch (error) {
    return { error };
  }
};

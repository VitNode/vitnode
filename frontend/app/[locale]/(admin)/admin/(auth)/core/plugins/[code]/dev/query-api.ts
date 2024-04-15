import { AdminCoreApiTags } from "@/admin/core/api-tags";
import { fetcher, type ErrorType } from "@/graphql/fetcher";
import {
  Admin__Core_Plugins__Show__Item,
  type Admin__Core_Plugins__Show__ItemQuery,
  type Admin__Core_Plugins__Show__ItemQueryVariables
} from "@/graphql/hooks";

export const getPluginDataAdmin = async (
  variables: Admin__Core_Plugins__Show__ItemQueryVariables
) => {
  try {
    const { data } = await fetcher<
      Admin__Core_Plugins__Show__ItemQuery,
      Admin__Core_Plugins__Show__ItemQueryVariables
    >({
      query: Admin__Core_Plugins__Show__Item,
      variables,
      cache: "force-cache",
      next: {
        tags: [AdminCoreApiTags.Admin__Core_Plugins__Show__Item]
      }
    });

    return { data };
  } catch (e) {
    const error = e as ErrorType;

    return { error };
  }
};

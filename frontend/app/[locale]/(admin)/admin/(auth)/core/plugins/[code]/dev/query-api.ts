import {
  Admin__Core_Plugins__Show__Item,
  Admin__Core_Plugins__Show__ItemQuery,
  Admin__Core_Plugins__Show__ItemQueryVariables
} from "@/utils/graphql/hooks";
import { fetcher, ErrorType } from "@/utils/graphql/fetcher";
import { AdminCoreApiTags } from "@/plugins/core/admin/api-tags";

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

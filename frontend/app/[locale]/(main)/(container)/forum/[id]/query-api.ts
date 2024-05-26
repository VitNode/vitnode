import { getIdFormString } from "@/functions/url";
import { fetcher, ErrorType } from "@/graphql/fetcher";
import {
  Forum_Forums__Show_Item,
  Forum_Forums__Show_ItemQuery,
  Forum_Forums__Show_ItemQueryVariables
} from "@/graphql/hooks";

export const getForumItemData = async ({ id }: { id: string }) => {
  try {
    const { data } = await fetcher<
      Forum_Forums__Show_ItemQuery,
      Forum_Forums__Show_ItemQueryVariables
    >({
      query: Forum_Forums__Show_Item,
      variables: {
        forumId: getIdFormString(id),
        first: 25,
        lastPostsArgs: {
          first: 1
        }
      }
    });

    return { data };
  } catch (e) {
    const error = e as ErrorType;

    return { error };
  }
};

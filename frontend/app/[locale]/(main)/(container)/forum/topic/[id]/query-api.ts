import { fetcher } from "@/graphql/fetcher";
import {
  Forum_Topics__Show,
  ShowPostsForumsSortingEnum,
  Forum_Topics__ShowQuery,
  Forum_Topics__ShowQueryVariables
} from "@/graphql/hooks";
import { getIdFormString } from "@/functions/url";

export const limit = 25;

export const getTopicData = async ({
  id,
  sort
}: {
  id: string;
  sort?: string;
}) => {
  let sortBy: ShowPostsForumsSortingEnum | undefined;
  if (sort === ShowPostsForumsSortingEnum.newest) {
    sortBy = ShowPostsForumsSortingEnum.newest;
  } else {
    sortBy = ShowPostsForumsSortingEnum.oldest;
  }

  const { data } = await fetcher<
    Forum_Topics__ShowQuery,
    Forum_Topics__ShowQueryVariables
  >({
    query: Forum_Topics__Show,
    variables: {
      id: getIdFormString(id),
      sortBy,
      limit
    }
  });

  return data;
};

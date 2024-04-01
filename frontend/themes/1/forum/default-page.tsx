import { getTranslations } from "next-intl/server";

import { CategoryForum } from "./views/forum/forums/category/category";
import { HeaderContent } from "@/components/header-content/header-content";
import { fetcher } from "@/graphql/fetcher";
import {
  Forum_Forums__Show,
  type Forum_Forums__ShowQuery,
  type Forum_Forums__ShowQueryVariables
} from "@/graphql/hooks";

const getData = async (): Promise<Forum_Forums__ShowQuery> => {
  const { data } = await fetcher<
    Forum_Forums__ShowQuery,
    Forum_Forums__ShowQueryVariables
  >({
    query: Forum_Forums__Show,
    variables: {
      lastPostsArgs: {
        first: 1
      }
    },
    cache: "force-cache",
    next: {
      tags: ["Forum_Forums__Show"]
    }
  });

  return data;
};

export default async function DefaultPage(): Promise<JSX.Element> {
  const {
    forum_forums__show: { edges }
  } = await getData();
  const t = await getTranslations("forum");
  const tCore = await getTranslations("core");

  return (
    <div className="container my-4">
      <HeaderContent className="my-5" h1={t("forum")} />

      {edges.length ? (
        <div className="flex flex-col gap-4">
          {edges.map(
            (edge): JSX.Element => (
              <CategoryForum key={edge.id} {...edge} />
            )
          )}
        </div>
      ) : (
        <div className="text-center">{tCore("no_results")}</div>
      )}
    </div>
  );
}

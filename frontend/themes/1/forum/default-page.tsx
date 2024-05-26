import { getTranslations } from "next-intl/server";

import { CategoryForum } from "./views/forum/forums/category/category";
import { HeaderContent } from "@/components/header-content/header-content";
import { fetcher } from "@/graphql/fetcher";
import {
  Forum_Forums__Show,
  Forum_Forums__ShowQuery,
  Forum_Forums__ShowQueryVariables
} from "@/graphql/hooks";

const getData = async () => {
  const { data } = await fetcher<
    Forum_Forums__ShowQuery,
    Forum_Forums__ShowQueryVariables
  >({
    query: Forum_Forums__Show,
    variables: {
      lastPostsArgs: {
        first: 1
      }
    }
  });

  return data;
};

export default async function DefaultPage() {
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
          {edges.map(edge => (
            <CategoryForum key={edge.id} {...edge} />
          ))}
        </div>
      ) : (
        <div className="text-center">{tCore("no_results")}</div>
      )}
    </div>
  );
}

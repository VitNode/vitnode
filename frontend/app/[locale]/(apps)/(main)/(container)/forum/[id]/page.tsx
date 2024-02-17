import { notFound } from "next/navigation";
import { lazy, type LazyExoticComponent } from "react";

import { fetcher, type ErrorType } from "@/graphql/fetcher";
import { Forum_Forums__Show_Item } from "@/graphql/hooks";
import type {
  Forum_Forums__Show_ItemQuery,
  Forum_Forums__Show_ItemQueryVariables
} from "@/graphql/hooks";
import { getIdFormString } from "@/functions/url";
import { getSessionData } from "@/functions/get-session-data";
import type { ErrorViewProps } from "@/themes/1/core/views/global/error/error-view";
import type { ForumForumViewProps } from "@/themes/1/forum/views/forum/forums/views/[id]/forum-forum-view";

const getData = async ({ id }: { id: string }) => {
  const { data } = await fetcher<
    Forum_Forums__Show_ItemQuery,
    Forum_Forums__Show_ItemQueryVariables
  >({
    query: Forum_Forums__Show_Item,
    variables: {
      forumId: getIdFormString(id),
      first: 25
    },
    cache: "force-cache",
    next: {
      tags: ["Forum_Forums__Show_Item"]
    }
  });

  return data;
};

interface Props {
  params: {
    id: string;
  };
}

export default async function Page({ params: { id } }: Props) {
  let data: Forum_Forums__Show_ItemQuery | undefined;
  const { theme_id } = await getSessionData();

  try {
    data = await getData({ id });
  } catch (e) {
    const error = e as ErrorType;

    if (error.extensions?.code === "ACCESS_DENIED") {
      const ErrorView: LazyExoticComponent<
        (props: ErrorViewProps) => JSX.Element
      > = lazy(() =>
        import(`@/themes/${theme_id}/core/views/global/error/error-view`).catch(
          () => import("@/themes/1/core/views/global/error/error-view")
        )
      );

      return <ErrorView code="403" />;
    }

    throw e;
  }

  if (!data || data.forum_forums__show.edges.length === 0) {
    notFound();
  }

  const PageFromTheme: LazyExoticComponent<
    (props: ForumForumViewProps) => JSX.Element
  > = lazy(() =>
    import(
      `@/themes/${theme_id}/forum/views/forum/forums/views/[id]/forum-forum-view`
    ).catch(
      () =>
        import(
          "@/themes/1/forum/views/forum/forums/views/[id]/forum-forum-view"
        )
    )
  );

  return <PageFromTheme data={data} />;
}

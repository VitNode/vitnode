import { cookies } from "next/headers";
import { lazy, type LazyExoticComponent } from "react";

import { fetcher } from "@/graphql/fetcher";
import {
  Forum_Forums__Show,
  type Forum_Forums__ShowQuery,
  type Forum_Forums__ShowQueryVariables
} from "@/graphql/hooks";
import { getSessionData } from "@/functions/get-session-data";
import type { ForumsForumViewProps } from "@/themes/1/forum/views/forum/forums/forums-forum-view";

const getData = async () => {
  const { data } = await fetcher<
    Forum_Forums__ShowQuery,
    Forum_Forums__ShowQueryVariables
  >({
    query: Forum_Forums__Show,
    headers: {
      Cookie: cookies().toString()
    },
    cache: "force-cache",
    next: {
      tags: ["Forum_Forums__Show"]
    }
  });

  return data;
};

export default async function Page() {
  const data = await getData();
  const { theme_id } = await getSessionData();
  const PageFromTheme: LazyExoticComponent<
    (props: ForumsForumViewProps) => JSX.Element
  > = lazy(() =>
    import(
      `@/themes/${theme_id}/forum/views/forum/forums/forums-forum-view`
    ).catch(
      () => import("@/themes/1/forum/views/forum/forums/forums-forum-view")
    )
  );

  return <PageFromTheme data={data} />;
}

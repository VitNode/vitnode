import { lazy, type LazyExoticComponent } from "react";

import { getSessionData } from "@/functions/get-session-data";
import type { ForumForumViewProps } from "@/themes/1/forum/views/forum/forums/views/[id]/forum-forum-view";
import { getForumItemData } from "./query-api";

interface Props {
  params: {
    id: string;
  };
}

export default async function Page({ params: { id } }: Props) {
  const { theme_id } = await getSessionData();
  const { data } = await getForumItemData({ id });
  if (!data) return null;

  const PageFromTheme: LazyExoticComponent<
    (props: ForumForumViewProps) => JSX.Element
  > = lazy(async () =>
    import(
      `@/themes/${theme_id}/forum/views/forum/forums/views/[id]/forum-forum-view`
    ).catch(
      async () =>
        import(
          "@/themes/1/forum/views/forum/forums/views/[id]/forum-forum-view"
        )
    )
  );

  return <PageFromTheme data={data} />;
}

import { lazy, LazyExoticComponent } from "react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { getSessionData } from "@/functions/get-session-data";
import { getForumItemData } from "../query-api";
import { CreateTopicViewProps } from "@/themes/1/forum/views/forum/forums/views/create-topic/create-topic-view";
import { ErrorViewSSR } from "@/components/views/error-view-ssr";

interface Props {
  params: {
    id: string;
  };
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("forum.topics.create");

  return {
    title: t("title"),
    robots: "noindex, nofollow"
  };
}

export default async function Page({ params: { id } }: Props) {
  const { theme_id } = await getSessionData();
  const { data } = await getForumItemData({ id });
  if (!data) return null;

  if (!data.forum_forums__show.edges[0].permissions.can_create) {
    return <ErrorViewSSR theme_id={theme_id} code="403" />;
  }

  const PageFromTheme: LazyExoticComponent<
    (props: CreateTopicViewProps) => JSX.Element
  > = lazy(async () =>
    import(
      `@/themes/${theme_id}/forum/views/forum/forums/views/create-topic/create-topic-view`
    ).catch(
      async () =>
        import(
          "@/themes/1/forum/views/forum/forums/views/create-topic/create-topic-view"
        )
    )
  );

  return <PageFromTheme data={data} />;
}

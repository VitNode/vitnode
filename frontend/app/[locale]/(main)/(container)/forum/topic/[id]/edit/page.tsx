import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { lazy, type LazyExoticComponent } from "react";

import { getSessionData } from "@/functions/get-session-data";
import { getTopicData } from "../query-api";
import type { EditTopicViewProps } from "@/themes/1/forum/views/forum/topic/views/edit/edit-topic-view";
import { useTextLang } from "@/hooks/core/use-text-lang";
import { ErrorViewSSR } from "@/components/views/error-view-ssr";

interface Props {
  params: {
    id: string;
    locale: string;
  };
}

export async function generateMetadata({
  params: { id, locale }
}: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "forum.topics.edit" });
  const data = await getTopicData({ id });
  const forum = data.forum_topics__show.edges.at(0);
  if (!forum) {
    return {
      robots: "noindex, nofollow"
    };
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { convertText } = useTextLang();

  return {
    title: t("title", {
      title: convertText(forum.title)
    }),
    robots: "noindex, nofollow"
  };
}

export default async function Page({ params: { id } }: Props) {
  const { theme_id } = await getSessionData();

  const data = await getTopicData({ id });

  if (!data.forum_topics__show.edges[0].permissions.can_edit) {
    return <ErrorViewSSR theme_id={theme_id} code="403" />;
  }

  const PageFromTheme: LazyExoticComponent<
    (props: EditTopicViewProps) => JSX.Element
  > = lazy(() =>
    import(
      `@/themes/${theme_id}/forum/views/forum/topic/views/edit/edit-topic-view`
    ).catch(
      () =>
        import("@/themes/1/forum/views/forum/topic/views/edit/edit-topic-view")
    )
  );

  return <PageFromTheme data={data.forum_topics__show.edges[0]} />;
}

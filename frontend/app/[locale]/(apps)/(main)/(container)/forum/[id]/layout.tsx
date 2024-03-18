import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { type ReactNode } from "react";

import { getConfigFile } from "@/functions/get-config-file";
import { getSessionData } from "@/functions/get-session-data";
import { getConvertTextLang } from "@/hooks/core/use-text-lang";
import { getForumItemData } from "./query-api";
import { ErrorViewSSR } from "@/components/views/error-view-ssr";

interface Props {
  children: ReactNode;
  params: {
    id: string;
    locale: string;
  };
}

export async function generateMetadata({
  params: { id, locale }
}: Props): Promise<Metadata> {
  const { data } = await getForumItemData({ id });
  const config = await getConfigFile();

  if (!data?.forum_forums__show.edges.at(0)) return {};

  const title = getConvertTextLang({
    locale,
    text: data.forum_forums__show.edges[0].name
  });

  return {
    title: {
      default: title,
      template: `%s - ${title} - ${config.side_name}`
    }
  };
}

export default async function Layout({ children, params: { id } }: Props) {
  const { theme_id } = await getSessionData();
  const { data, error } = await getForumItemData({ id });

  if (error?.extensions?.code === "ACCESS_DENIED") {
    return <ErrorViewSSR theme_id={theme_id} code="403" />;
  }

  if (!data || data.forum_forums__show.edges.length === 0) {
    notFound();
  }

  return <>{children}</>;
}

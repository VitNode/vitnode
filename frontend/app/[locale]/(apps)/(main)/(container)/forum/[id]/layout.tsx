import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { lazy, type LazyExoticComponent, type ReactNode } from "react";

import { getConfigFile } from "@/functions/get-config-file";
import { getSessionData } from "@/functions/get-session-data";
import { getIdFormString } from "@/functions/url";
import { fetcher, type ErrorType } from "@/graphql/fetcher";
import {
  Forum_Forums__Show_Item,
  type Forum_Forums__Show_ItemQuery,
  type Forum_Forums__Show_ItemQueryVariables
} from "@/graphql/hooks";
import { getConvertTextLang } from "@/hooks/core/use-text-lang";
import type { ErrorViewProps } from "@/themes/1/core/views/global/error/error-view";

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
      },
      cache: "force-cache",
      next: {
        tags: ["Forum_Forums__Show_Item"]
      }
    });

    return { data };
  } catch (e) {
    const error = e as ErrorType;

    return { error };
  }
};

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
    const ErrorView: LazyExoticComponent<
      (props: ErrorViewProps) => JSX.Element
    > = lazy(() =>
      import(`@/themes/${theme_id}/core/views/global/error/error-view`).catch(
        () => import("@/themes/1/core/views/global/error/error-view")
      )
    );

    return <ErrorView code="403" />;
  }

  if (!data || data.forum_forums__show.edges.length === 0) {
    notFound();
  }

  return <>{children}</>;
}

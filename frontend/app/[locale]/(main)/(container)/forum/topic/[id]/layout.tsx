import { ReactNode } from "react";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { getTopicData } from "./query-api";
import { getTextLang } from "@/hooks/core/use-text-lang";
import { ErrorType } from "@/graphql/fetcher";
import { getSessionData } from "@/functions/get-session-data";
import { ErrorViewSSR } from "@/components/views/error-view-ssr";

interface Props {
  children: ReactNode;
  params: {
    id: string;
    locale: string;
  };
}

export default async function Layout({
  children,
  params: { id, locale }
}: Props) {
  const { theme_id } = await getSessionData();
  const { convertNameToLink, convertText } = getTextLang({ locale });

  try {
    const data = await getTopicData({ id });
    const breadcrumbItems = data.forum_topics__show.edges[0].breadcrumbs.map(
      item => ({
        id: item.id,
        text: convertText(item.name),
        href: `/forum/${convertNameToLink({ ...item })}`
      })
    );

    return (
      <>
        {breadcrumbItems.length > 1 && <Breadcrumbs items={breadcrumbItems} />}
        {children}
      </>
    );
  } catch (e) {
    const error = e as ErrorType | undefined;

    if (error?.extensions?.code === "ACCESS_DENIED") {
      return <ErrorViewSSR theme_id={theme_id} code="403" />;
    }

    notFound();
  }
}

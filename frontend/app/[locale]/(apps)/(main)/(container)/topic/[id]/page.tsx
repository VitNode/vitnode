import { lazy, type LazyExoticComponent } from "react";

import { type TopicViewProps } from "@/themes/1/forum/views/forum/topic/topic-view";
import { getSessionData } from "@/functions/get-session-data";
import { firstEdgesTopiData, getTopicData } from "./query";

interface Props {
  params: {
    id: string;
  };
  searchParams: {
    sort?: string;
  };
}

export default async function Page({
  params: { id },
  searchParams: { sort }
}: Props) {
  const { theme_id } = await getSessionData();
  const data = await getTopicData({ id, sort });

  const PageFromTheme: LazyExoticComponent<
    (props: TopicViewProps) => JSX.Element
  > = lazy(() =>
    import(`@/themes/${theme_id}/forum/views/forum/topic/topic-view`).catch(
      () => import("@/themes/1/forum/views/forum/topic/topic-view")
    )
  );

  return <PageFromTheme data={data} firstEdges={firstEdgesTopiData} />;
}

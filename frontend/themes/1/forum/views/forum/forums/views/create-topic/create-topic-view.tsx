"use client";

import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { useTextLang } from "@/hooks/core/use-text-lang";
import type { Forum_Forums__Show_ItemQuery } from "@/graphql/hooks";

import { CreateEditTopic } from "../../../topic/create-edit/create-edit";

export interface CreateTopicViewProps {
  data: Forum_Forums__Show_ItemQuery;
}

export default function CreateTopicView({
  data
}: CreateTopicViewProps): JSX.Element {
  const { convertText } = useTextLang();

  const breadcrumbsItems = data.forum_forums__show.edges[0].breadcrumbs.map(
    (
      item
    ): {
      href: string;
      id: number;
      text: string;
    } => ({
      id: item.id,
      text: convertText(item.name),
      href: `/forum/${item.id}`
    })
  );

  return (
    <>
      <Breadcrumbs items={breadcrumbsItems} />
      <CreateEditTopic />
    </>
  );
}

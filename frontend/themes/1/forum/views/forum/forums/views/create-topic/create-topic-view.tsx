"use client";

import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { useTextLang } from "@/hooks/core/use-text-lang";
import { Forum_Forums__Show_ItemQuery } from "@/graphql/hooks";

import { CreateEditTopic } from "../../../topic/create-edit/create-edit";

export interface CreateTopicViewProps {
  data: Forum_Forums__Show_ItemQuery;
}

export default function CreateTopicView({ data }: CreateTopicViewProps) {
  const { convertNameToLink, convertText } = useTextLang();

  const breadcrumbsItems = data.forum_forums__show.edges[0].breadcrumbs.map(
    item => ({
      id: item.id,
      text: convertText(item.name),
      href: `/forum/${convertNameToLink({ ...item })}`
    })
  );

  return (
    <>
      <Breadcrumbs items={breadcrumbsItems} />
      <CreateEditTopic />
    </>
  );
}

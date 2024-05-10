import { useTranslations } from "next-intl";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useTextLang } from "@/hooks/core/use-text-lang";
import { ActionsForumsForum } from "./actions/actions";
import type { Forum_Forums__Show_ItemQuery } from "@/graphql/hooks";
import { TopicsListForum } from "./topics-list/topics-list";
import { HeaderContent } from "@/components/header-content/header-content";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ReadOnlyEditor } from "@/components/editor/read-only/read-only";

import { ItemForum } from "../../item/item";

export interface ForumForumViewProps {
  data: Forum_Forums__Show_ItemQuery;
}

export default function ForumForumView({
  data: { forum_forums__show, forum_topics__show }
}: ForumForumViewProps) {
  const { convertNameToLink, convertText } = useTextLang();
  const t = useTranslations("forum.topics");

  const { edges } = forum_forums__show;
  const forumData = edges.at(0);
  if (!forumData) return null;

  return (
    <>
      {forumData.breadcrumbs.length > 1 && (
        <Breadcrumbs
          items={forumData.breadcrumbs.slice(0, -1).map(item => ({
            id: item.id,
            text: convertText(item.name),
            href: `/forum/${convertNameToLink({ ...item })}`
          }))}
        />
      )}

      <Card className="mb-8">
        <CardHeader className="py-4">
          <HeaderContent
            h1={convertText(forumData.name)}
            desc={
              forumData.description.length > 0 && (
                <ReadOnlyEditor
                  className="[&_p]:m-0"
                  value={forumData.description}
                />
              )
            }
            className="m-0"
          >
            <ActionsForumsForum permissions={forumData.permissions} />
          </HeaderContent>
        </CardHeader>

        {forumData.children && forumData.children.length > 0 && (
          <CardContent className="p-0">
            {forumData.children.map(child => (
              <ItemForum key={child.id} {...child} />
            ))}
          </CardContent>
        )}
      </Card>

      <Card>
        <CardContent className="p-0">
          {forum_topics__show.edges.length > 0 ? (
            <TopicsListForum initData={forum_topics__show} />
          ) : (
            <div className="p-5 flex flex-col items-center justify-center gap-4 text-center">
              <span>{t("not_found")}</span>
              <ActionsForumsForum permissions={forumData.permissions} />
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}

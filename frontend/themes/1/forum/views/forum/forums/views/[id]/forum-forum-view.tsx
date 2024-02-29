import { useTranslations } from "next-intl";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useTextLang } from "@/hooks/core/use-text-lang";
import { ActionsForumsForum } from "./actions/action";
import type { Forum_Forums__Show_ItemQuery } from "@/graphql/hooks";
import { TopicsListForum } from "./topics-list/topics-list";
import { ReadOnlyEditor } from "@/components/editor/read-only/read-only-editor";
import { HeaderContent } from "@/components/header-content/header-content";

import { ItemForum } from "../../item/item-forum";

export interface ForumForumViewProps {
  data: Forum_Forums__Show_ItemQuery;
}

export default function ForumForumView({
  data: { forum_forums__show, forum_topics__show }
}: ForumForumViewProps) {
  const { convertText } = useTextLang();
  const t = useTranslations("forum.topics");

  const { edges } = forum_forums__show;
  const forumData = edges.at(0);
  if (!forumData) return null;

  return (
    <>
      <Card className="mb-8">
        <CardHeader className="py-4">
          <HeaderContent
            h1={convertText(forumData.name)}
            desc={
              forumData.description.length > 0 && (
                <ReadOnlyEditor
                  id={`${forumData.id}_description`}
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
          <CardContent className="p-0 border-t">
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

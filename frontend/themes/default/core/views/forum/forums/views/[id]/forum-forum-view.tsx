import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTextLang } from '@/hooks/core/use-text-lang';
import { ActionsForumsForum } from './actions/actions';
import { Forum_Forums__Show_ItemQuery } from '@/graphql/hooks';
import { TopicsListForum } from './topics-list/topics-list';

import { ItemForum } from '../../item/item-forum';
import { DescriptionItemForum } from '../../item/description';

interface Props {
  data: Forum_Forums__Show_ItemQuery;
}

export const ForumForumView = ({ data: { forum_forums__show, forum_topics__show } }: Props) => {
  const { convertText } = useTextLang();

  const { edges } = forum_forums__show;
  const forumData = edges.at(0);
  if (!forumData) return null;

  return (
    <>
      <Card>
        <CardHeader className="border-b">
          <CardTitle>{convertText(forumData.name)}</CardTitle>

          {forumData.description.length > 0 && (
            <DescriptionItemForum id={forumData.id} description={forumData.description} />
          )}
        </CardHeader>

        {forumData.children && forumData.children.length > 0 && (
          <CardContent className="p-0">
            {forumData.children.map(child => (
              <ItemForum key={child.id} {...child} />
            ))}
          </CardContent>
        )}
      </Card>

      <ActionsForumsForum />

      <TopicsListForum data={forum_topics__show.edges} />
    </>
  );
};

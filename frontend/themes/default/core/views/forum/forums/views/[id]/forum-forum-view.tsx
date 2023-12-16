'use client';

import { Virtuoso } from 'react-virtuoso';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTextLang } from '@/hooks/core/use-text-lang';
import { ActionsForumsForum } from './actions/actions';
import { Forum_Forums__Show_ItemQuery } from '@/graphql/hooks';

import { ItemForum } from '../../item/item-forum';
import { DescriptionItemForum } from '../../item/description';

export const ForumForumView = ({
  forum_forums__show,
  forum_topics__show
}: Forum_Forums__Show_ItemQuery) => {
  // const { data } = useItemShowForumsAPI();
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

      <Virtuoso
        data={forum_topics__show.edges}
        useWindowScroll
        itemContent={(index, data) => (
          <div>
            {index} - {convertText(data.title)}
          </div>
        )}
      />
    </>
  );
};

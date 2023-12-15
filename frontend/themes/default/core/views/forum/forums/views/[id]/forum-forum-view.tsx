'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useItemShowForumsAPI } from '@/hooks/forums/forum/use-item-show-forums-api';
import { useTextLang } from '@/hooks/core/use-text-lang';
import { ReadOnlyEditor } from '@/components/editor/read-only/read-only-editor';
import { ActionsForumsForum } from './actions/actions';

import { ItemForum } from '../../list/item-forum';

export const ForumForumView = () => {
  const { data } = useItemShowForumsAPI();
  const { convertText } = useTextLang();

  if (!data) return <div>Not found</div>;

  return (
    <>
      <Card>
        <CardHeader className="border-b">
          <CardTitle>{convertText(data.name)}</CardTitle>

          <ReadOnlyEditor
            id={`${data.id}_description`}
            className="text-sm text-muted-foreground [&_p]:m-0"
            value={data.description}
          />
        </CardHeader>

        {data.children && data.children.length > 0 && (
          <CardContent className="p-0">
            {data.children.map(child => (
              <ItemForum key={child.id} {...child} />
            ))}
          </CardContent>
        )}
      </Card>

      <ActionsForumsForum />
    </>
  );
};

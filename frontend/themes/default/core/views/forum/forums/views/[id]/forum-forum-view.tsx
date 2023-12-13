'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useItemShowForumsAPI } from './hooks/use-item-show-forums-api';
import { useTextLang } from '@/hooks/core/use-text-lang';
import { ReadOnlyEditor } from '@/components/editor/read-only/read-only-editor';

import { ItemForum } from '../../item';

export const ForumForumView = () => {
  const { data } = useItemShowForumsAPI();
  const { convertText } = useTextLang();

  if (!data) return <div>Not found</div>;

  return (
    <>
      <Card>
        <CardHeader className="border-b">
          <CardTitle>{convertText(data.name)}</CardTitle>
          {data.description.length > 0 && (
            <CardDescription className="[&_p]:m-0">
              <ReadOnlyEditor id={`${data.id}_description`} value={data.description} />
            </CardDescription>
          )}
        </CardHeader>

        {data.children && data.children.length > 0 && (
          <CardContent className="p-0">
            {data.children.map(child => (
              <ItemForum key={child.id} {...child} />
            ))}
          </CardContent>
        )}
      </Card>

      <Card className="mt-10">
        <CardContent className="p-6">Topics</CardContent>
      </Card>
    </>
  );
};

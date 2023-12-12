import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { ItemForum } from '../../item';

export const ForumForumView = () => {
  return (
    <>
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Test123</CardTitle>
          <CardDescription>Test123</CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          <ItemForum
            id="123"
            description={[
              {
                id_language: 'en',
                value: 'Test123'
              }
            ]}
            name={[
              {
                id_language: 'en',
                value: 'Test123'
              }
            ]}
          />
          <ItemForum
            id="123"
            description={[
              {
                id_language: 'en',
                value: 'Test123'
              }
            ]}
            name={[
              {
                id_language: 'en',
                value: 'Test123'
              }
            ]}
          />
        </CardContent>
      </Card>

      <Card className="mt-10">
        <CardContent className="p-6">Topics</CardContent>
      </Card>
    </>
  );
};

import { useTranslations } from 'next-intl';
import { MoreHorizontal, MoreVertical } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AvatarUser } from '@/components/user/avatar/avatar-user';
import { DateFormat } from '@/components/date-format/date-format';
import { badgeVariants } from '@/components/ui/badge';
import { Link } from '@/i18n';
import { Button } from '@/components/ui/button';

export const TopicView = () => {
  const t = useTranslations('forum.topics');

  return (
    <>
      <Card className="p-5">
        <CardHeader className="p-0 pb-5 gap-4 sm:flex-row flex-wrap items-center">
          <CardTitle className="leading-tight">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry
          </CardTitle>

          <div className="ml-auto">
            <Button variant="ghost" size="icon">
              <MoreVertical />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="border-t p-0 pt-5 flex gap-4 flex-wrap">
          <div className="flex gap-3 items-center">
            <AvatarUser sizeInRem={2.5} />
            <div>
              <div className="font-bold">Lorem Ipsum is simply dummy text of the </div>
              <div className="text-sm text-muted-foreground">
                {t.rich('date_and_forum_format', {
                  date: () => <DateFormat date={1702920914} />,
                  forum: () => (
                    <Link href="#" className={badgeVariants()}>
                      Test
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardContent className="p-0">
          <div className="p-5">
            <Button variant="ghost" size="icon">
              <MoreHorizontal />
            </Button>
          </div>

          <div className="p-5 pt-0">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the standard dummy text ever since the 1500s, when an unknown printer took a
            galley of type and scrambled it to make a type specimen book. It has survived not only
            five centuries, but also the leap into electronic typesetting, remaining essentially
            unchanged. It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop publishing software like
            Aldus PageMaker including versions of Lorem Ipsum.
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardContent className="p-0">Post</CardContent>
      </Card>
    </>
  );
};

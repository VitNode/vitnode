import { useTranslations } from 'next-intl';
import { ChevronDown, MessagesSquare, MoreHorizontal, Settings } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { AvatarUser } from '@/components/user/avatar/avatar-user';
import { DateFormat } from '@/components/date-format/date-format';
import { badgeVariants } from '@/components/ui/badge';
import { Link } from '@/i18n';
import { Button } from '@/components/ui/button';

export const TopicView = () => {
  const t = useTranslations('forum.topics');

  return (
    <div className="flex flex-col md:flex-row gap-5">
      <div className="flex-1">
        <div className="flex flex-col gap-2">
          <div className="flex gap-4 items-center sm:flex-row flex-col">
            <div className="order-1 sm:order-2">
              <Button variant="outline" size="sm">
                <Settings /> Actions <ChevronDown />
              </Button>
            </div>

            <h1 className="text-2xl font-semibold tracking-tight leading-tight sm:order-1 order-2 flex-1">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry
            </h1>
          </div>

          <div>
            {t.rich('user_wrote_in_forum', {
              user: () => <span className="font-semibold">aXenDeveloper</span>,
              forum: () => (
                <Link href="#" className={badgeVariants()}>
                  <MessagesSquare /> Test forum
                </Link>
              )
            })}
          </div>
        </div>

        <Card className="mt-6">
          <CardContent className="p-0">
            <div className="p-4 pb-0 flex gap-4 items-center">
              <div className="flex-1 flex gap-2 items-center">
                <AvatarUser sizeInRem={2} />
                <div className="flex flex-col leading-none">
                  <div>
                    {t.rich('username_format', {
                      user: () => <span className="font-semibold">aXenDeveloper</span>,
                      date: () => (
                        <span className="text-muted-foreground text-sm">
                          <DateFormat date={1702920914} />
                        </span>
                      )
                    })}
                  </div>
                  <div className="text-muted-foreground text-sm">Administrator</div>
                </div>
              </div>

              <Button variant="ghost" size="icon">
                <MoreHorizontal />
              </Button>
            </div>

            <div className="p-4">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the standard dummy text ever since the 1500s, when an unknown printer took a
              galley of type and scrambled it to make a type specimen book. It has survived not only
              five centuries, but also the leap into electronic typesetting, remaining essentially
              unchanged. It was popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem Ipsum.
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="w-1/4">Sidebar</div>
    </div>
  );
};

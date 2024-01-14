'use client';

import { Suspense, lazy, useState } from 'react';
import { useTranslations } from 'next-intl';

import { Card, CardContent } from '@/components/ui/card';
import { AvatarUser } from '@/components/user/avatar/avatar-user';
import { useSession } from '@/hooks/core/use-session';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

const ContentCreatePost = lazy(() =>
  import('./content').then(module => ({
    default: module.ContentCreatePost
  }))
);

interface Props {
  className?: string;
}

export const CreatePost = ({ className }: Props) => {
  const t = useTranslations('forum.topics.post');
  const [open, setOpen] = useState(false);
  const { session } = useSession();
  if (!session) return null;

  return (
    <Card className={className}>
      <CardContent className="p-5 flex gap-5 items-start">
        <AvatarUser className="mt-1 hidden sm:block" sizeInRem={3} user={session} />

        {!open ? (
          <Button
            variant="outline"
            className="w-full h-full p-4 justify-start text-muted-foreground"
            onClick={() => setOpen(true)}
          >
            {t('placeholder')}
          </Button>
        ) : (
          <Suspense fallback={<Skeleton className="w-full h-[54px]" />}>
            <ContentCreatePost />
          </Suspense>
        )}
      </CardContent>
    </Card>
  );
};

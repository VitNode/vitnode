'use client';

import { useTranslations } from 'next-intl';
import { Plus } from 'lucide-react';
import { Suspense, lazy } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Loader } from '@/components/loader/loader';

const CreateTopic = lazy(() =>
  import('../../actions/create-topic').then(module => ({
    default: module.CreateTopic
  }))
);

export const ActionsForumsForum = () => {
  const t = useTranslations('forum.topics.create');

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          {t('title')}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-6xl">
        <Suspense fallback={<Loader />}>
          <CreateTopic />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
};

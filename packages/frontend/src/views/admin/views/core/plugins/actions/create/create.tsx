'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Loader } from '@/components/ui/loader';
import { CONFIG } from '@/helpers/config-with-env';
import { Link } from '@/navigation';
import { Plus, SquareArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

const Content = React.lazy(async () =>
  import('./content').then(module => ({
    default: module.CreatePluginAdmin,
  })),
);

export const CreateActionPluginAdmin = () => {
  const t = useTranslations('core');

  if (!CONFIG.node_development) {
    return (
      <Button asChild>
        <Link
          href="https://vitnode.com/docs/dev/plugins"
          rel="noreferrer noopener"
          target="_blank"
        >
          <Plus />
          {t('create')}
          <SquareArrowUpRight />
        </Link>
      </Button>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          {t('create')}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-xl">
        <React.Suspense fallback={<Loader />}>
          <Content />
        </React.Suspense>
      </DialogContent>
    </Dialog>
  );
};

'use client';

import { Pencil } from 'lucide-react';
import { useTranslations } from 'next-intl';
import * as React from 'react';

import { ShowCoreNav } from '../../../../../../../../graphql/code';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '../../../../../../../../components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../../../../../../../components/ui/tooltip';
import { Loader } from '../../../../../../../../components/ui/loader';
import { Button } from '../../../../../../../../components/ui/button';

const Content = React.lazy(async () =>
  import('../../create-edit/create-edit').then(module => ({
    default: module.ContentCreateEditNavAdmin,
  })),
);

export const EditActionTableNavAdmin = (
  props: Omit<ShowCoreNav, 'children'>,
) => {
  const t = useTranslations('core');

  return (
    <Dialog>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" ariaLabel={t('edit')}>
                <Pencil />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>

          <TooltipContent>{t('edit')}</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DialogContent className="max-w-2xl">
        <React.Suspense fallback={<Loader />}>
          <Content data={props} />
        </React.Suspense>
      </DialogContent>
    </Dialog>
  );
};

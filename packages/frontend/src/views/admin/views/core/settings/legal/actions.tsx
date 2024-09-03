'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { CreateEditLegalPage } from './create_edit/create_edit';

export const ActionsLegalSettingsAdmin = () => {
  const t = useTranslations('admin.core.settings.legal.create_edit');

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          {t('create')}
        </Button>
      </DialogTrigger>

      <CreateEditLegalPage />
    </Dialog>
  );
};

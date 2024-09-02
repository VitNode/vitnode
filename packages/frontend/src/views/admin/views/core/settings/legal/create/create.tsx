'use client';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';

export const CreateLegalPage = () => {
  const t = useTranslations('admin.core.settings.legal.create_edit');

  return (
    <Button>
      <Plus />
      {t('create')}
    </Button>
  );
};

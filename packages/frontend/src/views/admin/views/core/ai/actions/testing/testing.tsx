'use client';

import { Button } from '@/components/ui/button';
import { FlaskConical } from 'lucide-react';
import { useTranslations } from 'next-intl';

export const TestingActionAiAdmin = ({ disabled }: { disabled: boolean }) => {
  const t = useTranslations('admin.core.ai.testing');

  return (
    <Button disabled={disabled} variant="outline">
      <FlaskConical />
      {t('title')}
    </Button>
  );
};

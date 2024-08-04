import { FlaskConical } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/ui/loader';

const Content = React.lazy(async () =>
  import('./content').then(module => ({
    default: module.ContentTestingActionEmailSettingsAdmin,
  })),
);

export const TestingActionEmailSettingsAdmin = ({
  disabled,
}: {
  disabled: boolean;
}) => {
  const t = useTranslations('admin.core.settings.email.test');

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" disabled={disabled}>
          <FlaskConical />
          {t('title')}
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

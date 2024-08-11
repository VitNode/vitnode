import { useTranslations } from 'next-intl';

import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FormCreateEditPluginAdmin } from './form';

export const CreatePluginAdmin = () => {
  const t = useTranslations('admin.core.plugins');
  const tCore = useTranslations('core');

  return (
    <>
      <DialogHeader>
        <DialogTitle>{t('create.title')}</DialogTitle>
      </DialogHeader>

      <FormCreateEditPluginAdmin
        submitButton={props => (
          <DialogFooter>
            <Button {...props}>{tCore('create')}</Button>
          </DialogFooter>
        )}
      />
    </>
  );
};

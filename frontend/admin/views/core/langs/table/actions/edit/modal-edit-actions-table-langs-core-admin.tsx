import { useTranslations } from 'next-intl';

import { DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export const ModalEditActionsTableLangsCoreAdmin = () => {
  const t = useTranslations('admin');

  return (
    <>
      <DialogHeader>
        <DialogTitle>{t('core.langs.actions.edit.title')}</DialogTitle>
        <DialogDescription>This is description</DialogDescription>
      </DialogHeader>

      <div>Test</div>
    </>
  );
};

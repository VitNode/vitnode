import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Admin_Core_Terms__ShowQuery } from '@/graphql/queries/admin/settings/terms/Admin_core_terms__show.generated';
import { Pencil } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { CreateEditLegalPage } from '../../create_edit/create_edit';

export const EditContentLegalSettingsAdmin = (
  props: Admin_Core_Terms__ShowQuery['core_terms__show']['edges'][0],
) => {
  const t = useTranslations('admin.core.settings.legal.create_edit');

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button ariaLabel={t('edit')} size="icon" variant="ghost">
          <Pencil />
        </Button>
      </DialogTrigger>

      <CreateEditLegalPage data={props} />
    </Dialog>
  );
};

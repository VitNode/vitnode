import { AutoForm } from '@/components/form/auto-form';
import { AutoFormIconPicker } from '@/components/form/fields/icon-picker';
import { AutoFormInput } from '@/components/form/fields/input';
import { AutoFormSwitch } from '@/components/form/fields/switch';
import { AutoFormTextLanguageInput } from '@/components/form/fields/text-language-input';
import { Button } from '@/components/ui/button';
import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useTranslations } from 'next-intl';

import {
  CreateEditNavAdminArgs,
  useCreateEditNavAdmin,
} from './hooks/use-create-edit-nav-admin';

export const ContentCreateEditNavAdmin = ({ data }: CreateEditNavAdminArgs) => {
  const t = useTranslations('admin.core.styles.nav');
  const tCore = useTranslations('core');
  const { onSubmit, formSchema } = useCreateEditNavAdmin({ data });

  return (
    <>
      <DialogHeader>
        <DialogTitle>{data ? t('edit.title') : t('create.title')}</DialogTitle>
      </DialogHeader>

      <AutoForm
        fields={[
          {
            id: 'name',
            component: AutoFormTextLanguageInput,
            label: t('create.name.label'),
          },
          {
            id: 'description',
            component: AutoFormTextLanguageInput,
            label: t('create.description.label'),
          },
          {
            id: 'href',
            component: AutoFormInput,
            label: t('create.href.label'),
            description: t('create.href.desc'),
          },
          {
            id: 'icon',
            component: AutoFormIconPicker,
            label: t('create.icon.label'),
          },
          {
            id: 'external',
            component: AutoFormSwitch,
            label: t('create.external.label'),
            description: t('create.external.desc'),
          },
        ]}
        formSchema={formSchema}
        onSubmit={onSubmit}
        submitButton={props => (
          <DialogFooter>
            <Button {...props}>{tCore(data ? 'edit' : 'create')}</Button>
          </DialogFooter>
        )}
      />
    </>
  );
};

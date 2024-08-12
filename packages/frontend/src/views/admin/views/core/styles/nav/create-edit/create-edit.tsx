import { useTranslations } from 'next-intl';

import {
  useCreateEditNavAdmin,
  CreateEditNavAdminArgs,
} from './hooks/use-create-edit-nav-admin';
import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AutoForm } from '@/components/form/auto-form';
import { AutoFormInput } from '@/components/form/fields/input';
import { AutoFormIcon } from '@/components/form/fields/icon';
import { AutoFormSwitch } from '@/components/form/fields/switch';
import { AutoFormTextLanguageInput } from '@/components/form/fields/text-language-input';

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
        formSchema={formSchema}
        onSubmit={onSubmit}
        submitButton={props => (
          <DialogFooter>
            <Button {...props}>{tCore(data ? 'edit' : 'create')}</Button>
          </DialogFooter>
        )}
        fieldConfig={{
          name: {
            label: t('create.name.label'),
            fieldType: AutoFormTextLanguageInput,
          },
          description: {
            label: t('create.description.label'),
            fieldType: AutoFormTextLanguageInput,
          },
          href: {
            label: t('create.href.label'),
            description: t('create.href.desc'),
            fieldType: AutoFormInput,
          },
          icon: {
            label: t('create.icon.label'),
            fieldType: AutoFormIcon,
          },
          external: {
            label: t('create.external.label'),
            description: t('create.external.desc'),
            fieldType: AutoFormSwitch,
          },
        }}
      />
    </>
  );
};

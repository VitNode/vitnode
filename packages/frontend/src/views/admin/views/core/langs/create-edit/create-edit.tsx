import { AutoForm } from '@/components/auto-form/auto-form';
import {
  AutoFormCombobox,
  AutoFormComboboxProps,
} from '@/components/auto-form/fields/combobox';
import { AutoFormInput } from '@/components/auto-form/fields/input';
import { AutoFormSwitch } from '@/components/auto-form/fields/switch';
import { DependencyType } from '@/components/form/type';
import { Button } from '@/components/ui/button';
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ShowCoreLanguages } from '@/graphql/types';
import { useTranslations } from 'next-intl';

import { useCreateEditLangAdmin } from './hooks/use-create-edit-lang-admin';
import { locales } from './locales';

export const CreateEditLangAdmin = ({ data }: { data?: ShowCoreLanguages }) => {
  const t = useTranslations('admin.core.langs.actions');
  const { onSubmit, formSchema } = useCreateEditLangAdmin({ data });

  return (
    <>
      <DialogHeader>
        <DialogTitle>{t(data ? 'edit.title' : 'create.title')}</DialogTitle>
        {data?.name && <DialogDescription>{data.name}</DialogDescription>}
      </DialogHeader>

      <AutoForm
        dependencies={[
          {
            sourceField: 'default',
            type: DependencyType.HIDES,
            targetField: 'default',
            when: () => !data,
          },
          {
            sourceField: 'code',
            type: DependencyType.HIDES,
            targetField: 'code',
            when: () => !!data,
          },
        ]}
        fields={[
          {
            id: 'name',
            component: AutoFormInput,
            label: t('create.name.label'),
          },
          {
            id: 'timezone',
            label: t('create.timezone.label'),
            component: AutoFormCombobox,
            componentProps: {
              labels: Object.fromEntries(
                locales.map(item => [
                  item.locale,
                  `${item.name} - ${item.locale}`,
                ]),
              ),
            } as AutoFormComboboxProps,
          },
          {
            id: 'locale',
            component: AutoFormCombobox,
            label: t('create.locale.label'),
            componentProps: {
              labels: Object.fromEntries(
                locales.map(item => [
                  item.locale,
                  `${item.name} - ${item.locale}`,
                ]),
              ),
            } as AutoFormComboboxProps,
          },
          {
            id: 'code',
            component: AutoFormInput,
            label: t('create.code.label'),
          },
          {
            id: 'time_24',
            component: AutoFormSwitch,
            label: t('create.time_24.label'),
            description: t('create.time_24.desc'),
          },
          {
            id: 'allow_in_input',
            component: AutoFormSwitch,
            label: t('create.allow_in_input.label'),
            description: t('create.allow_in_input.desc'),
          },
          {
            id: 'default',
            component: AutoFormSwitch,
            label: t('edit.default.label'),
            description: t('edit.default.desc'),
          },
        ]}
        formSchema={formSchema}
        onSubmit={onSubmit}
        submitButton={props => (
          <Button {...props}>
            {t(data ? 'edit.submit' : 'create.submit')}
          </Button>
        )}
      />
    </>
  );
};

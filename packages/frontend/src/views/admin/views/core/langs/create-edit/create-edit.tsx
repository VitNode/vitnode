import { AutoForm } from '@/components/form/auto-form';
import { AutoFormCombobox } from '@/components/form/fields/combobox';
import { AutoFormInput } from '@/components/form/fields/input';
import { AutoFormSwitch } from '@/components/form/fields/switch';
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
        fieldConfig={{
          name: {
            label: t('create.name.label'),
            fieldType: props => (
              <AutoFormInput
                placeholder={t('create.name.placeholder')}
                {...props}
              />
            ),
          },
          timezone: {
            label: t('create.timezone.label'),
            fieldType: AutoFormCombobox,
          },
          locale: {
            label: t('create.locale.label'),
            fieldType: props => (
              <AutoFormCombobox
                {...props}
                labels={Object.fromEntries(
                  locales.map(item => [
                    item.locale,
                    `${item.name} - ${item.locale}`,
                  ]),
                )}
              />
            ),
          },
          code: {
            label: t('create.code.label'),
            fieldType: props => <AutoFormInput {...props} />,
            description: t('create.code.desc'),
          },
          time_24: {
            label: t('create.time_24.label'),
            fieldType: props => <AutoFormSwitch {...props} />,
            description: t('create.time_24.desc'),
          },
          allow_in_input: {
            label: t('create.allow_in_input.label'),
            fieldType: props => <AutoFormSwitch {...props} />,
            description: t('create.allow_in_input.desc'),
          },
          default: {
            label: t('edit.default.label'),
            fieldType: props => <AutoFormSwitch {...props} />,
            description: t('edit.default.desc'),
          },
        }}
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

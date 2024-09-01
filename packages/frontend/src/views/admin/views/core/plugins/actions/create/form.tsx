import { AutoForm } from '@/components/form/auto-form';
import {
  AutoFormInput,
  AutoFormInputProps,
} from '@/components/form/fields/input';
import { ShowAdminPlugins } from '@/graphql/types';
import { useTranslations } from 'next-intl';

import { useCreateEditPluginAdmin } from './hooks/use-create-edit-plugin-admin';

export const FormCreateEditPluginAdmin = ({
  data,
  submitButton,
  className,
}: {
  className?: string;
  data?: ShowAdminPlugins;
  submitButton: React.ComponentProps<typeof AutoForm>['submitButton'];
}) => {
  const t = useTranslations('admin.core.plugins');
  const { onSubmit, formSchema } = useCreateEditPluginAdmin({ data });

  return (
    <AutoForm
      className={className}
      fields={[
        {
          id: 'name',
          component: AutoFormInput,
          label: t('create.name.label'),
        },
        {
          id: 'description',
          component: AutoFormInput,
          label: t('create.description.label'),
        },
        {
          id: 'code',
          component: AutoFormInput,
          componentProps: {
            placeholder: 'vitnode-plugin-example',
          } as AutoFormInputProps,
          label: t('create.code.label'),
          description: t('create.code.desc'),
        },
        {
          id: 'support_url',
          component: AutoFormInput,
          componentProps: {
            type: 'url',
          } as AutoFormInputProps,
          label: t('create.support_url.label'),
          description: t('create.support_url.desc'),
        },
        {
          id: 'author',
          component: AutoFormInput,
          label: t('create.author.label'),
          description: t('create.author.desc'),
        },
        {
          id: 'author_url',
          component: AutoFormInput,
          componentProps: {
            type: 'url',
          } as AutoFormInputProps,
          label: t('create.author_url.label'),
          description: t('create.author_url.desc'),
        },
      ]}
      formSchema={formSchema}
      onSubmit={onSubmit}
      submitButton={submitButton}
    />
  );
};

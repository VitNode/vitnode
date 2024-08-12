import { useTranslations } from 'next-intl';

import { AutoFormInput } from '@/components/form/fields/input';
import { AutoForm } from '@/components/form/auto-form';
import { useCreateEditPluginAdmin } from './hooks/use-create-edit-plugin-admin';
import { ShowAdminPlugins } from '@/graphql/types';

export const FormCreateEditPluginAdmin = ({
  data,
  submitButton,
  className,
}: {
  submitButton: React.ComponentProps<typeof AutoForm>['submitButton'];
  className?: string;
  data?: ShowAdminPlugins;
}) => {
  const t = useTranslations('admin.core.plugins');
  const { onSubmit, formSchema } = useCreateEditPluginAdmin({ data });

  return (
    <AutoForm
      className={className}
      formSchema={formSchema}
      onSubmit={onSubmit}
      submitButton={submitButton}
      fieldConfig={{
        name: {
          label: t('create.name.label'),
          description: t('create.name.desc'),
          fieldType: AutoFormInput,
        },
        description: {
          label: t('create.description.label'),
          fieldType: AutoFormInput,
        },
        code: {
          label: t('create.code.label'),
          description: t('create.code.desc'),
          fieldType: props => (
            <AutoFormInput placeholder="vitnode-plugin-example" {...props} />
          ),
        },
        support_url: {
          label: t('create.support_url.label'),
          description: t('create.support_url.desc'),
          fieldType: props => <AutoFormInput type="url" {...props} />,
        },
        author: {
          label: 'Author',
          description: 'The author of the plugin',
          fieldType: AutoFormInput,
        },
        author_url: {
          label: 'Author URL',
          description: 'The URL of the author',
          fieldType: props => <AutoFormInput type="url" {...props} />,
        },
      }}
    />
  );
};

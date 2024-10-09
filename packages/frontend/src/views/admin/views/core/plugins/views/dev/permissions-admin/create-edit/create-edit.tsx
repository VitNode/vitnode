import { AutoForm } from '@/components/form/auto-form';
import {
  AutoFormInput,
  AutoFormInputProps,
} from '@/components/form/fields/input';
import { AutoFormSelect } from '@/components/form/fields/select';
import { Admin__Core_Plugins__Permissions_Admin__ShowQuery } from '@/graphql/queries/admin/plugins/dev/permissions-admin/admin__core_plugins__permissions_admin__show.generated';
import { useTranslations } from 'next-intl';

import { useCreateEditPermissionAdminPluginAdmin } from './hooks/use-create-edit-permission-admin-plugin-admin';

export const CreateEditPermissionsAdminDevPluginAdmin = ({
  dataFromSSR,
  data,
  parentId,
}: {
  data?: Admin__Core_Plugins__Permissions_Admin__ShowQuery['admin__core_plugins__permissions_admin__show'][0];
  dataFromSSR: Admin__Core_Plugins__Permissions_Admin__ShowQuery;
  parentId?: string;
}) => {
  const t = useTranslations(
    'admin.core.plugins.dev.permissions-admin.create_edit',
  );
  const { formSchema, onSubmit } = useCreateEditPermissionAdminPluginAdmin({
    dataFromSSR,
    data,
    parentId,
  });

  return (
    <AutoForm
      fields={[
        {
          id: 'id',
          component: AutoFormInput,
          label: t('id.label'),
          description: t('id.desc'),
        },
        {
          id: 'parent_id',
          label: t('parent.label'),
          component: AutoFormSelect,
          componentProps: {
            labels: {
              null: t('parent.null'),
            },
          } as AutoFormInputProps,
        },
      ]}
      formSchema={formSchema}
      onSubmit={onSubmit}
    />
  );
};

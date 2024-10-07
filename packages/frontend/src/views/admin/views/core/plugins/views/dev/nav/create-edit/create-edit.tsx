import { AutoForm, DependencyType } from '@/components/form/auto-form';
import { AutoFormIconPicker } from '@/components/form/fields/icon-picker';
import {
  AutoFormInput,
  AutoFormInputProps,
} from '@/components/form/fields/input';
import { AutoFormSelect } from '@/components/form/fields/select';
import { AutoFormTagInput } from '@/components/form/fields/tags-input';
import { Admin__Core_Plugins__Nav__ShowQuery } from '@/graphql/queries/admin/plugins/dev/nav/admin__core_plugins__nav__show.generated';
import { ShowAdminNavPluginsObj } from '@/graphql/types';
import { TextAndIconsAsideAdmin } from '@/views/admin/layout/admin-layout';
import { Ban } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useCreateNavPluginAdmin } from './hooks/use-create-nav-plugin-admin';

export const CreateEditNavDevPluginAdmin = ({
  data,
  dataFromSSR,
  textsAndIcons,
  parentId,
}: {
  data?: ShowAdminNavPluginsObj;
  dataFromSSR: Admin__Core_Plugins__Nav__ShowQuery['admin__core_plugins__nav__show'];
  parentId?: string;
  textsAndIcons: TextAndIconsAsideAdmin[];
}) => {
  const t = useTranslations('admin.core.plugins.dev.nav');
  const { onSubmit, formSchema } = useCreateNavPluginAdmin({
    data,
    parentId,
    dataFromSSR,
  });

  return (
    <AutoForm
      dependencies={[
        {
          sourceField: 'parent_code',
          type: DependencyType.HIDES,
          targetField: 'parent_code',
          when: () => !!data,
        },
      ]}
      fields={[
        {
          id: 'code',
          label: t('create.code.label'),
          description: t('create.code.desc'),
          component: AutoFormInput,
        },
        {
          id: 'parent_code',
          label: t('create.parent.label'),
          component: AutoFormSelect,
          componentProps: {
            labels: {
              null: (
                <div className="flex flex-wrap items-center gap-2">
                  <Ban className="text-muted-foreground size-4" />
                  <span>{t('create.parent.null')}</span>
                </div>
              ),
              ...Object.fromEntries(
                dataFromSSR.map(nav => {
                  const textAndIcon = textsAndIcons.find(
                    item => item.id === nav.code,
                  );

                  if (!textAndIcon) return [nav.code, nav.code];

                  return [
                    nav.code,
                    <div
                      className="flex flex-wrap items-center gap-2"
                      key={nav.code}
                    >
                      {textAndIcon.icon}

                      <span>{textAndIcon.text}</span>
                    </div>,
                  ];
                }),
              ),
            },
          } as AutoFormInputProps,
        },
        {
          id: 'icon',
          label: t('create.icon.label'),
          component: AutoFormIconPicker,
        },
        {
          id: 'keywords',
          label: t('create.keywords.label'),
          description: t('create.keywords.desc'),
          component: AutoFormTagInput,
          componentProps: {
            multiple: true,
          } as AutoFormInputProps,
        },
      ]}
      formSchema={formSchema}
      onSubmit={onSubmit}
    />
  );
};

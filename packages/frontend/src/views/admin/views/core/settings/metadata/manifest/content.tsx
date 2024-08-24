'use client';

import { AutoForm } from '@/components/form/auto-form';
import { AutoFormColor } from '@/components/form/fields/color';
import { AutoFormInput } from '@/components/form/fields/input';
import { AutoFormRadioGroup } from '@/components/form/fields/radio-group';
import { FieldRenderParentProps } from '@/components/form/type';
import { Admin__Core_Manifest_Metadata__ShowQuery } from '@/graphql/queries/admin/settings/admin__core_manifest_metadata__show.generated';
import { CONFIG } from '@/helpers/config-with-env';
import { useTranslations } from 'next-intl';

import { useManifestCoreAdminView } from './hooks/use-manifest-core-admin-view';

export const ContentManifestMetadataCoreAdmin = (
  props: Admin__Core_Manifest_Metadata__ShowQuery,
) => {
  const t = useTranslations('admin.core.metadata.manifest');
  const { onSubmit, formSchema } = useManifestCoreAdminView(props);

  return (
    <AutoForm
      fieldConfig={{
        display: {
          label: t('display.label'),
          fieldType: props => (
            <AutoFormRadioGroup
              {...props}
              labels={{
                fullscreen: {
                  title: t('display.fullscreen.title'),
                  description: t('display.fullscreen.desc'),
                },
                standalone: {
                  title: t('display.standalone.title'),
                  description: t('display.standalone.desc'),
                },
                'minimal-ui': {
                  title: t('display.minimal-ui.title'),
                  description: t('display.minimal-ui.desc'),
                },
                browser: {
                  title: t('display.browser.title'),
                  description: t('display.browser.desc'),
                },
              }}
            />
          ),
          description: t('display.desc'),
        },
        start_url: {
          label: t('start_url.label'),
          description: t('start_url.desc'),
          fieldType: props => <AutoFormInput className="w-64" {...props} />,
          renderParent: ({ children }: FieldRenderParentProps) => (
            <div className="flex flex-wrap items-center gap-1">
              <span>{CONFIG.frontend_url}</span>
              {children}
            </div>
          ),
        },
        theme_color: {
          label: t('theme_color.label'),
          fieldType: AutoFormColor,
        },
        background_color: {
          label: t('background_color.label'),
          fieldType: AutoFormColor,
        },
      }}
      formSchema={formSchema}
      onSubmit={onSubmit}
      theme="horizontal"
    />
  );
};

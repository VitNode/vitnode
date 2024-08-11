'use client';

import { useTranslations } from 'next-intl';

import { useManifestCoreAdminView } from './hooks/use-manifest-core-admin-view';
import { CONFIG } from '@/helpers/config-with-env';
import { Admin__Core_Manifest_Metadata__ShowQuery } from '@/graphql/queries/admin/settings/admin__core_manifest_metadata__show.generated';
import { AutoForm } from '@/components/ui/auto-form';
import { AutoFormRadioGroup } from '@/components/ui/auto-form/fields/radio-group';
import { AutoFormInput } from '@/components/ui/auto-form/fields/input';
import { AutoFormColor } from '@/components/ui/auto-form/fields/color';

export const ContentManifestMetadataCoreAdmin = (
  props: Admin__Core_Manifest_Metadata__ShowQuery,
) => {
  const t = useTranslations('admin.core.metadata.manifest');
  const { onSubmit, formSchema } = useManifestCoreAdminView(props);

  return (
    <AutoForm
      theme="horizontal"
      formSchema={formSchema}
      onSubmit={onSubmit}
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
          renderParent: ({ children }) => (
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
    />
  );
};

'use client';

import { AutoForm } from '@/components/form/auto-form';
import { AutoFormColorPicker } from '@/components/form/fields/color-picker';
import { AutoFormInput } from '@/components/form/fields/input';
import { AutoFormRadioGroup } from '@/components/form/fields/radio-group';
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
      fields={[
        {
          id: 'display',
          label: t('display.label'),
          description: t('display.desc'),
          component: props => (
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
        },
        {
          id: 'start_url',
          component: props => (
            <AutoFormInput {...props} className="order-2 w-64" />
          ),
          wrapper: ({ children }) => (
            <div className="flex flex-wrap items-center gap-1">
              {children}
              <span className="order-1">{CONFIG.frontend_url}</span>
            </div>
          ),
          label: t('start_url.label'),
          description: t('start_url.desc'),
        },
        {
          id: 'theme_color',
          label: t('theme_color.label'),
          component: AutoFormColorPicker,
        },
        {
          id: 'background_color',
          label: t('background_color.label'),
          component: AutoFormColorPicker,
        },
      ]}
      formSchema={formSchema}
      onSubmit={onSubmit}
      theme="horizontal"
    />
  );
};

'use client';

import { AutoForm } from '@/components/form/auto-form';
import { AutoFormRadioGroup } from '@/components/form/fields/radio-group';
import { AutoFormSwitch } from '@/components/form/fields/switch';
import { Core_GlobalQuery } from '@/graphql/queries/core_global.generated';
import { useTranslations } from 'next-intl';

import { useEditorAdmin } from './hooks/use-editor-admin';

export const ContentEditorAdmin = (
  data: Core_GlobalQuery['core_middleware__show']['editor'],
) => {
  const t = useTranslations('admin.core.styles.editor');
  const { onSubmit, formSchema } = useEditorAdmin(data);

  return (
    <AutoForm
      fields={[
        {
          id: 'sticky',
          label: t('sticky.label'),
          description: t('sticky.desc'),
          component: AutoFormSwitch,
        },
        {
          id: 'files.allow_type',
          label: t('files.allow_type.title'),
          component: props => (
            <AutoFormRadioGroup
              {...props}
              labels={{
                all: {
                  title: t('files.allow_type.all'),
                },
                images_videos: {
                  title: t('files.allow_type.images_videos'),
                },
                images: {
                  title: t('files.allow_type.images'),
                },
                none: {
                  title: t('files.allow_type.none'),
                },
              }}
            />
          ),
        },
      ]}
      formSchema={formSchema}
      onSubmit={onSubmit}
      theme="horizontal"
    />
  );
};

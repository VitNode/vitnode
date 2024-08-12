'use client';

import { useTranslations } from 'next-intl';

import { useEditorAdmin } from './hooks/use-editor-admin';
import { Card } from '@/components/ui/card';
import { Core_GlobalQuery } from '@/graphql/queries/core_global.generated';
import { AutoForm } from '@/components/form/auto-form';
import { AutoFormInputComponentProps } from '@/components/form/type';
import { AutoFormRadioGroup } from '@/components/form/fields/radio-group';
import { AutoFormSwitch } from '@/components/form/fields/switch';

export const ContentEditorAdmin = (
  data: Core_GlobalQuery['core_middleware__show']['editor'],
) => {
  const t = useTranslations('admin.core.styles.editor');
  const { onSubmit, formSchema } = useEditorAdmin(data);

  return (
    <Card className="p-6">
      <AutoForm
        theme="horizontal"
        formSchema={formSchema}
        onSubmit={onSubmit}
        fieldConfig={{
          sticky: {
            label: t('sticky.label'),
            description: t('sticky.desc'),
            fieldType: AutoFormSwitch,
          },
          files: {
            allow_type: {
              label: t('files.allow_type.title'),
              fieldType: (props: AutoFormInputComponentProps) => (
                <AutoFormRadioGroup
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
                  {...props}
                />
              ),
            },
          },
        }}
      />
    </Card>
  );
};

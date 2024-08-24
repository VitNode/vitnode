import { AutoForm } from '@/components/form/auto-form';
import { AutoFormInput } from '@/components/form/fields/input';
import { AutoFormRadioGroup } from '@/components/form/fields/radio-group';
import { DependencyType } from '@/components/form/type';
import { Button } from '@/components/ui/button';
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ShowAdminPlugins } from '@/graphql/types';
import { useTranslations } from 'next-intl';

import { useDownloadPluginAdmin } from './hooks/use-download-plugin-admin';

export const ContentDownloadActionDevPluginAdmin = ({
  code,
  name,
  version,
  version_code,
}: ShowAdminPlugins) => {
  const t = useTranslations('admin.core.plugins.download');
  const { onSubmit, formSchema } = useDownloadPluginAdmin({
    version_code,
    version,
    code,
  });

  return (
    <>
      <DialogHeader>
        <DialogTitle>{t('title')}</DialogTitle>
        <DialogDescription className="text-muted-foreground text-sm">
          {name}
        </DialogDescription>
      </DialogHeader>

      <AutoForm
        dependencies={[
          {
            sourceField: 'type',
            type: DependencyType.HIDES,
            targetField: 'version',
            when: (provider: string) => provider !== 'new_version',
          },
          {
            sourceField: 'type',
            type: DependencyType.HIDES,
            targetField: 'version_code',
            when: (provider: string) => provider !== 'new_version',
          },
          {
            sourceField: 'type',
            type: DependencyType.SETS_OPTIONS,
            targetField: 'type',
            when: () => !version_code,
            options: ['new_version'],
          },
        ]}
        fieldConfig={{
          type: {
            fieldType: props => (
              <AutoFormRadioGroup
                {...props}
                labels={{
                  rebuild: {
                    title: t('type.rebuild', {
                      version: `${version} (${version_code})`,
                    }),
                  },
                  new_version: {
                    title: t('type.new_version'),
                  },
                }}
              />
            ),
          },
          version: {
            label: t('version.label'),
            fieldType: AutoFormInput,
          },
          version_code: {
            label: t('version_code.label'),
            fieldType: props => <AutoFormInput type="number" {...props} />,
          },
        }}
        formSchema={formSchema}
        onSubmit={onSubmit}
        submitButton={props => (
          <DialogFooter>
            <Button {...props}>{t('submit')}</Button>
          </DialogFooter>
        )}
      />
    </>
  );
};

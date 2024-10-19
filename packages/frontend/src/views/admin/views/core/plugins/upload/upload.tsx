import { AutoForm } from '@/components/form/auto-form';
import { AutoFormFileInput } from '@/components/form/fields/file-input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { ShowAdminPlugins } from '@/graphql/types';
import { useTranslations } from 'next-intl';

import { useUploadPluginAdmin } from './hooks/use-upload-plugin-admin';

export interface UploadPluginAdminProps {
  data?: Pick<ShowAdminPlugins, 'code' | 'name'>;
}

export const UploadPluginAdmin = ({ data }: UploadPluginAdminProps) => {
  const t = useTranslations('admin.core.plugins.upload');
  const { onSubmit, formSchema } = useUploadPluginAdmin({ data });

  return (
    <>
      <Alert variant="primary">
        <AlertDescription>{t('info')}</AlertDescription>
      </Alert>

      <AutoForm
        fields={[
          {
            id: 'file',
            component: props => (
              <AutoFormFileInput
                {...props}
                acceptExtensions={['tgz']}
                maxFileSizeInMb={0}
                showInfo
              />
            ),
          },
        ]}
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

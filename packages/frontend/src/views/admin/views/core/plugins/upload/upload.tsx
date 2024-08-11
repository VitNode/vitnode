import { useTranslations } from 'next-intl';

import { useUploadPluginAdmin } from './hooks/use-upload-plugin-admin';
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ShowAdminPlugins } from '@/graphql/types';
import { AutoForm } from '@/components/ui/auto-form';
import { AutoFormFile } from '@/components/ui/auto-form/fields/file';
import { AutoFormInputComponentProps } from '@/components/ui/auto-form/type';

export interface UploadPluginAdminProps {
  data?: Pick<ShowAdminPlugins, 'code' | 'name'>;
}

export const UploadPluginAdmin = ({ data }: UploadPluginAdminProps) => {
  const t = useTranslations('admin.core.plugins.upload');
  const { onSubmit, formSchema } = useUploadPluginAdmin({ data });

  return (
    <>
      <DialogHeader>
        <DialogTitle>{t(data ? 'title_new_version' : 'title')}</DialogTitle>
        {data?.name && <DialogDescription>{data.name}</DialogDescription>}
      </DialogHeader>

      <AutoForm
        formSchema={formSchema}
        onSubmit={onSubmit}
        submitButton={props => <Button {...props}>{t('submit')}</Button>}
        fieldConfig={{
          file: {
            fieldType: (props: AutoFormInputComponentProps) => (
              <AutoFormFile
                className="mt-5"
                acceptExtensions={['tgz']}
                maxFileSizeInMb={0}
                showInfo
                {...props}
              />
            ),
          },
        }}
      />
    </>
  );
};

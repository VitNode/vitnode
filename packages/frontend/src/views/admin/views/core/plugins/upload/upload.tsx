import { AutoForm } from '@/components/form/auto-form';
import { AutoFormFile } from '@/components/form/fields/file';
import { AutoFormInputComponentProps } from '@/components/form/type';
import { Button } from '@/components/ui/button';
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
      <DialogHeader>
        <DialogTitle>{t(data ? 'title_new_version' : 'title')}</DialogTitle>
        {data?.name && <DialogDescription>{data.name}</DialogDescription>}
      </DialogHeader>

      <AutoForm
        fieldConfig={{
          file: {
            fieldType: (props: AutoFormInputComponentProps) => (
              <AutoFormFile
                acceptExtensions={['tgz']}
                className="mt-5"
                maxFileSizeInMb={0}
                showInfo
                {...props}
              />
            ),
          },
        }}
        formSchema={formSchema}
        onSubmit={onSubmit}
        submitButton={props => <Button {...props}>{t('submit')}</Button>}
      />
    </>
  );
};

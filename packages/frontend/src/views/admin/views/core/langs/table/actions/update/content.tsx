import { useTranslations } from 'next-intl';

import { useUpdateLangAdmin } from './hooks/use-update-lang-admin';
import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ShowCoreLanguages } from '@/graphql/types';
import { AutoForm } from '@/components/form/auto-form';
import { AutoFormInputComponentProps } from '@/components/form/type';
import { AutoFormFile } from '@/components/form/fields/file';

export const ContentUpdateActionsTableLangsCoreAdmin = ({
  code,
  name,
}: Pick<ShowCoreLanguages, 'code' | 'name'>) => {
  const t = useTranslations('admin.core.langs.actions.update');
  const { onSubmit, formSchema } = useUpdateLangAdmin({ code, name });

  return (
    <>
      <DialogHeader>
        <DialogTitle>{t('title', { code })}</DialogTitle>
      </DialogHeader>

      <AutoForm
        formSchema={formSchema}
        onSubmit={onSubmit}
        submitButton={props => (
          <DialogFooter>
            <Button {...props}>{t('submit')}</Button>
          </DialogFooter>
        )}
        fieldConfig={{
          lang_file: {
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

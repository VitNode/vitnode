import { AutoForm } from '@/components/form/auto-form';
import { AutoFormFile } from '@/components/form/fields/file';
import { AutoFormInputComponentProps } from '@/components/form/type';
import { Button } from '@/components/ui/button';
import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ShowCoreLanguages } from '@/graphql/types';
import { useTranslations } from 'next-intl';

import { useUpdateLangAdmin } from './hooks/use-update-lang-admin';

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
        fieldConfig={{
          lang_file: {
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
        submitButton={props => (
          <DialogFooter>
            <Button {...props}>{t('submit')}</Button>
          </DialogFooter>
        )}
      />
    </>
  );
};

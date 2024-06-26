import { useTranslations } from 'next-intl';
import { Form, FormField } from 'vitnode-frontend/components/ui/form';
import { Button } from 'vitnode-frontend/components/ui/button';
import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from 'vitnode-frontend/components/ui/dialog';
import { FilesInput } from 'vitnode-frontend/components/ui/files-input';

import { ShowCoreLanguages } from '@/graphql/hooks';
import { useUpdateLangAdmin } from './hooks/use-update-lang-admin';

export const ContentUpdateActionsTableLangsCoreAdmin = ({
  code,
  name,
}: Pick<ShowCoreLanguages, 'code' | 'name'>) => {
  const t = useTranslations('admin.core.langs.actions.update');
  const { form, onSubmit } = useUpdateLangAdmin({ code, name });

  return (
    <>
      <DialogHeader>
        <DialogTitle>{t('title', { code })}</DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FilesInput
                className="mt-5"
                id="theme"
                {...field}
                acceptExtensions={['tgz']}
                maxFileSizeInMb={0}
              />
            )}
          />

          <DialogFooter>
            <Button
              disabled={!form.watch('file').length}
              loading={form.formState.isSubmitting}
              type="submit"
            >
              {t('submit')}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
};

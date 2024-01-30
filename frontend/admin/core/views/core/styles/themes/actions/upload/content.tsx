import { useTranslations } from 'next-intl';

import { Form, FormField } from '@/components/ui/form';
import { useThemeUpload } from './hooks/use-upload-theme';
import { FilesInput } from '@/components/ui/files/files-input';
import { DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export const ContentUploadActionsThemesAdmin = () => {
  const t = useTranslations('admin.core.styles.themes.upload');
  const { form, onSubmit } = useThemeUpload();

  return (
    <>
      <DialogTitle>{t('title')}</DialogTitle>
      <DialogDescription>{t('title')}</DialogDescription>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FilesInput id="theme" {...field} acceptExtensions={['tgz']} maxFileSizeInMb={0} />
            )}
          />

          <Button
            disabled={!form.watch('file').length}
            loading={form.formState.isSubmitting}
            type="submit"
          >
            {t('submit')}
          </Button>
        </form>
      </Form>
    </>
  );
};

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Form, FormField } from '@/components/ui/form';
import { FilesInput } from '@/components/ui/files-input';

interface FormType {
  file: File[];
  type: 'upload' | 'compact';
}

export const ModalChangeAvatar = () => {
  const t = useTranslations('core');

  const form = useForm<FormType>({
    defaultValues: {
      type: 'upload',
      file: []
    },
    mode: 'onChange'
  });

  const onSubmit = (data: FormType) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>{t('settings.change_avatar.title')}</DialogTitle>
        <DialogDescription>{t('settings.change_avatar.desc')}</DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <RadioGroup onValueChange={field.onChange} defaultValue={field.value}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="upload" id="r1" />
                  <Label htmlFor="r1">{t('settings.change_avatar.options.upload')}</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="compact" id="r2" />
                  <Label htmlFor="r2">{t('settings.change_avatar.options.delete')}</Label>
                </div>
              </RadioGroup>
            )}
          />

          {form.watch('type') === 'upload' && (
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FilesInput
                  id="picture"
                  {...field}
                  acceptExtensions={['png', 'jpg', 'jpeg']}
                  maxFileSizeInMb={3}
                />
              )}
            />
          )}
        </form>

        <DialogFooter>
          <Button
            type="submit"
            onClick={form.handleSubmit(onSubmit)}
            disabled={form.watch('type') === 'upload' && form.watch('file').length <= 0}
          >
            {t('settings.change_avatar.submit')}
          </Button>
        </DialogFooter>
      </Form>
    </>
  );
};

import { useTranslations } from 'next-intl';
import React from 'react';

import { useModalChangeAvatar } from './hooks/use-modal-change-avatar';
import { useSession } from '@/hooks/use-session';
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Loader } from '@/components/ui/loader';
import { Form, FormField } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { FilesInput } from '@/components/ui/files-input';
import { Button } from '@/components/ui/button';

const CropperModalChangeAvatar = React.lazy(async () =>
  import('./cropper/cropper-modal-change-avatar').then(module => ({
    default: module.CropperModalChangeAvatar,
  })),
);

export const ModalChangeAvatar = () => {
  const t = useTranslations('core');
  const { session } = useSession();
  const { form, onSubmit } = useModalChangeAvatar();
  if (!session) return null;
  const { avatar } = session;

  return (
    <>
      <DialogHeader>
        <DialogTitle>{t('settings.change_avatar.title')}</DialogTitle>
        <DialogDescription>
          {t('settings.change_avatar.desc')}
        </DialogDescription>
      </DialogHeader>

      {form.watch('type') === 'upload' && form.watch('file').length > 0 ? (
        <React.Suspense fallback={<Loader />}>
          <CropperModalChangeAvatar file={form.watch('file')[0]} />
        </React.Suspense>
      ) : (
        <>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              {avatar && (
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="upload" id="r1" />
                        <Label htmlFor="r1">
                          {t('settings.change_avatar.options.upload.title')}
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="delete" id="r2" />
                        <Label htmlFor="r2">
                          {t('settings.change_avatar.options.delete.title')}
                        </Label>
                      </div>
                    </RadioGroup>
                  )}
                />
              )}

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
                disabled={
                  form.watch('type') === 'upload' &&
                  form.watch('file').length === 0
                }
              >
                {t('settings.change_avatar.submit')}
              </Button>
            </DialogFooter>
          </Form>
        </>
      )}
    </>
  );
};

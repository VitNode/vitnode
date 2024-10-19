import { Button } from '@/components/ui/button';
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { FileInput } from '@/components/ui/file-input';
import { Form, FormField } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Loader } from '@/components/ui/loader';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useSession } from '@/hooks/use-session';
import { useTranslations } from 'next-intl';
import React from 'react';

import { useModalChangeAvatar } from './hooks/use-modal-change-avatar';

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
  const file = form.watch('file');

  return (
    <>
      <DialogHeader>
        <DialogTitle>{t('settings.change_avatar.title')}</DialogTitle>
        <DialogDescription>
          {t('settings.change_avatar.desc')}
        </DialogDescription>
      </DialogHeader>

      {form.watch('type') === 'upload' && file.length ? (
        <React.Suspense fallback={<Loader />}>
          <CropperModalChangeAvatar file={file} />
        </React.Suspense>
      ) : (
        <>
          <Form {...form}>
            <form
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              {avatar && (
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <RadioGroup
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem id="r1" value="upload" />
                        <Label htmlFor="r1">
                          {t('settings.change_avatar.options.upload.title')}
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <RadioGroupItem id="r2" value="delete" />
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
                    <FileInput
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
                disabled={
                  form.watch('type') === 'upload' && !!form.watch('file')
                }
                onClick={form.handleSubmit(onSubmit)}
                type="submit"
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

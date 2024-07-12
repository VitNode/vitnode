import React from 'react';
import { ReactCropperElement } from 'react-cropper';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { mutationApi } from './mutation-api';
import { useSession } from '@/hooks/use-session';
import { useDialog } from '@/components/ui/dialog';

export const useCopperModalChangeAvatar = () => {
  const t = useTranslations('core');
  const cropperRef = React.useRef<ReactCropperElement>(null);
  const [isPending, setPending] = React.useState(false);
  const { session } = useSession();
  const { setOpen } = useDialog();

  const onSubmit = async () => {
    if (!session) return;

    const cropper = cropperRef.current?.cropper;
    if (!cropper) return;
    const blob = await fetch(cropper.getCroppedCanvas().toDataURL()).then(
      async res => res.blob(),
    );
    const file = new File([blob], `${session.id}.webp`, {
      type: blob.type,
    });

    setPending(true);

    const formData = new FormData();
    formData.append('file', file);
    const mutation = await mutationApi(formData);
    if (mutation.error) {
      toast.error(t('errors.title'), {
        description: t('settings.change_avatar.options.upload.error'),
      });

      return;
    } else {
      toast.success(t('settings.change_avatar.options.upload.title'), {
        description: t('settings.change_avatar.options.upload.success'),
      });
      setOpen?.(false);
    }

    setPending(false);
  };

  return {
    cropperRef,
    onSubmit,
    isPending,
  };
};

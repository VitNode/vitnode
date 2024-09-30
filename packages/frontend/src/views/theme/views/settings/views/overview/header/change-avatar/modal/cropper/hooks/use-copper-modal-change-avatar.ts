import { useDialog } from '@/components/ui/dialog';
import { useSession } from '@/hooks/use-session';
import { useTranslations } from 'next-intl';
import React from 'react';
import { ReactCropperElement } from 'react-cropper';
import { toast } from 'sonner';

import { mutationApi } from './mutation-api';

export const useCopperModalChangeAvatar = () => {
  const t = useTranslations('core.settings.change_avatar.options.upload');
  const tErrors = useTranslations('core.global.errors');
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
    if (mutation?.error) {
      toast.error(tErrors('title'), {
        description: tErrors('internal_server_error'),
      });
      setPending(false);

      return;
    }

    toast.success(t('title'), {
      description: t('success'),
    });
    setOpen?.(false);

    setPending(false);
  };

  return {
    cropperRef,
    onSubmit,
    isPending,
  };
};

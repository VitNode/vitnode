import { useRef, useState } from 'react';
import { ReactCropperElement } from 'react-cropper';
import { useTranslations } from 'next-intl';

import { mutationUploadApi } from './api/mutation-upload-api';
import { useToast } from '@/components/ui/use-toast';
import { useDialog } from '@/components/ui/dialog';

import { useSession } from '../../use-session';

export const useCopperModalChangeAvatar = () => {
  const t = useTranslations('core');
  const cropperRef = useRef<ReactCropperElement>(null);
  const [isPending, setPending] = useState(false);
  const { session } = useSession();
  const { toast } = useToast();
  const { setOpen } = useDialog();

  const onSubmit = async () => {
    if (!session) return;

    const cropper = cropperRef.current?.cropper;
    if (!cropper) return;
    const blob = await fetch(cropper.getCroppedCanvas().toDataURL()).then(res => res.blob());
    const file = new File([blob], `${session.id}.webp`, {
      type: blob.type
    });

    setPending(true);

    const formData = new FormData();
    formData.append('file', file);
    const mutation = await mutationUploadApi(formData);
    if (mutation.error) {
      toast({
        title: t('errors.title'),
        description: t('settings.change_avatar.options.upload.error'),
        variant: 'destructive'
      });

      return;
    } else {
      toast({
        title: t('settings.change_avatar.options.upload.title'),
        description: t('settings.change_avatar.options.upload.success')
      });
      setOpen(false);
    }

    setPending(false);
  };

  return {
    cropperRef,
    onSubmit,
    isPending
  };
};

import { useRef } from 'react';
import { ReactCropperElement } from 'react-cropper';

import { useUploadAvatarAPI } from './api/use-upload-avatar-api';

import { useSession } from '../../use-session';

export const useCopperModalChangeAvatar = () => {
  const cropperRef = useRef<ReactCropperElement>(null);
  const { isPending, mutateAsync } = useUploadAvatarAPI();
  const { session } = useSession();

  const onSubmit = async () => {
    if (!session) return;

    const cropper = cropperRef.current?.cropper;
    if (!cropper) return;
    const blob = await fetch(cropper.getCroppedCanvas().toDataURL()).then(res => res.blob());
    const file = new File([blob], `${session.authorization_core_sessions.name_seo}.webp`, {
      type: blob.type
    });

    await mutateAsync({
      file
    });
  };

  return {
    cropperRef,
    onSubmit,
    isPending
  };
};

import { Cropper } from 'react-cropper';
import { useTranslations } from 'next-intl';

import { DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useCopperModalChangeAvatar } from '@/hooks/core/settings/avatar/use-copper-modal-change-avatar';
import 'cropperjs/dist/cropper.css';

interface Props {
  file: File;
}

export const CropperModalChangeAvatar = ({ file }: Props) => {
  const t = useTranslations('core');

  const { cropperRef, isPending, onSubmit } = useCopperModalChangeAvatar();

  return (
    <>
      <Cropper
        ref={cropperRef}
        style={{ height: 200, width: '100%' }}
        src={URL.createObjectURL(file)}
        aspectRatio={1}
        viewMode={1}
        minCropBoxHeight={100}
        minCropBoxWidth={100}
        background={false}
        autoCropArea={1}
        checkOrientation={false}
        rotatable={false}
      />

      <DialogFooter>
        <Button onClick={onSubmit} loading={isPending}>
          {t('settings.change_avatar.submit')}
        </Button>
      </DialogFooter>
    </>
  );
};

import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import 'cropperjs/dist/cropper.css';
import { useTranslations } from 'next-intl';
import { Cropper } from 'react-cropper';

import { useCopperModalChangeAvatar } from './hooks/use-copper-modal-change-avatar';

export const CropperModalChangeAvatar = ({ file }: { file: File[] }) => {
  const t = useTranslations('core');
  const { cropperRef, isPending, onSubmit } = useCopperModalChangeAvatar();

  return (
    <>
      <Cropper
        aspectRatio={1}
        autoCropArea={1}
        background={false}
        checkOrientation={false}
        minCropBoxHeight={100}
        minCropBoxWidth={100}
        ref={cropperRef}
        rotatable={false}
        src={URL.createObjectURL(file[0])}
        style={{ height: 200, width: '100%' }}
        viewMode={1}
      />

      <DialogFooter>
        <Button loading={isPending} onClick={onSubmit}>
          {t('settings.change_avatar.submit')}
        </Button>
      </DialogFooter>
    </>
  );
};

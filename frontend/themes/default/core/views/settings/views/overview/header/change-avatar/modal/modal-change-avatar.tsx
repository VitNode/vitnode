import { useTranslations } from 'next-intl';

import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export const ModalChangeAvatar = () => {
  const t = useTranslations('core');

  return (
    <>
      <DialogHeader>
        <DialogTitle>{t('settings.change_avatar.title')}</DialogTitle>
        <DialogDescription>{t('settings.change_avatar.desc')}</DialogDescription>
      </DialogHeader>

      <RadioGroup defaultValue="comfortable">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="default" id="r1" />
          <Label htmlFor="r1">{t('settings.change_avatar.options.upload')}</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="compact" id="r3" />
          <Label htmlFor="r3">{t('settings.change_avatar.options.delete')}</Label>
        </div>
        <DialogFooter>
          <Button type="submit">{t('settings.change_avatar.submit')}</Button>
        </DialogFooter>
      </RadioGroup>
    </>
  );
};

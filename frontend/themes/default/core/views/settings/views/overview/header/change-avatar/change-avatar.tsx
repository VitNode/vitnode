import { useTranslations } from 'next-intl';
import { Suspense, lazy } from 'react';
import { Image } from 'lucide-react';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { AvatarUser } from '@/components/user/avatar/avatar-user';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/loader/loader';

const ModalChangeAvatar = lazy(() =>
  import('./modal/modal-change-avatar').then(module => ({
    default: module.ModalChangeAvatar
  }))
);

export const ChangeAvatar = () => {
  const t = useTranslations('core');

  return (
    <div className="relative">
      <AvatarUser sizeInRem={5} />
      <TooltipProvider>
        <Dialog>
          <Tooltip>
            <TooltipTrigger asChild>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute bottom-[-0.5rem] left-[-0.5rem]"
                >
                  {/* eslint-disable-next-line jsx-a11y/alt-text */}
                  <Image size={20} />
                </Button>
              </DialogTrigger>
            </TooltipTrigger>

            <DialogContent>
              <Suspense fallback={<Loader />}>
                <ModalChangeAvatar />
              </Suspense>
            </DialogContent>

            <TooltipContent>
              <p>{t('settings.change_avatar.title')}</p>
            </TooltipContent>
          </Tooltip>
        </Dialog>
      </TooltipProvider>
    </div>
  );
};

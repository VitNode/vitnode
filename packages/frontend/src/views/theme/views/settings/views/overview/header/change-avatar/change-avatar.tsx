import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Loader } from '@/components/ui/loader';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { AvatarUser } from '@/components/ui/user/avatar';
import { useSession } from '@/hooks/use-session';
import { ImageIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

const ModalChangeAvatar = React.lazy(async () =>
  import('./modal/modal-change-avatar').then(module => ({
    default: module.ModalChangeAvatar,
  })),
);

export const ChangeAvatar = () => {
  const t = useTranslations('core');
  const { session } = useSession();
  if (!session) return null;

  return (
    <div className="relative">
      <AvatarUser sizeInRem={5} user={session} />
      <TooltipProvider>
        <Dialog>
          <Tooltip>
            <TooltipTrigger asChild>
              <DialogTrigger asChild>
                <Button
                  ariaLabel=""
                  className="absolute -bottom-2 -left-2"
                  size="icon"
                  variant="outline"
                >
                  <ImageIcon size={20} />
                </Button>
              </DialogTrigger>
            </TooltipTrigger>

            <DialogContent>
              <React.Suspense fallback={<Loader />}>
                <ModalChangeAvatar />
              </React.Suspense>
            </DialogContent>

            <TooltipContent>{t('settings.change_avatar.title')}</TooltipContent>
          </Tooltip>
        </Dialog>
      </TooltipProvider>
    </div>
  );
};

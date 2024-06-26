import { useTranslations } from 'next-intl';
import * as React from 'react';
import { ImageIcon } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'vitnode-frontend/components/ui/tooltip';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from 'vitnode-frontend/components/ui/dialog';
import { Loader } from 'vitnode-frontend/components/ui/loader';
import { Button } from 'vitnode-frontend/components/ui/button';
import { useSession } from 'vitnode-frontend/hooks/use-session';

import { AvatarUser } from '@/components/user/avatar/avatar-user';

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
                  variant="outline"
                  size="icon"
                  className="absolute -bottom-2 -left-2"
                  ariaLabel=""
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

            <TooltipContent>
              <p>{t('settings.change_avatar.title')}</p>
            </TooltipContent>
          </Tooltip>
        </Dialog>
      </TooltipProvider>
    </div>
  );
};

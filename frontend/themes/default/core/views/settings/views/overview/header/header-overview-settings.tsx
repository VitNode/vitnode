import { Image } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { CardHeader } from '@/components/ui/card';
import { AvatarUser } from '@/components/user/avatar/avatar-user';
import { useSession } from '@/hooks/core/use-session';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export const HeaderOverviewSettings = () => {
  const t = useTranslations('core');
  const { session } = useSession();
  if (!session) return null;

  const {
    authorization_core_sessions: { email, name }
  } = session;

  return (
    <CardHeader>
      <div className="flex flex-col gap-4 items-center sm:flex-row sm:gap-6">
        <div className="relative">
          <AvatarUser sizeInRem={5} />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute bottom-[-0.5rem] left-[-0.5rem]"
                >
                  {/* eslint-disable-next-line jsx-a11y/alt-text */}
                  <Image size={20} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t('settings.change_avatar')}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="flex flex-col space-y-1 text-center sm:text-left">
          <h1 className="text-3xl font-medium leading-none">{name}</h1>
          <p className="leading-none text-muted-foreground">{email}</p>
        </div>
      </div>
    </CardHeader>
  );
};

import { LogOut, Settings, User } from 'lucide-react';
import { useRouter } from 'next-intl/client';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { useSession } from '@/hooks/core/use-session';
import { useSignOutAPI } from '@/hooks/core/sign/out/use-sign-out-api';

export const AuthUserBar = () => {
  const t = useTranslations('core');
  const { push } = useRouter();
  const { session } = useSession();
  const { mutateAsync } = useSignOutAPI();

  if (!session) return null;

  const {
    authorization_core_sessions: { id, name }
  } = session;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{name}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => push(`/profiles/${id}`)}>
            <User className="mr-2 h-4 w-4" />
            <span>{t('user-bar.my_profile')}</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => push('/settings')}>
            <Settings className="mr-2 h-4 w-4" />
            <span>{t('user-bar.settings')}</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={async () => await mutateAsync()}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>{t('user-bar.log_out')}</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

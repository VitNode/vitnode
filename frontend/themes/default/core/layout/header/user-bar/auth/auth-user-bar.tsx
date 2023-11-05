import { KeyRound, LogOut, Settings, Shield, User } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu';
import { useSession } from '@/hooks/core/use-session';
import { useSignOutAPI } from '@/hooks/core/sign/out/use-sign-out-api';
import { useRouter } from '@/i18n';
import { AvatarUser } from '@/components/user/avatar/avatar-user';
import { ThemeAuthUserBar } from './theme-auth-user-bar';

export const AuthUserBar = () => {
  const t = useTranslations('core');
  const { push } = useRouter();
  const { session } = useSession();
  const { mutateAsync } = useSignOutAPI();

  if (!session) return null;
  const { email, id, is_admin, name } = session;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="rounded-full" size="icon">
          <AvatarUser sizeInRem={1.75} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-70" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="font-medium leading-none text-base">{name}</p>
            <p className="text-xs leading-none text-muted-foreground">{email}</p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

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

        <ThemeAuthUserBar />

        {is_admin && (
          <>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => push('/modcp')}>
                <Shield className="mr-2 h-4 w-4" />
                <span>{t('user-bar.mod_cp')}</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => window.open('/admin', '_blank')}>
                <KeyRound className="mr-2 h-4 w-4" />
                <span>{t('user-bar.admin_cp')}</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </>
        )}

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

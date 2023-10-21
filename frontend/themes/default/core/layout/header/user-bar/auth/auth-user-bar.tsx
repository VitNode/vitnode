import { Check, KeyRound, LogOut, Moon, Settings, Shield, Sun, User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent
} from '@/components/ui/dropdown-menu';
import { useSession } from '@/hooks/core/use-session';
import { useSignOutAPI } from '@/hooks/core/sign/out/use-sign-out-api';
import { useRouter } from '@/i18n';
import { AvatarUser } from '@/components/user/avatar/avatar-user';

export const AuthUserBar = () => {
  const t = useTranslations('core');
  const { push } = useRouter();
  const { session } = useSession();
  const { mutateAsync } = useSignOutAPI();
  const { setTheme, theme } = useTheme();

  if (!session) return null;
  const { email, id, is_admin, name } = session;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="rounded-full" size="icon">
          <AvatarUser sizeInRem={1.75} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72" align="end">
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

        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Sun className="mr-2 h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute mr-2 h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span>{t('user-bar.theme.title')}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="w-40">
                <DropdownMenuItem onClick={() => setTheme('light')}>
                  {theme === 'light' && <Check className="mr-2 h-4 w-4" />}
                  <span>{t('user-bar.theme.light')}</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>
                  {theme === 'dark' && <Check className="mr-2 h-4 w-4" />}
                  <span>{t('user-bar.theme.dark')}</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')}>
                  {theme === 'system' && <Check className="mr-2 h-4 w-4" />}
                  <span>{t('user-bar.theme.system')}</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>

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

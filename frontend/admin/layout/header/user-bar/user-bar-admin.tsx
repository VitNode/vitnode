'use client';

import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { Check, LogOut, Moon, Sun } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { AvatarUser } from '@/components/user/avatar/avatar-user';
import { useSignOutAPI } from '@/hooks/core/sign/out/use-sign-out-api';
import { useSessionAdmin } from '@/admin/hooks/use-session-admin';

export const UserBarAdmin = () => {
  const t = useTranslations('core');
  const { session } = useSessionAdmin();
  const { mutateAsync } = useSignOutAPI();
  const { setTheme, theme } = useTheme();

  if (!session) return null;
  const { avatar, email, id, name } = session;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="rounded-full" size="icon">
          <AvatarUser
            user={{
              avatar,
              name,
              id
            }}
            sizeInRem={1.75}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="font-medium leading-none text-base">{name}</p>
            <p className="text-xs leading-none text-muted-foreground">{email}</p>
          </div>
        </DropdownMenuLabel>

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

'use client';

import { useTranslations } from 'next-intl';
import { LogOut } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { AvatarUser } from '@/components/user/avatar/avatar-user';
import { useSignOutAPI } from '@/hooks/core/sign/out/use-sign-out-api';
import { useSessionAdmin } from '@/admin/hooks/use-session-admin';
import { ThemeUserBarAdmin } from './theme/theme-user-bar-admin';

export const UserBarAdmin = () => {
  const t = useTranslations('core');
  const { session } = useSessionAdmin();
  const { mutateAsync } = useSignOutAPI();

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
        <ThemeUserBarAdmin />
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

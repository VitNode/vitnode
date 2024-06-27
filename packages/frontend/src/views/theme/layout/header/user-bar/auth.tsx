'use client';

import {
  KeyRound,
  LogOut,
  PaintRoller,
  Settings,
  Shield,
  User,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useSession } from '../../../../../hooks/use-session';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../../../../components/ui/dropdown-menu';
import { Button } from '../../../../../components/ui/button';
import { AvatarUser } from '../../../../../components/ui/user/avatar';
import { Link } from '../../../../../navigation';
import { useSignOutApi } from '../../../../../hooks/core/sign/out/use-sign-out-api';

export const AuthUserBar = () => {
  const t = useTranslations('core');
  const { session } = useSession();
  const { onSubmit } = useSignOutApi();

  if (!session) return null;
  const { email, is_admin, is_mod, name, name_seo } = session;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="hidden shrink-0 rounded-full sm:flex"
          size="icon"
          ariaLabel=""
        >
          <AvatarUser user={session} sizeInRem={1.75} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 p-2" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-base font-medium leading-none">{name}</p>
            <p className="text-muted-foreground text-xs leading-none">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={`/profile/${name_seo}`}>
              <User />
              <span>{t('user-bar.my_profile')}</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings">
              <Settings />
              <span>{t('user-bar.settings')}</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        {(is_admin || is_mod) && (
          <>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              {is_admin && (
                <DropdownMenuItem asChild>
                  <Link href="/admin/theme-editor">
                    <PaintRoller />
                    <span>{t('user-bar.theme_editor')}</span>
                  </Link>
                </DropdownMenuItem>
              )}

              {is_mod && (
                <DropdownMenuItem asChild>
                  <Link href="/mod">
                    <Shield />
                    <span>{t('user-bar.mod_cp')}</span>
                  </Link>
                </DropdownMenuItem>
              )}

              {is_admin && (
                <DropdownMenuItem asChild>
                  <Link href="/admin" target="_blank">
                    <KeyRound />
                    <span>{t('user-bar.admin_cp')}</span>
                  </Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuGroup>
          </>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem onClick={async () => onSubmit()}>
            <LogOut />
            <span>{t('user-bar.log_out')}</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

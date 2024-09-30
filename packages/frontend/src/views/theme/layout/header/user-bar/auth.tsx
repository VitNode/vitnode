'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AvatarUser } from '@/components/ui/user/avatar';
import { cn } from '@/helpers/classnames';
import { useSignOutApi } from '@/hooks/core/sign/out/use-sign-out-api';
import { useSession } from '@/hooks/use-session';
import { Link } from '@/navigation';
import { KeyRound, LogOut, Settings, User } from 'lucide-react';
import { useTranslations } from 'next-intl';

export const AuthUserBar = ({ className }: { className?: string }) => {
  const t = useTranslations('core.global.user-bar');
  const { session } = useSession();
  const { onSubmit } = useSignOutApi();

  if (!session) return null;
  const { email, is_admin, is_mod, name, name_seo } = session;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          ariaLabel=""
          className={cn('hidden shrink-0 rounded-full sm:flex', className)}
          size="icon"
          variant="ghost"
        >
          <AvatarUser sizeInRem={1.75} user={session} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 p-2">
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
              <span>{t('my_profile')}</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings">
              <Settings />
              <span>{t('settings')}</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        {(is_admin || is_mod) && (
          <>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              {is_admin && (
                <DropdownMenuItem asChild>
                  <Link href="/admin" target="_blank">
                    <KeyRound />
                    <span>{t('admin_cp')}</span>
                  </Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuGroup>
          </>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem onClick={onSubmit}>
            <LogOut />
            <span>{t('log_out')}</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

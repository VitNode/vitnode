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
import { useSessionAdmin } from '@/hooks/use-session-admin';
import { Link } from '@/navigation';
import {
  HammerIcon,
  Home,
  LogOut,
  SquareArrowOutUpRight,
  User,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { mutationApi } from './hooks/mutation-api';

export const AvatarAsideAuthAdmin = () => {
  const t = useTranslations('admin.global');
  const tCore = useTranslations('core.global');
  const { session } = useSessionAdmin();

  if (!session) return null;
  const { email, name, name_seo } = session;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          ariaLabel=""
          className="hidden shrink-0 rounded-full sm:flex"
          size="icon"
          variant="ghost"
        >
          <AvatarUser sizeInRem={1.75} user={session} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64 p-2">
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
            <Link href="/" target="_blank">
              <Home />
              <span>{t('home_page')}</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/profile/${name_seo}`} target="_blank">
              <User />
              <span>{tCore('user-bar.my_profile')}</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/admin/core/diagnostic">
              <HammerIcon />
              <span>{t('diagnostic_tools')}</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link
              href="https://vitnode.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              VitNode
              <SquareArrowOutUpRight />
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link
              href="https://github.com/VitNode/vitnode"
              rel="noopener noreferrer"
              target="_blank"
            >
              VitNode GitHub
              <SquareArrowOutUpRight />
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={async () => {
              const mutation = await mutationApi();
              if (mutation?.error) {
                toast.error(tCore('errors.title'), {
                  description: tCore('errors.internal_server_error'),
                });
              }
            }}
          >
            <LogOut /> <span>{tCore('user-bar.log_out')}</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

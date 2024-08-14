'use client';

import {
  GitBranch,
  Globe,
  HammerIcon,
  Home,
  LogOut,
  SquareArrowOutUpRight,
  User,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

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
import { mutationApi } from './hooks/mutation-api';

export const AvatarAsideAuthAdmin = () => {
  const t = useTranslations('admin');
  const tCore = useTranslations('core');
  const { session } = useSessionAdmin();

  if (!session) return null;
  const { email, name, name_seo } = session;

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
      <DropdownMenuContent className="w-64 p-2" align="start">
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
              <span>{t('core.diagnostic.title')}</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link
              href="https://vitnode.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Globe />
              <span>VitNode</span>
              <SquareArrowOutUpRight />
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link
              href="https://github.com/aXenDeveloper/vitnode"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitBranch />
              <span>VitNode GitHub</span>
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

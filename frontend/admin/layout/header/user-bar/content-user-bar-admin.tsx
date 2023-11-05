import { LogOut } from 'lucide-react';
import { useTranslations } from 'next-intl';

import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { useSessionAdmin } from '@/admin/hooks/use-session-admin';
import { ThemeUserBarAdmin } from './theme/theme-user-bar-admin';
import { useSignOutAdminAPI } from './hooks/use-sign-out-admin-api';

export const ContentUserBarAdmin = () => {
  const t = useTranslations('core');
  const { session } = useSessionAdmin();
  const { mutateAsync } = useSignOutAdminAPI();

  if (!session) return null;
  const { email, name } = session;

  return (
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
  );
};

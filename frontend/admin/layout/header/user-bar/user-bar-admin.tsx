'use client';

import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { AvatarUser } from '@/components/user/avatar/avatar-user';
import { useSessionAdmin } from '@/admin/hooks/use-session-admin';
import { ContentUserBarAdmin } from './content-user-bar-admin';

interface Props {
  drawer?: boolean;
}

export const UserBarAdmin = ({ drawer }: Props) => {
  const { session } = useSessionAdmin();

  if (!session) return null;
  const { avatar, id, name } = session;

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

      <ContentUserBarAdmin drawer={drawer} />
    </DropdownMenu>
  );
};

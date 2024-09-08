'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Loader } from '@/components/ui/loader';
import { Admin__Core_Members__Show__ItemQuery } from '@/graphql/queries/admin/members/users/item/admin__core_members__show__item.generated';
import { EllipsisIcon, Pencil, UserMinus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

const EditActionUserMembersAdmin = React.lazy(async () =>
  import('./edit/edit').then(module => ({
    default: module.EditActionUserMembersAdmin,
  })),
);

export const ActionsUserMembersAdmin = (
  props: Admin__Core_Members__Show__ItemQuery['admin__core_members__show']['edges'][0],
) => {
  const t = useTranslations('admin.members.users.item');
  const [isOpenEdit, setIsOpenEdit] = React.useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            ariaLabel={t('user_menu')}
            className="@lg:relative @lg:right-auto @lg:top-auto absolute right-4 top-20"
            size="icon"
            variant="ghost"
          >
            <EllipsisIcon />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-44">
          <DropdownMenuItem
            onClick={() => {
              setIsOpenEdit(true);
            }}
          >
            <Pencil />
            {t('edit.title')}
          </DropdownMenuItem>
          <DropdownMenuItem destructive disabled>
            <UserMinus />
            {t('delete.title')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog onOpenChange={setIsOpenEdit} open={isOpenEdit}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('edit.title')}</DialogTitle>
          </DialogHeader>

          <React.Suspense fallback={<Loader />}>
            <EditActionUserMembersAdmin {...props} />
          </React.Suspense>
        </DialogContent>
      </Dialog>
    </>
  );
};

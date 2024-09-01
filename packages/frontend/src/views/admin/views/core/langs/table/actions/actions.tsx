import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ShowCoreLanguages } from '@/graphql/types';
import { ChevronDown, Trash2 } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import React from 'react';

import { DeleteActionsTableLangsCoreAdmin } from './delete/delete';
import { DownloadActionsTableLangsCoreAdmin } from './download/download';
import { EditActionsTableLangsCoreAdmin } from './edit';

export const ActionsTableLangsCoreAdmin = (data: ShowCoreLanguages) => {
  const t = useTranslations('core');
  const locale = useLocale();
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = React.useState(false);

  return (
    <>
      <DownloadActionsTableLangsCoreAdmin {...data} />
      <EditActionsTableLangsCoreAdmin {...data} />

      {!data.protected && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button ariaLabel={t('more_actions')} size="icon" variant="ghost">
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {!data.default && (
              <DropdownMenuItem
                destructive
                disabled={locale === data.code}
                onClick={() => {
                  setIsOpenDeleteDialog(true);
                }}
              >
                <Trash2 /> {t('delete')}
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      <DeleteActionsTableLangsCoreAdmin
        open={isOpenDeleteDialog}
        setOpen={setIsOpenDeleteDialog}
        {...data}
      />
    </>
  );
};

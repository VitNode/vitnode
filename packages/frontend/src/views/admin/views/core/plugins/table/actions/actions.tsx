import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ShowAdminPlugins } from '@/graphql/types';
import { CONFIG } from '@/helpers/config-with-env';
import { Link, usePathname, useRouter } from '@/navigation';
import { BadgeHelp, ChevronDown, CodeXml, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { DeletePluginActionsAdmin } from './delete/delete';
import { SetDefaultPluginActionsAdmin } from './set-default/set-default';
import { UploadPluginActionsAdmin } from './upload';

export const ActionsItemPluginsAdmin = (props: ShowAdminPlugins) => {
  const t = useTranslations('admin.core.plugins');
  const tCore = useTranslations('core');
  const pathname = usePathname();
  const { push } = useRouter();

  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = React.useState(false);

  return (
    <>
      {!props.default &&
        props.enabled &&
        (props.allow_default || CONFIG.node_development) && (
          <SetDefaultPluginActionsAdmin {...props} />
        )}
      <UploadPluginActionsAdmin {...props} />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button ariaLabel={tCore('more_actions')} size="icon" variant="ghost">
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-52">
          {CONFIG.node_development && (
            <>
              <DropdownMenuItem
                onClick={() => {
                  push(`${pathname}/${props.code}/dev/overview`);
                }}
              >
                <CodeXml /> {t('dev_tools')}
              </DropdownMenuItem>
            </>
          )}

          <DropdownMenuItem asChild>
            <Link
              href={props.support_url}
              rel="noopener noreferrer"
              target="_blank"
            >
              <BadgeHelp /> {t('get_help')}
            </Link>
          </DropdownMenuItem>

          {!props.default && (
            <DropdownMenuItem
              destructive
              onClick={() => {
                setIsOpenDeleteDialog(true);
              }}
            >
              <Trash2 /> {tCore('delete')}
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {!props.default && (
        <DeletePluginActionsAdmin
          open={isOpenDeleteDialog}
          setOpen={setIsOpenDeleteDialog}
          {...props}
        />
      )}
    </>
  );
};

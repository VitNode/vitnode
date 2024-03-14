import { BadgeHelp, ChevronDown, Download, Pencil, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

import type { ShowAdminPlugins } from "@/graphql/hooks";
import { DeletePluginActionsAdmin } from "./delete/delete";
import { DownloadPluginActionsAdmin } from "./download/download";
import { EditPluginActionsAdmin } from "./edit";
import { SetDefaultPluginActionsAdmin } from "./set-default/set-default";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n";
import { UploadPluginActionsAdmin } from "./upload";
import { CONFIG } from "@/config";

export const ActionsItemPluginsAdmin = (props: ShowAdminPlugins) => {
  const t = useTranslations("admin.core.plugins");
  const tCore = useTranslations("core");

  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
  const [isOpenEditDialog, setIsOpenEditDialog] = useState(false);
  const [isOpenDownloadDialog, setIsOpenDownloadDialog] = useState(false);

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
          <Button variant="ghost" size="icon" ariaLabel={tCore("more_actions")}>
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-52">
          {CONFIG.node_development && (
            <>
              <DropdownMenuItem onClick={() => setIsOpenEditDialog(true)}>
                <Pencil /> {tCore("edit")}
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => setIsOpenDownloadDialog(true)}>
                <Download /> {tCore("download")}
              </DropdownMenuItem>
            </>
          )}

          {props.support_url && (
            <DropdownMenuItem asChild>
              <Link
                href={props.support_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <BadgeHelp /> {t("get_help")}
              </Link>
            </DropdownMenuItem>
          )}

          {!props.default && (
            <DropdownMenuItem onClick={() => setIsOpenDeleteDialog(true)}>
              <Trash2 className="text-destructive" /> {tCore("delete")}
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {CONFIG.node_development && (
        <>
          <DownloadPluginActionsAdmin
            open={isOpenDownloadDialog}
            setOpen={setIsOpenDownloadDialog}
            {...props}
          />
          <EditPluginActionsAdmin
            open={isOpenEditDialog}
            setOpen={setIsOpenEditDialog}
            {...props}
          />
        </>
      )}

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

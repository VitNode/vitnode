import { useTranslations } from "next-intl";
import { ChevronDown, Trash2, Upload } from "lucide-react";
import { useState } from "react";

import type { ShowAdminThemes } from "@/graphql/hooks";
import { DeleteThemeActionsAdmin } from "./delete/delete";
import { DownloadThemeActionsAdmin } from "./download/download";
import { EditThemeActionsAdmin } from "./edit/edit";
import { UploadThemeActionsAdmin } from "./upload";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export const ActionsItemThemesAdmin = (props: ShowAdminThemes) => {
  const tCore = useTranslations("core");
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
  const [isOpenUploadDialog, setIsOpenUploadDialog] = useState(false);

  return (
    <>
      <DownloadThemeActionsAdmin {...props} />
      <EditThemeActionsAdmin {...props} />

      {!props.protected && (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                ariaLabel={tCore("more_actions")}
              >
                <ChevronDown />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-52">
              <DropdownMenuItem onClick={() => setIsOpenUploadDialog(true)}>
                <Upload /> {tCore("upload_new_version")}
              </DropdownMenuItem>

              {!props.default && (
                <DropdownMenuItem
                  onClick={() => setIsOpenDeleteDialog(true)}
                  destructive
                >
                  <Trash2 /> {tCore("delete")}
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <UploadThemeActionsAdmin
            open={isOpenUploadDialog}
            setOpen={setIsOpenUploadDialog}
            {...props}
          />

          {!props.default && (
            <DeleteThemeActionsAdmin
              open={isOpenDeleteDialog}
              setOpen={setIsOpenDeleteDialog}
              {...props}
            />
          )}
        </>
      )}
    </>
  );
};

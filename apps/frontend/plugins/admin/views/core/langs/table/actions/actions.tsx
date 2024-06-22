import { ChevronDown, Trash2, Upload } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import * as React from "react";

import { ShowCoreLanguages } from "@/graphql/hooks";
import { EditActionsTableLangsCoreAdmin } from "./edit";
import { DeleteActionsTableLangsCoreAdmin } from "./delete/delete";
import { DownloadActionsTableLangsCoreAdmin } from "./download/download";
import { UpdateActionsTableLangsCoreAdmin } from "./update/update";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export const ActionsTableLangsCoreAdmin = (data: ShowCoreLanguages) => {
  const t = useTranslations("core");
  const locale = useLocale();
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = React.useState(false);
  const [isOpenUploadDialog, setIsOpenUploadDialog] = React.useState(false);

  return (
    <>
      <DownloadActionsTableLangsCoreAdmin {...data} />
      <EditActionsTableLangsCoreAdmin {...data} />

      {!data.protected && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" ariaLabel={t("more_actions")}>
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setIsOpenUploadDialog(true)}>
              <Upload /> {t("upload_new_version")}
            </DropdownMenuItem>
            {!data.default && (
              <DropdownMenuItem
                onClick={() => setIsOpenDeleteDialog(true)}
                disabled={locale === data.code}
                destructive
              >
                <Trash2 /> {t("delete")}
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
      {!data.protected && (
        <UpdateActionsTableLangsCoreAdmin
          open={isOpenUploadDialog}
          setOpen={setIsOpenUploadDialog}
          {...data}
        />
      )}
    </>
  );
};

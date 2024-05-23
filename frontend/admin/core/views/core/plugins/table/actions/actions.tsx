import { BadgeHelp, ChevronDown, CodeXml, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { CONFIG } from "@/config";
import type { ShowAdminPlugins } from "@/graphql/hooks";
import { DeletePluginActionsAdmin } from "./delete/delete";
import { SetDefaultPluginActionsAdmin } from "./set-default/set-default";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Link, usePathname, useRouter } from "@/utils/i18n";
import { UploadPluginActionsAdmin } from "./upload";

export const ActionsItemPluginsAdmin = (props: ShowAdminPlugins) => {
  const t = useTranslations("admin.core.plugins");
  const tCore = useTranslations("core");
  const pathname = usePathname();
  const { push } = useRouter();

  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);

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
              <DropdownMenuItem
                onClick={() => push(`${pathname}/${props.code}/dev`)}
              >
                <CodeXml /> {t("dev_tools")}
              </DropdownMenuItem>
            </>
          )}

          <DropdownMenuItem asChild>
            <Link
              href={props.support_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <BadgeHelp /> {t("get_help")}
            </Link>
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

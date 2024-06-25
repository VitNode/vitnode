import { BadgeHelp, ChevronDown, CodeXml, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import * as React from "react";
import { Link, usePathname, useRouter } from "vitnode-frontend/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "vitnode-frontend/components/ui/dropdown-menu";
import { Button } from "vitnode-frontend/components/ui/button";
import { CONFIG } from "vitnode-frontend/helpers";

import { ShowAdminPlugins } from "@/graphql/hooks";
import { DeletePluginActionsAdmin } from "./delete/delete";
import { SetDefaultPluginActionsAdmin } from "./set-default/set-default";
import { UploadPluginActionsAdmin } from "./upload";

export const ActionsItemPluginsAdmin = (props: ShowAdminPlugins) => {
  const t = useTranslations("admin.core.plugins");
  const tCore = useTranslations("core");
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
          <Button variant="ghost" size="icon" ariaLabel={tCore("more_actions")}>
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-52">
          {CONFIG.node_development && (
            <>
              <DropdownMenuItem
                onClick={() => push(`${pathname}/${props.code}/dev/overview`)}
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

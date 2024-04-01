import { KeyRound, LogOut, Settings, Shield, User } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import { useSession } from "@/hooks/core/use-session";
import { useSignOutAPI } from "@/hooks/core/sign/out/use-sign-out-api";
import { useRouter } from "@/i18n";
import { AvatarUser } from "@/components/user/avatar/avatar-user";

export const AuthUserBar = (): JSX.Element => {
  const t = useTranslations("core");
  const { push } = useRouter();
  const { session } = useSession();
  const { onSubmit } = useSignOutAPI();

  if (!session) return null;
  const { email, is_admin, is_mod, name, name_seo } = session;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="sm:flex hidden rounded-full"
          size="icon"
          ariaLabel=""
        >
          <AvatarUser user={session} sizeInRem={1.75} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="font-medium leading-none text-base">{name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem onClick={(): void => push(`/profile/${name_seo}`)}>
            <User />
            <span>{t("user-bar.my_profile")}</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={(): void => push("/settings")}>
            <Settings />
            <span>{t("user-bar.settings")}</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        {(is_admin || is_mod) && (
          <>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              {is_mod && (
                <DropdownMenuItem onClick={(): void => push("/mod")}>
                  <Shield />
                  <span>{t("user-bar.mod_cp")}</span>
                </DropdownMenuItem>
              )}

              {is_admin && (
                <DropdownMenuItem
                  onClick={(): void => {
                    window.open("/admin", "_blank");
                  }}
                >
                  <KeyRound />
                  <span>{t("user-bar.admin_cp")}</span>
                </DropdownMenuItem>
              )}
            </DropdownMenuGroup>
          </>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={async (): Promise<void> => await onSubmit()}
          >
            <LogOut />
            <span>{t("user-bar.log_out")}</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

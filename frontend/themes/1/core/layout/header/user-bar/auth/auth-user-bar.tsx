import {
  KeyRound,
  LogOut,
  PaintRoller,
  Settings,
  Shield,
  User
} from "lucide-react";
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
import { Link } from "@/i18n";
import { AvatarUser } from "@/components/user/avatar/avatar-user";

export const AuthUserBar = () => {
  const t = useTranslations("core");
  const { session } = useSession();
  const { onSubmit } = useSignOutAPI();

  if (!session) return null;
  const { email, is_admin, is_mod, name, name_seo } = session;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="sm:flex hidden rounded-full flex-shrink-0"
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
          <DropdownMenuItem asChild>
            <Link href={`/profile/${name_seo}`}>
              <User />
              <span>{t("user-bar.my_profile")}</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings">
              <Settings />
              <span>{t("user-bar.settings")}</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        {(is_admin || is_mod) && (
          <>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              {is_admin && (
                <DropdownMenuItem asChild>
                  <Link href="/theme-editor">
                    <PaintRoller />
                    <span>{t("user-bar.theme_editor")}</span>
                  </Link>
                </DropdownMenuItem>
              )}

              {is_mod && (
                <DropdownMenuItem asChild>
                  <Link href="/mod">
                    <Shield />
                    <span>{t("user-bar.mod_cp")}</span>
                  </Link>
                </DropdownMenuItem>
              )}

              {is_admin && (
                <DropdownMenuItem asChild>
                  <Link href="/admin" target="_blank">
                    <KeyRound />
                    <span>{t("user-bar.admin_cp")}</span>
                  </Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuGroup>
          </>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem onClick={async () => await onSubmit()}>
            <LogOut />
            <span>{t("user-bar.log_out")}</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

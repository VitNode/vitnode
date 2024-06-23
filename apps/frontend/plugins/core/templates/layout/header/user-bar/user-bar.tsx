"use client";

import { useTranslations } from "next-intl";
import { Link } from "@vitnode/frontend/navigation";

import { buttonVariants } from "@/components/ui/button";
import { AuthUserBar } from "./auth/auth-user-bar";
import { useSession } from "@/plugins/core/hooks/use-session";

export const UserBar = () => {
  const t = useTranslations("core");
  const { session } = useSession();

  if (session) {
    return <AuthUserBar />;
  }

  return (
    <div className="hidden items-center justify-center gap-4 sm:flex">
      <Link
        href="/login"
        className={buttonVariants({
          size: "sm",
          variant: "outline",
        })}
      >
        {t("user-bar.sign_in")}
      </Link>

      <Link
        href="/register"
        className={buttonVariants({
          size: "sm",
        })}
      >
        {t("user-bar.sign_up")}
      </Link>
    </div>
  );
};

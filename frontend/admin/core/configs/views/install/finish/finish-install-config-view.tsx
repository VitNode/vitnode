import { useTranslations } from "next-intl";
import { Home, KeyRound } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Link } from "@/i18n";
import { buttonVariants } from "@/components/ui/button";

export const FinishInstallConfigsView = () => {
  const t = useTranslations("admin.configs.install.finish");

  return (
    <Card className="text-center">
      <CardHeader>
        <CardTitle>{t("title", { name: "VitNode" })}</CardTitle>
        <CardDescription>{t("desc")}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{t("text")}</p>
      </CardContent>
      <CardFooter className="flex justify-center items-center gap-4">
        <Link href="/" className={buttonVariants()}>
          <Home /> {t("buttons.home_page")}
        </Link>
        <Link
          href="/admin"
          className={buttonVariants({
            variant: "secondary"
          })}
        >
          <KeyRound /> {t("buttons.admin_control_panel")}
        </Link>
      </CardFooter>
    </Card>
  );
};

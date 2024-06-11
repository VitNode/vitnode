import { useTranslations } from "next-intl";
import { Link } from "@vitnode/frontend/navigation";

import { CardContent, CardFooter } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";

export const InstallConfigsView = () => {
  const t = useTranslations("admin.configs.install");

  return (
    <>
      <CardContent>
        <p>{t("steps.welcome.text", { name: "VitNode" })}</p>
      </CardContent>

      <CardFooter>
        <Link href="/admin/install/license" className={buttonVariants()}>
          {t("steps.next_step")}
        </Link>
      </CardFooter>
    </>
  );
};

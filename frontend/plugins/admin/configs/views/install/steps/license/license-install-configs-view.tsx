import { useTranslations } from "next-intl";
import { Link } from "@vitnode/frontend/navigation";

import { CardContent, CardFooter } from "@/components/ui/card";
import { FormLicenseInstallConfigs } from "./form-license-install-configs";

export const LicenseInstallConfigsView = () => {
  const t = useTranslations("admin.configs.install.steps");

  return (
    <>
      <CardContent>
        <Link
          href="https://github.com/aXenDeveloper/vitnode/blob/canary/LICENSE.md"
          target="_blank"
          className="text-primary underline"
        >
          {t("license.link")}
        </Link>
      </CardContent>

      <CardFooter>
        <FormLicenseInstallConfigs />
      </CardFooter>
    </>
  );
};

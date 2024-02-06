import { useTranslations } from "next-intl";

import { HeaderContent } from "@/components/header-content/header-content";
import { FormGeneralCoreAdmin } from "./form/form-general-core-admin";

export const GeneralCoreAdminView = () => {
  const t = useTranslations("admin");

  return (
    <>
      <HeaderContent h1={t("core.general.title")} />

      <FormGeneralCoreAdmin />
    </>
  );
};

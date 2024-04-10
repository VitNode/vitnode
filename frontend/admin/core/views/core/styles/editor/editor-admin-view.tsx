import { getTranslations } from "next-intl/server";

import { getConfigFile } from "@/config/get-config-file";
import { ContentEditorAdmin } from "./content";
import { HeaderContent } from "@/components/header-content/header-content";

export const EditorAdminView = async () => {
  const data = await getConfigFile();
  const t = await getTranslations("admin.core.styles.editor");

  return (
    <>
      <HeaderContent h1={t("title")} />
      <ContentEditorAdmin data={data} />
    </>
  );
};

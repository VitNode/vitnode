import { getTranslations } from "next-intl/server";

import { ContentEditorAdmin } from "./content";
import { HeaderContent } from "@/components/header-content/header-content";
import { getConfigFile } from "@/config";

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

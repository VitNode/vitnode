import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { EditorAdminView } from "@/admin/core/views/core/styles/editor/editor-admin-view";
import { getConfigFile } from "@/config/helpers";
import { HeaderContent } from "@/components/header-content/header-content";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("admin.core.styles.editor");

  return {
    title: t("title")
  };
}

export default async function Page() {
  const data = await getConfigFile();
  const t = await getTranslations("admin.core.styles.editor");

  return (
    <>
      <HeaderContent h1={t("title")} />
      <EditorAdminView data={data} />
    </>
  );
}

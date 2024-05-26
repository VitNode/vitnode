import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { EditorAdminView } from "@/admin/core/views/core/styles/editor/editor-admin-view";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("admin.core.styles.editor");

  return {
    title: t("title")
  };
}

export default function Page() {
  return <EditorAdminView />;
}

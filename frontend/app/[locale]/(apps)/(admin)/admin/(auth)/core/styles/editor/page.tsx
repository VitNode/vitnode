import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { EditorAdminView } from "@/admin/core/views/core/styles/editor/editor-admin-view";

interface Props {
  params: {
    locale: string;
  };
}

export async function generateMetadata({
  params: { locale }
}: Props): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: "admin.core.styles.editor"
  });

  return {
    title: t("title")
  };
}

export default async function Page() {
  return <EditorAdminView />;
}

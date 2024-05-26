import { ErrorAdminView } from "@/admin/core/global/error-admin-view";
import { ThemeEditorView } from "@/admin/core/views/theme_editor/theme-editor-view";
import { getSessionData } from "@/functions/get-session-data";
import { fetcher } from "@/graphql/fetcher";
import {
  Core_Theme_Editor__Show,
  Core_Theme_Editor__ShowQuery,
  Core_Theme_Editor__ShowQueryVariables
} from "@/graphql/hooks";

const getData = async () => {
  const { data } = await fetcher<
    Core_Theme_Editor__ShowQuery,
    Core_Theme_Editor__ShowQueryVariables
  >({
    query: Core_Theme_Editor__Show
  });

  return data;
};

export default async function Page() {
  const [data, session] = await Promise.all([
    getData(),
    await getSessionData()
  ]);

  if (!session.data.core_sessions__authorization.user?.is_admin) {
    return <ErrorAdminView code="403" />;
  }

  return <ThemeEditorView {...data} />;
}

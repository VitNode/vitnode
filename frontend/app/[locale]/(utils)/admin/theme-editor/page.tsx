import { getSessionData } from "@/functions/get-session-data";
import {
  Core_Theme_Editor__Show,
  Core_Theme_Editor__ShowQuery,
  Core_Theme_Editor__ShowQueryVariables
} from "@/utils/graphql/hooks";
import { fetcher } from "@/utils/graphql/fetcher";
import { ThemeEditorView } from "@/plugins/core/admin/views/theme_editor/theme-editor-view";
import { ErrorAdminView } from "@/plugins/core/admin/global/error-admin-view";

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

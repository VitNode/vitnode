import {
  Core_Theme_Editor__Show,
  Core_Theme_Editor__ShowQuery,
  Core_Theme_Editor__ShowQueryVariables,
} from "@/graphql/hooks";
import { fetcher } from "@/graphql/fetcher";
import { ThemeEditorView } from "@/plugins/admin/views/theme_editor/theme-editor-view";
import { ErrorAdminView } from "@/plugins/admin/global/error-admin-view";
import { getSessionData } from "@/graphql/get-session-data";

const getData = async () => {
  const { data } = await fetcher<
    Core_Theme_Editor__ShowQuery,
    Core_Theme_Editor__ShowQueryVariables
  >({
    query: Core_Theme_Editor__Show,
  });

  return data;
};

export default async function Page() {
  const [data, session] = await Promise.all([
    getData(),
    await getSessionData(),
  ]);

  if (!session.data.core_sessions__authorization.user?.is_admin) {
    return <ErrorAdminView code="403" />;
  }

  return <ThemeEditorView {...data} />;
}

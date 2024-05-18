import { ThemeEditorView } from "@/admin/core/views/theme_editor/theme-editor-view";
import { fetcher } from "@/graphql/fetcher";
import {
  Core_Theme_Editor__Show,
  type Core_Theme_Editor__ShowQuery,
  type Core_Theme_Editor__ShowQueryVariables
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
  const data = await getData();

  return <ThemeEditorView {...data} />;
}

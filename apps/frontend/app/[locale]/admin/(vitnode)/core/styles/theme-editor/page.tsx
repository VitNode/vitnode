import {
  generateMetadataThemeEditor,
  ThemeEditorView,
} from 'vitnode-frontend/admin/theme_editor/theme-editor-view';

export const generateMetadata = generateMetadataThemeEditor;

export default function Page() {
  return <ThemeEditorView />;
}

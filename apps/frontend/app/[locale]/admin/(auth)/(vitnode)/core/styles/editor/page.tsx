import {
  EditorAdminView,
  generateMetadataEditorAdmin,
} from 'vitnode-frontend/admin/core/styles/editor/editor-admin-view';

export const generateMetadata = generateMetadataEditorAdmin;

export default function Page() {
  return <EditorAdminView />;
}

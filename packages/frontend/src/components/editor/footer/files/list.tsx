import { cn } from '../../../../helpers/classnames';
import { FileStateEditor } from '../../extensions/files/files';
import { useEditorState } from '../../hooks/use-editor-state';
import { ItemListFilesFooterEditor } from './item/item';

export const ListFilesFooterEditor = () => {
  const { editor } = useEditorState();
  const files: FileStateEditor[] = editor.storage.files.files;

  return (
    <ul className="mt-2 space-y-2">
      {files.map(item => {
        return (
          <li
            className={cn(
              'bg-card flex flex-col items-center gap-5 rounded-lg border px-5 py-4 shadow-sm transition-colors md:flex-row',
              {
                'border-destructive': item.error,
              },
            )}
            key={`editor_file_${item.id}`}
          >
            <ItemListFilesFooterEditor {...item} />
          </li>
        );
      })}
    </ul>
  );
};

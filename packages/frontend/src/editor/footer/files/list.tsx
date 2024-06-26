import { ItemListFilesFooterEditor } from './item/item';

import { useEditorState } from '../../hooks/use-editor-state';
import { cn } from '../../../helpers';

export const ListFilesFooterEditor = () => {
  const { files } = useEditorState();

  return (
    <ul className="mt-2 space-y-2">
      {files.map(item => {
        return (
          <li
            key={`editor_file_${item.id}`}
            className={cn(
              'bg-card flex flex-col items-center gap-5 rounded-lg border px-5 py-4 shadow-sm transition-colors md:flex-row',
              {
                'border-destructive': item.error,
              },
            )}
          >
            <ItemListFilesFooterEditor {...item} />
          </li>
        );
      })}
    </ul>
  );
};

import { Button } from '@/components/ui/button';
import { cn } from '@/helpers/classnames';
import { CONFIG } from '@/helpers/config-with-env';
import { Plus, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { FileStateEditor } from '../../../extensions/files/files';
import { useEditorState } from '../../../hooks/use-editor-state';
import { ContentItemListFilesFooterEditor } from './content';
import { IconItemListFilesFooterEditor } from './icon';

export interface ItemListFilesFooterEditorProps
  extends Omit<FileStateEditor, 'file'> {
  file?: File;
}

export const ItemListFilesFooterEditor = ({
  data,
  error,
  file,
  id,
  isLoading,
}: ItemListFilesFooterEditorProps) => {
  const t = useTranslations('core.editor.files');
  const tCore = useTranslations('core');
  const { editor } = useEditorState();

  return (
    <>
      <div
        className={cn(
          'relative flex size-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg',
          {
            'h-14 w-20': data?.width && data.height && !isLoading && !error,
          },
        )}
      >
        <IconItemListFilesFooterEditor
          alt={data?.file_alt ?? data?.file_name ?? file?.name ?? ''}
          isError={!!error}
          isLoading={isLoading}
          src={
            data?.width && data.height
              ? `${CONFIG.backend_public_url}/${data.dir_folder}/${data.file_name}`
              : null
          }
        />
      </div>

      <div className="min-w-0 flex-1 break-words md:truncate">
        {!isLoading && (
          <span className="leading-tight">
            {file?.name ?? data?.file_name ?? error}
          </span>
        )}

        <div className="text-muted-foreground space-x-2 text-sm">
          <ContentItemListFilesFooterEditor
            data={data}
            error={error}
            file={file}
            isLoading={isLoading}
          />
        </div>
      </div>

      {!isLoading && (
        <div className="flex shrink-0 flex-wrap items-center gap-1">
          {!error && data && (
            <Button
              onClick={() => {
                editor.commands.insertFileIntoContent(id);
                editor.commands.focus();
              }}
              variant="ghost"
            >
              <Plus /> {t('insert')}
            </Button>
          )}
          <Button
            ariaLabel={tCore('delete')}
            onClick={() => {
              editor.commands.deleteFile(id);
            }}
            size="icon"
            variant="destructiveGhost"
          >
            <Trash2 />
          </Button>
        </div>
      )}
    </>
  );
};

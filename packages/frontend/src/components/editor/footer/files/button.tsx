import { Paperclip } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Button } from '../../../ui/button';
import { FileStateEditor } from '../../extensions/files/files';
import { useEditorState } from '../../hooks/use-editor-state';

export const FilesButtonFooterEditor = () => {
  const t = useTranslations('core.editor');
  const ref = React.useRef<HTMLInputElement>(null);
  const { uploadFiles } = useEditorState();

  return (
    <>
      <Button onClick={() => ref.current?.click()} variant="ghost">
        <Paperclip /> {t('files.attach')}
      </Button>
      <input
        className="hidden"
        multiple
        onChange={async e => {
          const files: FileStateEditor[] = [...(e.target.files ?? [])].map(
            file => ({
              file,
              isLoading: true,
              id: Math.floor(Math.random() * 1000) + file.size,
            }),
          );

          await uploadFiles({ files });
        }}
        ref={ref}
        type="file"
        value=""
      />
    </>
  );
};

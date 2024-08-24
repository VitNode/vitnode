'use client';

import { TextLanguage } from '@/graphql/types';
import { Content, EditorContent, useEditor } from '@tiptap/react';
import { useLocale } from 'next-intl';
import React from 'react';

import { Skeleton } from '../components/ui/skeleton';
import { cn } from '../helpers/classnames';
import { useGlobals } from '../hooks/use-globals';
import { EmojiExtensionEditor } from './extensions/emoji/emoji';
import { extensionsEditor } from './extensions/extensions';
import {
  UploadFilesHandlerEditorArgs,
  useUploadFilesHandlerEditor,
} from './extensions/files/hooks/use-upload-files-handler-editor.ts';
import { FooterEditor } from './footer/footer';
import { EditorStateContext } from './hooks/use-editor-state';
import { ToolBarEditor } from './toolbar/toolbar';

interface Props extends Omit<UploadFilesHandlerEditorArgs, 'value'> {
  autoFocus?: boolean;
  className?: string;
}

interface WithLanguage extends Props {
  disableLanguages?: never;
  onChange: (value: TextLanguage[]) => void;
  value: TextLanguage[];
}

interface WithoutLanguage extends Props {
  disableLanguages: true;
  onChange: (value: string) => void;
  value: string;
}

export const EditorSkeleton = ({ className }: { className?: string }) => {
  return <Skeleton className={cn('h-32 w-full', className)} />;
};

export const Editor = ({
  allowUploadFiles,
  autoFocus,
  className,
  disableLanguages,
  onChange,
  value,
}: WithLanguage | WithoutLanguage) => {
  const { files, setFiles, uploadFiles } = useUploadFilesHandlerEditor({
    value,
    allowUploadFiles,
  });
  const locale = useLocale();
  const { defaultLanguage } = useGlobals();
  const [selectedLanguage, setSelectedLanguage] = React.useState(
    locale || defaultLanguage,
  );
  const editor = useEditor({
    autofocus: autoFocus,
    extensions: [
      ...extensionsEditor({
        uploadFiles,
      }),
      EmojiExtensionEditor,
    ],
    editorProps: {
      attributes: {
        class: cn(
          'bg-card min-h-32 resize-y overflow-auto p-4 focus:outline-none [&>*:not(:last-child)]:mb-[0.5rem]',
        ),
      },
    },
    content: (() => {
      const current = Array.isArray(value)
        ? (value.find(v => v.language_code === selectedLanguage)?.value ?? '')
        : value;

      try {
        return JSON.parse(current);
      } catch (_) {
        return current;
      }
    })(),
    onUpdate({ editor }) {
      const content = JSON.stringify(editor.getJSON());
      const currentValue = Array.isArray(value) ? value : [];

      if (disableLanguages) {
        onChange(content);

        return;
      }

      // Remove form the array if content is empty
      if (editor.isEmpty) {
        onChange(
          currentValue.filter(v => v.language_code !== selectedLanguage),
        );

        return;
      }

      onChange([
        ...currentValue.filter(v => v.language_code !== selectedLanguage),
        { language_code: selectedLanguage, value: content },
      ]);
    },
  });

  // Toggle the editor content when the selected language changes
  React.useEffect(() => {
    if (!editor || disableLanguages || !Array.isArray(value)) return;

    const findValue =
      value.find(v => v.language_code === selectedLanguage)?.value ?? '';
    if (!findValue) {
      editor.commands.clearContent();

      return;
    }

    const content: Content = JSON.parse(findValue);
    editor.commands.setContent(content);
  }, [selectedLanguage]);

  if (!editor) return null;

  return (
    <EditorStateContext.Provider
      value={{
        files,
        editor,
        uploadFiles,
        allowUploadFiles,
        value,
        onChange: onChange as (value: string | TextLanguage[]) => void,
        selectedLanguage,
        setFiles,
      }}
    >
      <div
        className={cn('border-input rounded-md border shadow-sm', className)}
      >
        <div className="relative">
          <ToolBarEditor />
          <EditorContent
            className="[&_.ProseMirror-selectednode]:ring-ring break-words [&_.ProseMirror-selectednode]:w-fit [&_.ProseMirror-selectednode]:outline-none [&_.ProseMirror-selectednode]:ring-4 [&_.ProseMirror-selectednode]:ring-offset-2 [&_.node-files]:inline-flex"
            editor={editor}
          />
        </div>
        <FooterEditor
          disableLanguages={disableLanguages}
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
        />
      </div>
    </EditorStateContext.Provider>
  );
};

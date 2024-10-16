'use client';

import { StringLanguage } from '@/graphql/types';
import { useSession } from '@/hooks/use-session';
import { useSessionAdmin } from '@/hooks/use-session-admin';
import { Content, EditorContent, useEditor } from '@tiptap/react';
import { useLocale } from 'next-intl';
import React from 'react';

import { cn } from '../../helpers/classnames';
import { useGlobalData } from '../../hooks/use-global-data';
import { Skeleton } from '../ui/skeleton';
import { EmojiExtensionEditor } from './extensions/emoji/emoji';
import { useExtensionsEditor } from './extensions/extensions';
import { getFilesFromContent } from './extensions/files/hooks/functions';
import { useFilesExtensionEditor } from './extensions/files/hooks/use-files-extension-editor';
import { FooterEditor } from './footer/footer';
import { EditorStateContext } from './hooks/use-editor-state';
import { ToolBarEditor } from './toolbar/toolbar';

interface Props {
  allowUploadFiles?: {
    folder: string;
    plugin: string;
  };
  autofocus?: boolean;
  className?: string;
  disabled?: boolean;
}

interface WithLanguage extends Props {
  disableLanguages?: never;
  onChange: (value: StringLanguage[]) => void;
  value: StringLanguage[];
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
  autofocus,
  className,
  disableLanguages,
  onChange,
  value,
  disabled,
}: WithLanguage | WithoutLanguage) => {
  const locale = useLocale();
  const { defaultLanguage } = useGlobalData();
  const [selectedLanguage, setSelectedLanguage] = React.useState(
    locale || defaultLanguage,
  );
  const session = useSession();
  const adminSession = useSessionAdmin();
  const allowUploadFilesSession =
    session.session?.files_permissions.allow_upload ??
    adminSession.session?.files_permissions.allow_upload ??
    false;
  const { handleDelete, checkUploadFile, uploadFile } = useFilesExtensionEditor(
    {
      allowUploadFiles,
    },
  );
  const extensions = useExtensionsEditor({
    fileSystem: {
      editorValue: value,
      files: Array.isArray(value) ? getFilesFromContent(value) : [],
      selectedLanguage,
      handleDelete,
      checkUploadFile,
      uploadFile,
      allowUpload: allowUploadFilesSession,
    },
  });

  const editor = useEditor({
    autofocus: !!autofocus,
    immediatelyRender: false,
    extensions: [...extensions, EmojiExtensionEditor],
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLanguage]);

  if (!editor) return null;

  return (
    <EditorStateContext.Provider
      value={{
        editor,
        allowUploadFiles: allowUploadFilesSession
          ? allowUploadFiles
          : undefined,
        value,
        onChange: onChange as (value: string | StringLanguage[]) => void,
        selectedLanguage,
      }}
    >
      <div
        className={cn(
          'border-input relative rounded-md border shadow-sm',
          className,
          {
            'pointer-events-none cursor-not-allowed opacity-50': disabled,
          },
        )}
      >
        <ToolBarEditor />
        <EditorContent
          className="[&_.ProseMirror-selectednode]:ring-ring break-words [&_.ProseMirror-selectednode]:w-fit [&_.ProseMirror-selectednode]:outline-none [&_.ProseMirror-selectednode]:ring-4 [&_.ProseMirror-selectednode]:ring-offset-2 [&_.node-files]:inline-flex"
          editor={editor}
        />

        <FooterEditor
          disableLanguages={disableLanguages}
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
        />
      </div>
    </EditorStateContext.Provider>
  );
};

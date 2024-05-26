"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";

import { cn } from "@/functions/classnames";
import { TextLanguage } from "@/graphql/hooks";
import { ToolBarEditor } from "./toolbar/toolbar";
import { FooterEditor } from "./footer/footer";
import { useGlobals } from "@/hooks/core/use-globals";
import { extensionsEditor } from "./extensions/extensions";
import { EmojiExtensionEditor } from "./extensions/emoji/emoji";
import { Skeleton } from "../ui/skeleton";
import {
  useUploadFilesHandlerEditor,
  UploadFilesHandlerEditorArgs
} from "./extensions/files/hooks/use-upload-files-handler-editor.ts";
import { EditorStateContext } from "./hooks/use-editor-state";

interface Props extends Omit<UploadFilesHandlerEditorArgs, "value"> {
  autoFocus?: boolean;
  className?: string;
}

interface WithLanguage extends Props {
  onChange: (value: TextLanguage[]) => void;
  value: TextLanguage[];
  disableLanguage?: never;
}

interface WithoutLanguage extends Props {
  disableLanguage: true;
  onChange: (value: string) => void;
  value: string;
}

export const EditorSkeleton = ({ className }: { className?: string }) => {
  return <Skeleton className={cn("w-full h-32", className)} />;
};

export const Editor = ({
  allowUploadFiles,
  autoFocus,
  className,
  disableLanguage,
  onChange,
  value
}: WithLanguage | WithoutLanguage) => {
  const { files, setFiles, uploadFiles } = useUploadFilesHandlerEditor({
    value,
    allowUploadFiles
  });
  const locale = useLocale();
  const { config, defaultLanguage } = useGlobals();
  const [selectedLanguage, setSelectedLanguage] = useState(
    locale ?? defaultLanguage
  );
  const editor = useEditor({
    autofocus: autoFocus,
    extensions: [
      ...extensionsEditor({
        allowH1: config.editor.allow_head_h1,
        uploadFiles
      }),
      EmojiExtensionEditor
    ],
    editorProps: {
      attributes: {
        class: cn(
          "min-h-32 p-4 focus:outline-none bg-card resize-y overflow-auto [&>*:not(:last-child)]:mb-[0.5rem]"
        )
      }
    },
    content: (() => {
      const current = Array.isArray(value)
        ? value.find(v => v.language_code === selectedLanguage)?.value ?? ""
        : value;

      try {
        return JSON.parse(current);
      } catch (e) {
        return current;
      }
    })(),
    onUpdate({ editor }) {
      const content = JSON.stringify(editor.getJSON());
      const currentValue = Array.isArray(value) ? value : [];

      if (disableLanguage) {
        onChange(content);

        return;
      }

      // Remove form the array if content is empty
      if (editor.isEmpty) {
        onChange(
          currentValue.filter(v => v.language_code !== selectedLanguage)
        );

        return;
      }

      onChange([
        ...currentValue.filter(v => v.language_code !== selectedLanguage),
        { language_code: selectedLanguage, value: content }
      ]);
    }
  });

  // Toggle the editor content when the selected language changes
  useEffect(() => {
    if (!editor || disableLanguage || !Array.isArray(value)) return;

    const findValue =
      value.find(v => v.language_code === selectedLanguage)?.value ?? "";
    if (!findValue) {
      editor.commands.clearContent();

      return;
    }

    editor.commands.setContent(JSON.parse(findValue));
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
        onChange: onChange as (value: TextLanguage[] | string) => void,
        selectedLanguage,
        setFiles
      }}
    >
      <div
        className={cn("border border-input rounded-md shadow-sm", className)}
      >
        <div className="relative">
          <ToolBarEditor editor={editor} />
          <EditorContent
            className="break-words [&_.ProseMirror-selectednode]:outline-none [&_.ProseMirror-selectednode]:ring-1 [&_.ProseMirror-selectednode]:ring-ring [&_.ProseMirror-selectednode]:w-fit [&_.node-files]:inline-flex"
            editor={editor}
          />
        </div>
        <FooterEditor
          disableLanguage={disableLanguage}
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
        />
      </div>
    </EditorStateContext.Provider>
  );
};

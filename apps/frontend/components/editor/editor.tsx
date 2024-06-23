"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import * as React from "react";
import { useLocale } from "next-intl";
import { cn } from "vitnode-frontend/helpers";

import { TextLanguage } from "@/graphql/hooks";
import { ToolBarEditor } from "./toolbar/toolbar";
import { FooterEditor } from "./footer/footer";
import { useGlobals } from "@/plugins/core/hooks/use-globals";
import { extensionsEditor } from "./extensions/extensions";
import { EmojiExtensionEditor } from "./extensions/emoji/emoji";
import { Skeleton } from "../ui/skeleton";
import {
  useUploadFilesHandlerEditor,
  UploadFilesHandlerEditorArgs,
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
  return <Skeleton className={cn("h-32 w-full", className)} />;
};

export const Editor = ({
  allowUploadFiles,
  autoFocus,
  className,
  disableLanguage,
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
    locale ?? defaultLanguage,
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
          "bg-card min-h-32 resize-y overflow-auto p-4 focus:outline-none [&>*:not(:last-child)]:mb-[0.5rem]",
        ),
      },
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
        setFiles,
      }}
    >
      <div
        className={cn("border-input rounded-md border shadow-sm", className)}
      >
        <div className="relative">
          <ToolBarEditor />
          <EditorContent
            className="[&_.ProseMirror-selectednode]:ring-ring break-words [&_.ProseMirror-selectednode]:w-fit [&_.ProseMirror-selectednode]:outline-none [&_.ProseMirror-selectednode]:ring-4 [&_.ProseMirror-selectednode]:ring-offset-2 [&_.node-files]:inline-flex"
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

"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";

import { cn } from "@/functions/classnames";
import type { TextLanguage } from "@/graphql/hooks";
import { ToolBarEditor } from "./toolbar/toolbar";
import { FooterEditor } from "./footer/footer";
import { useGlobals } from "@/hooks/core/use-globals";
import { extensionsEditor } from "./extensions/extensions";
import { HeadingExtensionEditor } from "./extensions/heading";
import { EmojiExtensionEditor } from "./extensions/emoji/emoji";
import { Skeleton } from "../ui/skeleton";

interface Props {
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
  autoFocus,
  className,
  disableLanguage,
  onChange,
  value
}: WithLanguage | WithoutLanguage) => {
  const locale = useLocale();
  const { config, defaultLanguage } = useGlobals();
  const [selectedLanguage, setSelectedLanguage] = useState(
    locale ?? defaultLanguage
  );
  const editor = useEditor({
    autofocus: autoFocus,
    extensions: [
      ...extensionsEditor,
      EmojiExtensionEditor,
      HeadingExtensionEditor({ allowH1: config.editor.allow_head_h1 })
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
        ? value.filter(v => v.language_code === selectedLanguage)[0]?.value ??
          ""
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
    <div className={cn("border border-input rounded-md shadow-sm", className)}>
      <div className="relative">
        <ToolBarEditor editor={editor} />
        <EditorContent
          className="break-all [&_.ProseMirror-selectednode]:outline-none [&_.ProseMirror-selectednode]:ring-1 [&_.ProseMirror-selectednode]:ring-ring [&_.ProseMirror-selectednode]:rounded-md [&_.ProseMirror-selectednode]:w-fit"
          editor={editor}
        />
      </div>
      <FooterEditor
        editor={editor}
        disableLanguage={disableLanguage}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
      />
    </div>
  );
};

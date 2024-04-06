"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";

import { cn } from "@/functions/classnames";
import type { TextLanguage } from "@/graphql/hooks";
import { ToolBarEditor } from "./toolbar/toolbar";
import { FooterEditor } from "./footer/footer";

interface Props {
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

export const EditorTest = ({
  className,
  disableLanguage,
  onChange,
  value
}: WithLanguage | WithoutLanguage) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6]
        }
      }),
      Underline,
      Bold,
      Italic,
      Strike
    ],
    editorProps: {
      attributes: {
        class: cn(
          "min-h-32 p-4 focus:outline-none bg-card resize-y overflow-auto"
        )
      }
    },
    content: "<p>Hello World! 🌎️</p>"
  });

  if (!editor) return null;

  return (
    <div className={cn("border border-input rounded-md shadow-sm", className)}>
      <ToolBarEditor editor={editor} />
      <EditorContent editor={editor} />
      <FooterEditor />
    </div>
  );
};

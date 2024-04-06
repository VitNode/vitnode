"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";

import { cn } from "@/functions/classnames";
import type { TextLanguage } from "@/graphql/hooks";
import { ToolBarEditor } from "./toolbar/toolbar";
import { FooterEditor } from "./footer/footer";
import { useGlobals } from "@/hooks/core/use-globals";
import { extensionsEditor } from "./extensions";

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
  const locale = useLocale();
  const { defaultLanguage } = useGlobals();
  const [selectedLanguage, setSelectedLanguage] = useState(
    locale ?? defaultLanguage
  );
  const editor = useEditor({
    extensions: extensionsEditor,
    editorProps: {
      attributes: {
        class: cn(
          "min-h-32 p-4 focus:outline-none bg-card resize-y overflow-auto"
        )
      }
    },
    content: Array.isArray(value)
      ? value.filter(v => v.language_code === selectedLanguage)[0]?.value ?? ""
      : value,
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
      <ToolBarEditor editor={editor} />
      <EditorContent editor={editor} />
      <FooterEditor
        editor={editor}
        disableLanguage={disableLanguage}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
      />
    </div>
  );
};

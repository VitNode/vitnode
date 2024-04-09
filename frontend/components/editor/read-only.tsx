import { useLocale } from "next-intl";
import { generateHTML } from "@tiptap/html";

import type { TextLanguage } from "@/graphql/hooks";
import { extensionsEditor, headingExtensionEditor } from "./extensions";
import { cn } from "@/functions/classnames";

interface Props {
  value: TextLanguage[];
  className?: string;
}

export const ReadOnlyEditor = ({ className, value }: Props) => {
  const locale = useLocale();

  const currentValue = (): string => {
    const current =
      value.find(item => item.language_code === locale)?.value ?? "";

    if (current) {
      return current;
    }

    const currentEnglish = value.find(
      item => item.language_code === "en"
    )?.value;

    if (currentEnglish) {
      return currentEnglish;
    }

    if (value.length > 0) {
      return value[0].value;
    }

    return "";
  };

  const getText = (): string => {
    try {
      return generateHTML(JSON.parse(currentValue()), [
        ...extensionsEditor,
        headingExtensionEditor({ allowH1: true })
      ]);
    } catch (e) {
      return currentValue();
    }
  };

  return (
    <div
      className={cn("break-all", className)}
      dangerouslySetInnerHTML={{
        __html: getText()
      }}
    />
  );
};

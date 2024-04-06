import { useLocale } from "next-intl";
import { generateHTML } from "@tiptap/html";

import type { TextLanguage } from "@/graphql/hooks";
import { extensionsEditor } from "./extensions";

interface Props {
  value: TextLanguage[];
}

export const ReadOnlyEditor = ({ value }: Props) => {
  const locale = useLocale();
  const currentValue = () => {
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

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: generateHTML(JSON.parse(currentValue()), extensionsEditor)
      }}
    />
  );
};

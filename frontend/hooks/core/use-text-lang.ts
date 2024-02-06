import { useLocale } from "next-intl";

import type { TextLanguage } from "@/graphql/hooks";
import { removeSpecialCharacters } from "@/functions/remove-special-characters";

export const useTextLang = () => {
  const locale = useLocale();

  const convertText = (text?: TextLanguage[]): string => {
    if (!text || text.length === 0) {
      return "";
    }

    if (text.length <= 1) {
      return text[0].value;
    }

    const textFromLang = text.find(t => t.language_code === locale);

    if (textFromLang) {
      return textFromLang.value;
    }

    return text[0].value;
  };

  const convertNameToLink = ({
    id,
    name
  }: {
    id: number;
    name: TextLanguage[];
  }) => {
    const text = removeSpecialCharacters(convertText(name))
      .replace(/\//g, "-")
      .toLowerCase();

    return `${text}-${id}`;
  };

  return {
    convertText,
    convertNameToLink
  };
};

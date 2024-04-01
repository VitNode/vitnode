import { useLocale } from "next-intl";

import type { TextLanguage } from "@/graphql/hooks";
import { removeSpecialCharacters } from "@/functions/remove-special-characters";

export const getConvertTextLang = ({
  locale,
  text
}: {
  locale: string;
  text?: TextLanguage[];
}): string => {
  if (!text || text.length === 0) {
    return "";
  }

  if (text.length <= 1) {
    return text[0].value;
  }

  const textFromLang = text.find((t): boolean => t.language_code === locale);

  if (textFromLang) {
    return textFromLang.value;
  }

  return text[0].value;
};

export const useTextLang = (): {
  convertNameToLink: (props: { id: number; name: TextLanguage[] }) => string;
  convertText: (text?: TextLanguage[]) => string;
} => {
  const locale = useLocale();

  const convertNameToLink = ({
    id,
    name
  }: {
    id: number;
    name: TextLanguage[];
  }): string => {
    const text = removeSpecialCharacters(
      getConvertTextLang({ locale, text: name })
    ).toLowerCase();

    return `${text}-${id}`;
  };

  return {
    convertText: (text?: TextLanguage[]): string =>
      getConvertTextLang({ locale, text }),
    convertNameToLink
  };
};

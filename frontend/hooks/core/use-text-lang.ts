import { useLocale } from "next-intl";

import type { TextLanguage } from "@/graphql/hooks";
import { removeSpecialCharacters } from "@/functions/remove-special-characters";

const getConvertTextLang = ({
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

  const textFromLang = text.find(t => t.language_code === locale);

  if (textFromLang) {
    return textFromLang.value;
  }

  return text[0].value;
};

export const getConvertNameToLink = ({
  id,
  locale,
  name
}: {
  id: number;
  locale: string;
  name: TextLanguage[];
}) => {
  const text = removeSpecialCharacters(
    getConvertTextLang({ locale, text: name })
  ).toLowerCase();

  return `${text}-${id}`;
};

export const useTextLang = () => {
  const locale = useLocale();

  return {
    convertText: (text?: TextLanguage[]) =>
      getConvertTextLang({ locale, text }),
    convertNameToLink: ({ id, name }: { id: number; name: TextLanguage[] }) =>
      getConvertNameToLink({ id, name, locale })
  };
};

export const getTextLang = ({ locale }: { locale: string }) => {
  return {
    convertText: (text?: TextLanguage[]) =>
      getConvertTextLang({ locale, text }),
    convertNameToLink: ({ id, name }: { id: number; name: TextLanguage[] }) =>
      getConvertNameToLink({ id, name, locale })
  };
};

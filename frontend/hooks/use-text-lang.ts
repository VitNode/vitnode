import { useLocale } from 'next-intl';

import { TextLanguage } from '../graphql/hooks';

export const useTextLang = () => {
  const locale = useLocale();

  const convertText = (text: TextLanguage[]): string => {
    if (text.length <= 0) {
      throw new Error('Text is empty');
    }

    if (text.length <= 1) {
      return text[0].name;
    }

    const textFromLang = text.find(t => t.id_language === locale);

    if (textFromLang) {
      return textFromLang.name;
    }

    // If not found, check if there is a text in English
    const textFromEnglishLang = text.find(t => t.id_language === 'en');

    if (textFromEnglishLang) {
      return textFromEnglishLang.name;
    }

    return text[0].name;
  };

  return {
    convertText
  };
};

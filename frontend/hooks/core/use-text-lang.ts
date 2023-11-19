import { useLocale } from 'next-intl';

import { TextLanguage } from '@/graphql/hooks';

export const useTextLang = () => {
  const locale = useLocale();

  const convertText = (text: TextLanguage[]): string => {
    if (text.length <= 0) {
      return '';
    }

    if (text.length <= 1) {
      return text[0].value;
    }

    const textFromLang = text.find(t => t.id_language === locale);

    if (textFromLang) {
      return textFromLang.value;
    }

    return text[0].value;
  };

  return {
    convertText
  };
};

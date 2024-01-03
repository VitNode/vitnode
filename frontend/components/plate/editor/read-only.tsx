'use client';

import { Plate, PlateContent } from '@udecode/plate-common';
import { useLocale } from 'next-intl';
import { useMemo } from 'react';

import type { TextLanguage } from '@/graphql/hooks';

interface Props {
  value: TextLanguage[];
  className?: string;
}

export const ReadOnlyEditor = ({ className, value }: Props) => {
  const locale = useLocale();

  const initialValue = useMemo(() => {
    if (!value) return;

    const initialValue = value.find(value => value.id_language === locale);
    if (initialValue) {
      return JSON.parse(initialValue.value);
    }

    const englishValue = value.find(value => value.id_language === 'en');
    if (englishValue) {
      return JSON.parse(englishValue.value);
    }

    return JSON.parse(value[0].value);
  }, [locale, value]);

  return (
    <Plate key={locale} initialValue={initialValue} readOnly>
      <PlateContent className={className} />
    </Plate>
  );
};

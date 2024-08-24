import { GetHelpersForEmailType, getTranslationForEmail } from '@/providers';
import { Button, Section, Text } from '@react-email/components';
import React from 'react';

export const ContentCreateKeyEmail = ({
  language,
  helpers: { frontend_url, color },
  key,
}: {
  helpers: GetHelpersForEmailType;
  key: string;
  language: string;
}) => {
  const t = getTranslationForEmail('core.reset_password.email', language);

  return (
    <Section>
      <Text>{t('title')}</Text>
      <Button
        className={`bg-${color.primary.DEFAULT} rounded-md text-sm font-medium text-${color.primary.foreground} px-4 py-2.5`}
        href={`${frontend_url}/reset_password?key=${key}`}
      >
        {t('button')}
      </Button>
      <Text>{t('desc')}</Text>
    </Section>
  );
};

import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
  Img,
} from '@react-email/components';
import React from 'react';

import { getTranslationForEmail } from '../email';
import { GetHelpersForEmailType } from '../email-helpers.type';

export interface EmailTemplateProps {
  children: React.ReactNode;
  helpers: GetHelpersForEmailType;
  user: {
    language: string;
    name: string;
  };
  header?: React.ReactNode;
  preview_text?: string;
}

export const EmailTemplate = ({
  preview_text,
  children = 'This is the email template.',
  helpers: {
    color,
    frontend_url,
    site_name,
    site_short_name,
    backend_url,
    logo,
  },
  user,
}: EmailTemplateProps) => {
  const t = getTranslationForEmail('admin.core.email', user.language);

  return (
    <Html>
      <Head />
      {preview_text && <Preview>{preview_text}</Preview>}
      <Tailwind
        config={{
          theme: {
            fontSize: {
              xs: ['12px', { lineHeight: '16px' }],
              sm: ['14px', { lineHeight: '20px' }],
              base: ['16px', { lineHeight: '24px' }],
              lg: ['18px', { lineHeight: '28px' }],
              xl: ['20px', { lineHeight: '28px' }],
              '2xl': ['24px', { lineHeight: '32px' }],
              '3xl': ['30px', { lineHeight: '36px' }],
              '4xl': ['36px', { lineHeight: '36px' }],
              '5xl': ['48px', { lineHeight: '1' }],
              '6xl': ['60px', { lineHeight: '1' }],
              '7xl': ['72px', { lineHeight: '1' }],
              '8xl': ['96px', { lineHeight: '1' }],
              '9xl': ['144px', { lineHeight: '1' }],
            },
            spacing: {
              px: '1px',
              0: '0',
              0.5: '2px',
              1: '4px',
              1.5: '6px',
              2: '8px',
              2.5: '10px',
              3: '12px',
              3.5: '14px',
              4: '16px',
              5: '20px',
              6: '24px',
              7: '28px',
              8: '32px',
              9: '36px',
              10: '40px',
              11: '44px',
              12: '48px',
              14: '56px',
              16: '64px',
              20: '80px',
              24: '96px',
              28: '112px',
              32: '128px',
              36: '144px',
              40: '160px',
              44: '176px',
              48: '192px',
              52: '208px',
              56: '224px',
              60: '240px',
              64: '256px',
              72: '288px',
              80: '320px',
              96: '384px',
            },
          },
        }}
      >
        <Body
          className={`bg-${color.background} mx-auto px-2 font-sans text-${color.foreground}`}
        >
          <Container className="max-w-[600px]">
            <Section className="my-8 text-xl">
              {logo ? (
                <Img
                  src={`${backend_url}/public/${logo.dir_folder}/${logo.file_name}`}
                  className="max-w-xs"
                  alt={site_name}
                />
              ) : (
                site_name
              )}
            </Section>

            <Section
              className={`rounded border border-solid border-${color.border} p-5 bg-${color.card}`}
            >
              <Text className="mt-0">
                {t('hello')}{' '}
                <span className={`font-bold text-${color.primary.DEFAULT}`}>
                  {user.name}
                </span>
                ,
              </Text>
              {typeof children === 'string' ? (
                <Text className="text-[14px] leading-[24px] text-black">
                  {children}
                </Text>
              ) : (
                children
              )}

              <Hr
                className={`mx-0 my-6 w-full border border-solid border-${color.border}`}
              />
              <Text className={`text-xs text-${color.muted.foreground}`}>
                {t('footer')}{' '}
                <Link
                  href="mailto:aXenDeveloper@gmail.com"
                  className={`text-${color.primary.DEFAULT}`}
                >
                  aXenDeveloper@gmail.com
                </Link>
              </Text>
            </Section>

            <Section className="my-8 text-center text-sm">
              <Link
                href={frontend_url}
                className={`text-${color.muted.foreground}`}
              >
                {site_short_name} © {new Date().getFullYear()}
              </Link>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default EmailTemplate;

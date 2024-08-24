'use client';

import { AutoForm } from '@/components/form/auto-form';
import { AutoFormInput } from '@/components/form/fields/input';
import { AutoFormRadioGroup } from '@/components/form/fields/radio-group';
import { DependencyType } from '@/components/form/type';
import { Admin__Core_Security__Captcha__ShowQuery } from '@/graphql/queries/admin/security/admin__core_security__captcha__show.generated';
import { Link } from '@/navigation';
import { SquareArrowOutUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useCaptchaSecurityAdmin } from './hooks/use-captcha-security-admin';

export const ContentCaptchaSecurityAdmin = (
  data: Admin__Core_Security__Captcha__ShowQuery,
) => {
  const t = useTranslations('admin.core.settings.security.captcha');
  const { onSubmit, formSchema } = useCaptchaSecurityAdmin(data);

  return (
    <AutoForm
      dependencies={[
        {
          sourceField: 'type',
          type: DependencyType.HIDES,
          targetField: 'site_key',
          when: (type: string) => type === 'none',
        },
        {
          sourceField: 'type',
          type: DependencyType.HIDES,
          targetField: 'secret_key',
          when: (type: string) => type === 'none',
        },
        {
          sourceField: 'type',
          type: DependencyType.REQUIRES,
          targetField: 'site_key',
          when: (type: string) => type !== 'none',
        },
        {
          sourceField: 'type',
          type: DependencyType.REQUIRES,
          targetField: 'secret_key',
          when: (type: string) => type !== 'none',
        },
      ]}
      fieldConfig={{
        type: {
          label: t('type.title'),
          fieldType: props => (
            <AutoFormRadioGroup
              {...props}
              labels={{
                none: {
                  title: t('type.none.title'),
                },
                cloudflare_turnstile: {
                  title: t('type.cloudflare_turnstile.title'),
                  description: t.rich(`type.cloudflare_turnstile.desc`, {
                    link: text => (
                      <Link
                        className="flex items-center gap-1"
                        href="https://www.cloudflare.com/products/turnstile/"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {text}
                        <SquareArrowOutUpRight className="size-3" />
                      </Link>
                    ),
                  }),
                },
                recaptcha_v3: {
                  title: t('type.recaptcha_v3'),
                  description: t.rich(`type.recaptcha_desc`, {
                    link: text => (
                      <Link
                        className="flex items-center gap-1"
                        href="https://www.google.com/recaptcha/about/"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {text}
                        <SquareArrowOutUpRight className="size-3" />
                      </Link>
                    ),
                  }),
                },
                recaptcha_v2_invisible: {
                  title: t('type.recaptcha_v2_invisible'),
                  description: t.rich(`type.recaptcha_desc`, {
                    link: text => (
                      <Link
                        className="flex items-center gap-1"
                        href="https://www.google.com/recaptcha/about/"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {text}
                        <SquareArrowOutUpRight className="size-3" />
                      </Link>
                    ),
                  }),
                },
                recaptcha_v2_checkbox: {
                  title: t('type.recaptcha_v2_checkbox'),
                  description: t.rich(`type.recaptcha_desc`, {
                    link: text => (
                      <Link
                        className="flex items-center gap-1"
                        href="https://www.google.com/recaptcha/about/"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {text}
                        <SquareArrowOutUpRight className="size-3" />
                      </Link>
                    ),
                  }),
                },
              }}
            />
          ),
        },
        site_key: {
          label: t('site_key'),
          fieldType: AutoFormInput,
        },
        secret_key: {
          label: t('secret_key'),
          fieldType: AutoFormInput,
        },
      }}
      formSchema={formSchema}
      onSubmit={onSubmit}
      theme="horizontal"
    />
  );
};

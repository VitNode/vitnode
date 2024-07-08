/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as React from 'react';
import { useLocale } from 'next-intl';
import { useTheme } from 'next-themes';

import { useGlobals } from '../use-globals';

import { CaptchaTypeEnum } from '@/graphql/graphql';

export const useCaptcha = () => {
  const locale = useLocale();
  const { resolvedTheme } = useTheme();
  const [isReady, setIsReady] = React.useState(false);
  const [token, setToken] = React.useState<string>('');
  const {
    config: {
      security: { captcha: config },
    },
  } = useGlobals();

  const handleLoaded = () => {
    const elementId = 'vitnode_recaptcha';
    if (
      config.type === CaptchaTypeEnum.recaptcha_v2_checkbox ||
      config.type === CaptchaTypeEnum.recaptcha_v2_invisible
    ) {
      // @ts-expect-error
      window.grecaptcha.ready(() => {
        // @ts-expect-error
        window.grecaptcha.render(elementId, {
          sitekey: config.site_key,
          theme: resolvedTheme,
          locale,
          size:
            config.type === CaptchaTypeEnum.recaptcha_v2_invisible
              ? 'invisible'
              : null,
          callback: (token: string) => {
            setToken(token);
          },
        });
      });
    } else if (config.type === CaptchaTypeEnum.cloudflare_turnstile) {
      // @ts-expect-error
      window.turnstile.render(`#${elementId}`, {
        sitekey: config.site_key,
        theme: resolvedTheme,
        language: locale,
        callback: (token: string) => {
          setToken(token);
        },
      });
    }

    setIsReady(true);
  };

  React.useEffect(() => {
    if (!config.type) return;

    const functionCF = 'cf_handleLoaded';
    const googleCaptchaDomain =
      'https://www.google.com/recaptcha/api.js?hl=${locale}';

    // Load script
    const script = document.createElement('script');

    if (
      config.type === CaptchaTypeEnum.recaptcha_v2_checkbox ||
      config.type === CaptchaTypeEnum.recaptcha_v2_invisible
    ) {
      script.src = `${googleCaptchaDomain}&render=explicit`;
    } else if (config.type === CaptchaTypeEnum.recaptcha_v3) {
      script.src = `${googleCaptchaDomain}&render=${config.site_key}`;
    } else if (config.type === CaptchaTypeEnum.cloudflare_turnstile) {
      window[functionCF] = handleLoaded;

      script.src = `https://challenges.cloudflare.com/turnstile/v0/api.js?onload=${functionCF}`;
    }
    if (!script.src) return;

    document.body.appendChild(script);
    script.addEventListener('load', handleLoaded);

    return () => {
      script.removeEventListener('load', handleLoaded);
      window[functionCF] = null;
      document.body.removeChild(script);
    };
  }, []);

  const getTokenFromCaptcha = async (): Promise<string> => {
    if (config.type === CaptchaTypeEnum.recaptcha_v3) {
      // Captcha
      return new Promise<string>(resolve => {
        // @ts-expect-error
        window.grecaptcha.ready(async () => {
          try {
            // @ts-expect-error
            const token = await window.grecaptcha.execute(config.site_key, {
              action: 'submit',
            });

            resolve(token);
          } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Captcha error', error);
          }

          resolve('');
        });
      });
    }

    return token;
  };

  return { getTokenFromCaptcha, isReady };
};

/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as React from 'react';
import { useLocale } from 'next-intl';
import { useTheme } from 'next-themes';

export const useCaptcha = () => {
  const locale = useLocale();
  const { resolvedTheme } = useTheme();
  const [isReady, setIsReady] = React.useState(false);
  const [token, setToken] = React.useState<string>('');

  const config: {
    site_key: string;
    type: 'recaptcha_v2_checkbox' | 'recaptcha_v2_invisible' | 'recaptcha_v3';
  } = {
    site_key: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
    type: 'recaptcha_v2_invisible',
  };

  const handleLoaded = () => {
    if (
      config.type === 'recaptcha_v2_checkbox' ||
      config.type === 'recaptcha_v2_invisible'
    ) {
      // @ts-expect-error
      window.grecaptcha.ready(() => {
        // @ts-expect-error
        window.grecaptcha.render('vitnode_recaptcha', {
          sitekey: config.site_key,
          theme: resolvedTheme,
          locale,
          size: config.type === 'recaptcha_v2_invisible' ? 'invisible' : null,
          callback: (token: string) => {
            setToken(token);
          },
        });
      });
    }

    setIsReady(true);
  };

  React.useEffect(() => {
    if (!config.type) return;

    // Load script
    const script = document.createElement('script');
    const googleCaptchaDomain =
      'https://www.google.com/recaptcha/api.js?hl=${locale}';
    if (
      config.type === 'recaptcha_v2_checkbox' ||
      config.type === 'recaptcha_v2_invisible'
    ) {
      script.src = `${googleCaptchaDomain}&render=explicit`;
    } else if (config.type === 'recaptcha_v3') {
      script.src = `${googleCaptchaDomain}&render=${config.site_key}`;
    }
    if (!script.src) return;

    document.body.appendChild(script);
    script.addEventListener('load', handleLoaded);

    return () => {
      script.removeEventListener('load', handleLoaded);
      document.body.removeChild(script);
    };
  }, []);

  const getTokenFromCaptcha = async (): Promise<string> => {
    if (config.type === 'recaptcha_v3') {
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
    } else if (
      config.type === 'recaptcha_v2_checkbox' ||
      config.type === 'recaptcha_v2_invisible'
    ) {
      return token;
    }

    return '';
  };

  return { getTokenFromCaptcha, isReady };
};

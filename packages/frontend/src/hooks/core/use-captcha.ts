import * as React from 'react';
import { useLocale } from 'next-intl';

export const useCaptcha = () => {
  const locale = useLocale();
  const [isReady, setIsReady] = React.useState(false);

  const config = {
    site_key: '',
    enterprise: false,
  };

  const handleLoaded = () => {
    setIsReady(true);
  };

  React.useEffect(() => {
    if (!config.site_key) {
      setIsReady(true);

      return;
    }

    // Add reCaptcha
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/${config.enterprise ? 'enterprise' : 'api'}.js?render=${config.site_key}&hl=${locale}`;
    document.body.appendChild(script);
    script.addEventListener('load', handleLoaded);

    return () => {
      script.removeEventListener('load', handleLoaded);
      document.body.removeChild(script);
    };
  }, []);

  const getTokenFromCaptcha = async (): Promise<string> => {
    if (!config.site_key) {
      return '';
    }

    // Captcha
    return new Promise<string>(resolve => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      window.grecaptcha.ready(async () => {
        try {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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

        // throw new reject('Captcha error');
      });
    });
  };

  return { getTokenFromCaptcha, isReady };
};

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

  const handleSubmitWithCaptcha = async (callback: (token: string) => void) => {
    if (!config.site_key) return callback('');

    // Captcha
    await new Promise<void>((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      window.grecaptcha
        .ready(() => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          window.grecaptcha
            .execute(config.site_key, { action: 'submit' })
            .then((token: string) => {
              callback(token);
              resolve();
            });
        })
        .catch(() => {
          throw new reject('Captcha error');
        });
    });
  };

  return { handleSubmitWithCaptcha, isReady };
};

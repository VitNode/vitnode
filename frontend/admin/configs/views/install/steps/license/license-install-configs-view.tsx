import { useTranslations } from 'next-intl';

import { CardContent, CardFooter } from '@/components/ui/card';
import { Link } from '@/i18n';
import { FormLicenseInstallConfigs } from './form-license-install-configs';

export const LicenseInstallConfigsView = () => {
  const t = useTranslations('admin.configs.install.steps');

  return (
    <>
      <CardContent>
        <Link
          href="https://github.com/aXenDeveloper/vitnode/blob/canary/LICENSE.md"
          target="_blank"
          className="underline text-primary"
        >
          {t('step_2.link')}
        </Link>
      </CardContent>

      <CardFooter>
        <FormLicenseInstallConfigs />
      </CardFooter>
    </>
  );
};

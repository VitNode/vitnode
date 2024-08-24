import { CardContent, CardFooter } from '@/components/ui/card';
import { Link } from '@/navigation';

import { FormLicenseInstallConfigs } from './form-license-install-configs';

export const LicenseInstallConfigsView = () => {
  return (
    <>
      <CardContent>
        <Link
          className="text-primary underline"
          href="https://github.com/VitNode/vitnode/blob/canary/LICENSE.md"
          target="_blank"
        >
          Click here to read the license agreement.
        </Link>
      </CardContent>

      <CardFooter>
        <FormLicenseInstallConfigs />
      </CardFooter>
    </>
  );
};

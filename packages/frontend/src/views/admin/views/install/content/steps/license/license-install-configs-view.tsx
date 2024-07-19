import { FormLicenseInstallConfigs } from './form-license-install-configs';
import { CardContent, CardFooter } from '@/components/ui/card';
import { Link } from '@/navigation';

export const LicenseInstallConfigsView = () => {
  return (
    <>
      <CardContent>
        <Link
          href="https://github.com/aXenDeveloper/vitnode/blob/canary/LICENSE.md"
          target="_blank"
          className="text-primary underline"
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

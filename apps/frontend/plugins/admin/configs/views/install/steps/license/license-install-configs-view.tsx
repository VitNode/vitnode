import { Link } from "vitnode-frontend/navigation";

import { CardContent, CardFooter } from "@/components/ui/card";
import { FormLicenseInstallConfigs } from "./form-license-install-configs";

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

import { Button, CardContent, CardFooter } from "vitnode-frontend/components";

import { useInstallVitnode } from "../hooks/use-install-vitnode";

export const InstallConfigsView = () => {
  const { setCurrentStep } = useInstallVitnode();

  return (
    <>
      <CardContent>
        Welcome to the installation wizard for VitNode. This wizard will guide
        you through the installation process.
      </CardContent>

      <CardFooter>
        <Button onClick={() => setCurrentStep(prev => prev + 1)}>
          Next step
        </Button>
      </CardFooter>
    </>
  );
};

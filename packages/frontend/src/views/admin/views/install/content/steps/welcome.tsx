import { useInstallVitnode } from '../hooks/use-install-vitnode';

import { Button } from '../../../../../../components/ui/button';
import { CardContent, CardFooter } from '../../../../../../components/ui/card';

export const WelcomeInstallConfigsView = () => {
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

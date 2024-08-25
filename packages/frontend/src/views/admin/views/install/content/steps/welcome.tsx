import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { CardContent, CardFooter } from '@/components/ui/card';
import { CONFIG } from '@/helpers/config-with-env';
import { ShieldAlert } from 'lucide-react';
import React from 'react';

import { useInstallVitnode } from '../hooks/use-install-vitnode';

export const WelcomeInstallConfigsView = () => {
  const { setCurrentStep } = useInstallVitnode();
  const [windowsLocation, setWindowsLocation] = React.useState('');

  React.useEffect(() => {
    const current = new URL(
      `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}`,
    );
    setWindowsLocation(current.origin);
  }, []);

  return (
    <>
      <CardContent>
        Welcome to the installation wizard for VitNode. This wizard will guide
        you through the installation process.
      </CardContent>

      {windowsLocation && (
        <CardFooter>
          {windowsLocation !== CONFIG.frontend_url ? (
            <Alert variant="error">
              <ShieldAlert />
              <AlertTitle>Invalid frontend URL detected!</AlertTitle>
              <AlertDescription>
                Env <span className="font-bold">NEXT_PUBLIC_FRONTEND_URL</span>{' '}
                is set to{' '}
                <span className="font-bold">{CONFIG.frontend_url}</span> but the
                current URL is{' '}
                <span className="font-bold">{windowsLocation}</span>.
              </AlertDescription>
              <AlertDescription>
                Please check your environment variables.
              </AlertDescription>
            </Alert>
          ) : (
            <Button
              onClick={() => {
                setCurrentStep(prev => prev + 1);
              }}
            >
              Next step
            </Button>
          )}
        </CardFooter>
      )}
    </>
  );
};

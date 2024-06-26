import { Home, KeyRound } from 'lucide-react';
import { Link } from 'vitnode-frontend/navigation';
import { buttonVariants } from 'vitnode-frontend/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from 'vitnode-frontend/components/ui/card';

export const FinishInstallConfigsView = () => {
  return (
    <Card className="text-center">
      <CardHeader>
        <CardTitle>Welcome to VitNode!</CardTitle>
        <CardDescription>Your website is ready.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          The installation process is complete. You can now use your website.
        </p>
      </CardContent>
      <CardFooter className="flex items-center justify-center gap-4">
        <Link href="/" className={buttonVariants()}>
          <Home /> Home Page
        </Link>
        <Link
          href="/admin"
          className={buttonVariants({
            variant: 'ghost',
          })}
        >
          <KeyRound /> Admin Control Panel
        </Link>
      </CardFooter>
    </Card>
  );
};

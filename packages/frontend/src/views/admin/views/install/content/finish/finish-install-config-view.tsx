import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Link } from '@/navigation';
import { Home, KeyRound } from 'lucide-react';

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
        <Link className={buttonVariants()} href="/">
          <Home /> Home Page
        </Link>
        <Link
          className={buttonVariants({
            variant: 'ghost',
          })}
          href="/admin"
        >
          <KeyRound /> Admin Control Panel
        </Link>
      </CardFooter>
    </Card>
  );
};

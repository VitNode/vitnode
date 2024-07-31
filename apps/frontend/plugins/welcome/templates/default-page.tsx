import { LogoVitNode } from 'vitnode-frontend/components/logo-vitnode';
import { buttonVariants } from 'vitnode-frontend/components/ui/button';
import { Link } from 'vitnode-frontend/navigation';
import { BookIcon, KeyRoundIcon } from 'lucide-react';

export default function DefaultPage() {
  return (
    <main className="container my-10 flex max-w-lg flex-col items-center justify-center gap-8 text-center sm:my-20">
      <LogoVitNode className="w-48" />

      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Welcome! Ready to build?</h1>

        <p className="text-muted-foreground">
          Dive in and install your first plugin! Or, if you&apos;re feeling
          adventurous, create your own masterpiece.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/admin"
          className={buttonVariants({
            size: 'sm',
          })}
        >
          <KeyRoundIcon /> Go to AdminCP
        </Link>

        <Link
          href="https://vitnode.com/"
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({
            variant: 'ghost',
            size: 'sm',
          })}
        >
          <BookIcon /> Read our Docs
        </Link>
      </div>
    </main>
  );
}

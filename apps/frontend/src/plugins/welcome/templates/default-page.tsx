import { LogoVitNode } from 'vitnode-frontend/components/logo-vitnode';
import { Button } from 'vitnode-frontend/components/ui/button';
import { Link } from 'vitnode-frontend/navigation';

export default function DefaultPage() {
  return (
    <main className="container my-10 flex max-w-5xl flex-wrap items-center justify-between gap-8 px-8 sm:px-16">
      <div className="max-w-md space-y-4">
        <h1 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
          Ready to build?
        </h1>

        <p className="text-muted-foreground text-pretty">
          Dive in. Create or install your first plugin!
        </p>

        <div className="flex flex-wrap items-center gap-2 md:gap-4">
          <Button asChild>
            <Link href="/admin" target="_blank">
              Go to AdminCP
            </Link>
          </Button>

          <Button asChild variant="ghost">
            <Link
              href="https://vitnode.com/docs"
              rel="noopener noreferrer"
              target="_blank"
            >
              Read our Docs
            </Link>
          </Button>
        </div>
      </div>

      <LogoVitNode className="w-60" />
    </main>
  );
}

import { BackgroundNet } from '@/components/background-net';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/utils/classnames';
import { FeaturesHome } from '@/views/home/features';
import Link from 'fumadocs-core/link';
import { Check } from 'lucide-react';

export default function Page() {
  return (
    <>
      <div className="container my-10 flex max-w-6xl flex-wrap items-center justify-between gap-8 px-8 sm:px-16 md:flex-nowrap">
        <div className="max-w-md space-y-4">
          <div className="bg-muted-foreground/10 mb-6 flex w-fit items-center gap-2 rounded-full px-4 py-2 font-medium">
            <Check className="size-5" />
            <span>Free & Open-source</span>
          </div>

          <h1 className="text-balance text-3xl font-bold tracking-tight md:text-5xl">
            Making <span className="text-primary">Community Apps</span> with{' '}
            <span className="text-primary">Power</span>
          </h1>

          <p className="text-muted-foreground text-pretty">
            SEO-friendly sites effortlessly, customize with ease, and enjoy
            security, speed, and efficiency.
          </p>

          <div className="flex flex-wrap items-center gap-2 md:gap-4">
            <Button className="rounded-full px-6" asChild>
              <Link href="/docs/dev">Get Started</Link>
            </Button>

            <Button className="rounded-full px-6" variant="ghost" asChild>
              <Link
                href="https://github.com/VitNode/vitnode"
                target="_blank"
                rel="noopener noreferrer"
              >
                Star on GitHub
              </Link>
            </Button>
          </div>
        </div>

        <div className="bg-card h-64 w-[20rem]">test</div>
      </div>

      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="relative -mt-16 flex w-full items-center justify-center overflow-hidden py-20 md:min-h-[50rem]">
        <BackgroundNet className="absolute" />
        <div className="bg-primary absolute size-60 rounded-full blur-[12rem]" />

        <div className="container z-10 my-10 flex max-w-xl flex-col items-center text-center lg:my-20 lg:max-w-4xl">
          <div className="bg-muted-foreground/10 mb-6 flex items-center gap-2 rounded-md px-4 py-2 font-medium">
            <Check className="size-5" />
            <span>Free & Open-source</span>
          </div>

          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl xl:text-7xl">
            Making <span className="text-primary">Community Apps</span> with{' '}
            <span className="text-primary">Power</span>
          </h1>

          <p className="text-muted-foreground mt-6 text-lg font-normal leading-7 sm:text-xl lg:max-w-2xl xl:text-2xl xl:leading-9">
            SEO-friendly sites effortlessly, customize with ease, and enjoy
            security, speed, and efficiency.
          </p>

          <div className="mt-10 flex flex-1 flex-wrap items-center justify-center gap-2 sm:gap-6">
            <Link
              href="/docs/dev"
              className={cn(
                buttonVariants({
                  className: 'font-medium sm:h-12 sm:px-8 sm:text-lg',
                  size: 'lg',
                }),
              )}
            >
              Get Started
            </Link>
            <Link
              href="https://github.com/VitNode/vitnode"
              className={cn(
                buttonVariants({
                  className:
                    'bg-transparent font-medium sm:h-12 sm:px-8 sm:text-lg',
                  size: 'lg',
                  variant: 'ghost',
                }),
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              Star on GitHub
            </Link>
          </div>
        </div>
      </div>

      <FeaturesHome />
    </>
  );
}

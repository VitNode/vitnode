import { Check } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/functions/classnames';
import { BackgroundHome } from './background';
import { buttonVariants } from '@/components/ui/button';

export const HeaderHome = () => {
  return (
    <div className="bg-card relative -mt-16 flex w-full items-center justify-center overflow-hidden py-20 md:min-h-[50rem]">
      <BackgroundHome className="absolute" />
      <div className="bg-primary absolute size-60 rounded-full blur-[12rem]" />

      <div className="container z-10 my-10 flex max-w-xl flex-col items-center text-center lg:my-20 lg:max-w-4xl">
        <div className="bg-muted-foreground/10 mb-6 flex items-center gap-2 rounded-md px-4 py-2 font-medium">
          <Check className="size-5" />
          <span>Free & Open-source</span>
        </div>

        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl xl:text-7xl">
          Build <span className="text-primary">Fast</span>, Start{' '}
          <span className="text-primary">Fast</span>
        </h1>

        <p className="text-muted-foreground mt-6 text-lg font-normal leading-7 sm:text-xl lg:max-w-2xl xl:text-2xl xl:leading-9">
          Effortlessly manage content NextJS-NestJS-based CMS. Deploy
          SEO-friendly sites, customize with ease, speed and efficiency.
        </p>

        <div className="mt-10 flex flex-1 flex-wrap gap-2 sm:gap-6">
          <Link
            href="/docs"
            className={cn(
              buttonVariants({
                className:
                  'bg-transparent font-medium sm:h-12 sm:px-8 sm:text-lg',
                size: 'lg',
              }),
            )}
          >
            Get Started
          </Link>
          <Link
            href="https://github.com/aXenDeveloper/vitnode"
            className={cn(
              buttonVariants({
                className:
                  'bg-transparent font-medium sm:h-12 sm:px-8 sm:text-lg',
                size: 'lg',
                variant: 'outline',
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
  );
};

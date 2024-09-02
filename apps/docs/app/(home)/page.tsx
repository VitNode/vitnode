import { BackgroundNet } from '@/components/background-net';
import { Button } from '@/components/ui/button';
import { FeaturesHome } from '@/views/home/features';
import Link from 'fumadocs-core/link';
import { Check } from 'lucide-react';
import { AnimatedBeamHome } from '../../components/animated-beam-home';

export default function Page() {
  return (
    <>
      <div className="relative overflow-hidden">
        <BackgroundNet className="pointer-events-none absolute opacity-50" />
        <div className="bg-primary pointer-events-none absolute size-60 rounded-full blur-[12rem]" />

        <div className="container relative flex max-w-6xl animate-[fade-in-down_1.25s] flex-wrap items-center justify-between gap-8 px-8 py-10 sm:px-16 sm:py-20 md:flex-nowrap">
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

            <div className="flex flex-wrap items-center gap-2 pt-4 md:gap-4">
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

          <AnimatedBeamHome />
        </div>
      </div>

      <FeaturesHome />
    </>
  );
}

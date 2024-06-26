import { Check } from "lucide-react";
import Link from "next/link";

import { cn } from "@/functions/classnames";
import { BackgroundHome } from "./background";
import { Button, buttonVariants } from "@/components/ui/button";

export const HeaderHome = () => {
  return (
    <div className="w-full md:min-h-[50rem] relative flex items-center justify-center py-20 overflow-hidden -mt-16 bg-card">
      <BackgroundHome className="absolute" />
      <div className="absolute bg-primary rounded-full size-60 blur-[12rem]" />

      <div className="container z-10 flex flex-col items-center lg:my-20 my-10 lg:max-w-4xl max-w-xl items-start text-center">
        <div className="flex items-center gap-2 mb-6 bg-muted-foreground/10 py-2 px-4 rounded-md font-medium">
          <Check className="size-5" />
          <span>Free & Open-source</span>
        </div>

        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl xl:text-7xl">
          Build <span className="text-primary">Fast</span>, Ship{" "}
          <span className="text-primary">Fast</span>
        </h1>

        <p className="mt-6 text-lg font-normal leading-7 sm:text-xl lg:max-w-2xl xl:text-2xl xl:leading-9 text-muted-foreground">
          Effortlessly manage content NextJS-NestJS-based CMS. Deploy
          SEO-friendly sites, customize with ease, speed and efficiency.
        </p>

        <div className="flex mt-10 flex-wrap flex-1 sm:gap-6 gap-2">
          <Link
            href="/docs"
            className={cn(
              buttonVariants({
                className:
                  "sm:px-8 sm:h-12 sm:text-lg font-medium bg-transparent",
                size: "lg"
              })
            )}
          >
            Get Started
          </Link>
          <Link
            href="https://github.com/aXenDeveloper/vitnode"
            className={cn(
              buttonVariants({
                className:
                  "sm:px-8 sm:h-12 sm:text-lg font-medium bg-transparent",
                size: "lg",
                variant: "outline"
              })
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

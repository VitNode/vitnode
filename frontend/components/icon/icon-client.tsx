"use client";

import * as Lucide from "lucide-react";
import * as React from "react";

import { cn } from "@/functions/classnames";

export type IconLucideNames = keyof typeof Lucide.icons;

export const IconClient = React.memo(
  ({
    name,
    className
  }: {
    name: IconLucideNames | string;
    className?: string;
  }) => {
    if (/\p{Extended_Pictographic}/gu.test(name)) {
      return <span className={className}>{name}</span>;
    }

    const LucideIcon = React.lazy<React.ComponentType<Lucide.LucideProps>>(
      async () =>
        import("lucide-react")
          .then(mod => mod[name as IconLucideNames])
          .then(mod => ({ default: mod }))
    );

    return (
      <React.Suspense
        fallback={<Lucide.Loader2 className={cn("animate-spin", className)} />}
        key={name}
      >
        <LucideIcon className={className} />
      </React.Suspense>
    );
  }
);

IconClient.displayName = "IconLucide";

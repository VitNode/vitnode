import * as Lucide from "lucide-react";
import * as React from "react";
import { Loader2 } from "lucide-react";

import { cn } from "@/functions/classnames";

export type IconLucideNames = keyof typeof Lucide.icons;

interface Props extends Omit<Lucide.LucideIcon, "$$typeof"> {
  name: IconLucideNames | string;
  className?: string;
}

export const Icon = React.memo(({ className, name, ...props }: Props) => {
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
      fallback={<Loader2 className={cn("animate-spin", className)} />}
    >
      <LucideIcon className={className} {...props} />
    </React.Suspense>
  );
});

Icon.displayName = "Icon";

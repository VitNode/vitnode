import * as Lucide from "lucide-react";
import { lazy, memo, ComponentType, Suspense } from "react";
import { Loader2 } from "lucide-react";

import { cn } from "@/functions/classnames";

export type IconLucideNames = keyof typeof Lucide.icons;

interface Props extends Omit<Lucide.LucideIcon, "$$typeof"> {
  name: IconLucideNames | string;
  className?: string;
}

export const Icon = memo(({ className, name, ...props }: Props) => {
  if (/\p{Extended_Pictographic}/gu.test(name)) {
    return <span className={className}>{name}</span>;
  }

  const LucideIcon = lazy<ComponentType<Lucide.LucideProps>>(async () =>
    import("lucide-react")
      .then(mod => mod[name as IconLucideNames])
      .then(mod => ({ default: mod }))
  );

  return (
    <Suspense fallback={<Loader2 className={cn("animate-spin", className)} />}>
      <LucideIcon className={className} {...props} />
    </Suspense>
  );
});

Icon.displayName = "Icon";

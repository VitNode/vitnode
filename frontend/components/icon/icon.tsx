import * as Lucide from "lucide-react";
import { lazy, memo, type ComponentType, Suspense } from "react";
import { Loader2 } from "lucide-react";

import { cn } from "@/functions/classnames";

export type IconLucideNames = keyof typeof Lucide.icons;

interface Props extends Lucide.LucideProps {
  name: IconLucideNames | string;
}

export const Icon = memo(({ className, name, ...props }: Props) => {
  if (/\p{Extended_Pictographic}/gu.test(name)) {
    return <span className={className}>{name}</span>;
  }

  const LucideIcon = lazy<ComponentType<Lucide.LucideProps>>(() =>
    import("lucide-react")
      .then(mod => mod[name as IconLucideNames])
      .then(mod => ({ default: mod }))
  );

  // const LucideIcon = dynamic(
  //   () => import(`lucide-react`).then(mod => mod[name]),
  //   {
  //     loading: () => {
  //       return <Loader2 className={cn("animate-spin", className)} />;
  //     }
  //   }
  // );

  return (
    <Suspense fallback={<Loader2 className={cn("animate-spin", className)} />}>
      <LucideIcon className={className} {...props} />
    </Suspense>
  );
});

Icon.displayName = "Icon";

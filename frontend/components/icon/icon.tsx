import * as Lucide from "lucide-react";
import { lazy, memo, type ComponentType, Suspense } from "react";
import { Loader2 } from "lucide-react";

import { cn } from "@/functions/classnames";

export type IconLucideNames = keyof typeof Lucide.icons;

interface Props extends Omit<Lucide.LucideIcon, "$$typeof"> {
  name: IconLucideNames | string;
  className?: string;
}

export const Icon = memo(
  ({ className, name, ...props }: Props): JSX.Element => {
    if (/\p{Extended_Pictographic}/gu.test(name)) {
      return <span className={className}>{name}</span>;
    }

    const LucideIcon = lazy<ComponentType<Lucide.LucideProps>>(
      (): Promise<
        | {
            default: ComponentType<Lucide.LucideProps>;
          }
        | {
            default: Lucide.LucideIcon;
          }
      > =>
        import("lucide-react")
          .then((mod): Lucide.LucideIcon => mod[name as IconLucideNames])
          .then(
            (
              mod
            ): {
              default: Lucide.LucideIcon;
            } => ({ default: mod })
          )
    );

    return (
      <Suspense
        fallback={<Loader2 className={cn("animate-spin", className)} />}
      >
        <LucideIcon className={className} {...props} />
      </Suspense>
    );
  }
);

Icon.displayName = "Icon";

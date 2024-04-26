import { forwardRef, type ReactNode, type Ref } from "react";

import { Link } from "@/utils/i18n/link";
import { cn } from "@/functions/classnames";

interface Props {
  children: ReactNode;
  active?: boolean;
  href?: string;
  onClick?: () => void;
}

export const ItemQuickMenu = forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  Props
>(({ active, children, href, onClick }: Props, ref) => {
  const className = cn(
    "flex-1 text-center flex items-center justify-center flex-col gap-1.5 pt-1.5 pb-2 px-1 text-foreground no-underline text-xs [&>svg]:size-6 [&>span]:text-muted-foreground leading-none",
    {
      "text-primary": active
    }
  );

  if (href) {
    return (
      <Link
        href={href}
        className={className}
        onClick={onClick}
        ref={ref as Ref<HTMLAnchorElement>}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={className}
      onClick={onClick}
      ref={ref as Ref<HTMLButtonElement>}
    >
      {children}
    </button>
  );
});

ItemQuickMenu.displayName = "ItemQuickMenu";

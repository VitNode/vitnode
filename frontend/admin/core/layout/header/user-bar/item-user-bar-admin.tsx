import { ReactNode } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import { Link } from "@/utils/i18n";
import { cn } from "@/functions/classnames";

interface Props {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  target?: string;
}

export const ItemUserBarAdmin = ({
  children,
  href,
  onClick,
  target
}: Props) => {
  const content = () => {
    const className =
      "w-full justify-start [&>svg]:text-muted-foreground font-normal";

    if (href) {
      return (
        <Link
          href={href}
          className={cn(
            buttonVariants({
              variant: "ghost",
              size: "sm",
              className
            })
          )}
          target={target}
          onClick={onClick}
        >
          {children}
        </Link>
      );
    }

    return (
      <Button variant="ghost" size="sm" className={className} onClick={onClick}>
        {children}
      </Button>
    );
  };

  return <SheetClose asChild>{content()}</SheetClose>;
};

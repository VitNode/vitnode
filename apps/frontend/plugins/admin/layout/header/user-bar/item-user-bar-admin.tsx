import * as React from "react";
import { Link } from "vitnode-frontend/navigation";
import { cn } from "vitnode-frontend/helpers";
import { buttonVariants, Button } from "vitnode-frontend/components/ui/button";
import { SheetClose } from "vitnode-frontend/components/ui/sheet";

interface Props {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  target?: string;
}

export const ItemUserBarAdmin = ({
  children,
  href,
  onClick,
  target,
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
              className,
            }),
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

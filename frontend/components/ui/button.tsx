import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { useTranslations } from "next-intl";

import { cn } from "@/functions/classnames";
import { Loader } from "../loader";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 text-center rounded-md text-sm font-medium ring-offset-background transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&>svg]:size-4 [&>svg]:flex-shrink-0 no-underline",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent text-accent-foreground text-foreground",
        destructiveGhost: "text-destructive hover:bg-accent",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "size-10 [&>svg]:size-5"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    Omit<VariantProps<typeof buttonVariants>, "size"> {
  ariaLabel?: string;
  asChild?: boolean;
  loading?: boolean;
  size?: "default" | "sm" | "lg";
}

interface IconButtonProps extends Omit<ButtonProps, "size"> {
  ariaLabel: string;
  size: "icon";
}

const Button = forwardRef<HTMLButtonElement, IconButtonProps | ButtonProps>(
  (
    {
      ariaLabel,
      asChild = false,
      className,
      loading,
      size,
      type = "button",
      variant,
      ...props
    },
    ref
  ) => {
    const t = useTranslations("core");
    const Comp = asChild ? Slot : "button";

    if (loading) {
      return (
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
          type="button"
          aria-label={t("loading")}
          disabled
        >
          <Loader small />
          {size !== "icon" && t("loading")}
        </Comp>
      );
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        type={type}
        ref={ref}
        aria-label={ariaLabel}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

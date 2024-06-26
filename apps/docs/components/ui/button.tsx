import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";

import { cn } from "@/functions/classnames";
import { Loader } from "../loader";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium no-underline ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&>span]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "first-of-type:bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background text-accent-foreground hover:bg-accent",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "text-accent-foreground text-foreground hover:bg-accent",
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

export const Button = forwardRef<
  HTMLButtonElement,
  IconButtonProps | ButtonProps
>(
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
    const Comp = asChild ? Slot : "button";

    if (loading) {
      return (
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
          type="button"
          aria-label="Loading"
          disabled
        >
          <Loader small />
          {size !== "icon" && "Loading"}
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

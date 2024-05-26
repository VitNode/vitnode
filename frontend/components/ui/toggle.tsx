"use client";

import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, VariantProps } from "class-variance-authority";
import { ComponentPropsWithoutRef } from "react";

import { cn } from "@/functions/classnames";

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground"
      },
      size: {
        default: "size-9",
        sm: "size-8",
        lg: "size-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

const Toggle = ({
  className,
  size,
  variant,
  ...props
}: ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) => (
  <TogglePrimitive.Root
    className={cn(
      toggleVariants({
        variant,
        size,
        className: cn("[&>svg]:size-5", className)
      })
    )}
    {...props}
  />
);

export { Toggle, toggleVariants };

"use client";

import * as SeparatorPrimitive from "@radix-ui/react-separator";
import {
  forwardRef,
  type ElementRef,
  type ComponentPropsWithoutRef
} from "react";

import { cn } from "@/functions/classnames";

const Separator = forwardRef<
  ElementRef<typeof SeparatorPrimitive.Root>,
  ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, decorative = true, orientation = "horizontal", ...props },
    ref
  ): JSX.Element => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };

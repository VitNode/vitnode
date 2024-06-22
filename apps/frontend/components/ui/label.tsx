"use client";

import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@vitnode/frontend/helpers";

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
);

export const Label = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
  VariantProps<typeof labelVariants>) => (
  <LabelPrimitive.Root className={cn(labelVariants(), className)} {...props} />
);

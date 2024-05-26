"use client";

import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, VariantProps } from "class-variance-authority";
import { ComponentPropsWithoutRef } from "react";

import { cn } from "@/functions/classnames";

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

export const Label = ({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
  VariantProps<typeof labelVariants>) => (
  <LabelPrimitive.Root className={cn(labelVariants(), className)} {...props} />
);

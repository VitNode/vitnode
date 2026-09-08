import { cn } from "cn";
import React from "react";

import { loadLucideIcons } from "./icon-registry";

export interface DynamicIconProps {
  absoluteStrokeWidth?: boolean;
  className?: string;
  name: string;
  size?: number | string;
  strokeWidth?: number | string;
}

const ResolvedIcon = ({ name, ...props }: DynamicIconProps) => {
  const Icon = React.use(loadLucideIcons()).get(name);

  return Icon ? React.createElement(Icon, props) : null;
};

export const DynamicIcon = ({
  className,
  fallback,
  ...props
}: DynamicIconProps & { fallback?: React.ReactNode }) => (
  <React.Suspense
    fallback={
      fallback ?? (
        <span aria-hidden className={cn("inline-block size-4", className)} />
      )
    }
  >
    <ResolvedIcon className={className} {...props} />
  </React.Suspense>
);

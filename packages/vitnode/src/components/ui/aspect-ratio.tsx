import { cn } from "cn";
import React from "react";

function AspectRatio({
  ratio = 1,
  className,
  style,
  ...props
}: React.ComponentProps<"div"> & { ratio?: number }) {
  return (
    <div
      className={cn("relative aspect-(--ratio)", className)}
      data-slot="aspect-ratio"
      style={{ ...style, "--ratio": ratio } as React.CSSProperties}
      {...props}
    />
  );
}

export { AspectRatio };

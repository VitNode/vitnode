import { cn } from "cn";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("bg-muted animate-pulse rounded-md", className)}
      data-slot="skeleton"
      {...props}
    />
  );
}

export { Skeleton };

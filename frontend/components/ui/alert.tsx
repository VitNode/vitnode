/* eslint-disable jsx-a11y/heading-has-content */
import { cva, VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";

import { cn } from "@/functions/classnames";

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg]:size-5 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive: "border-destructive/50 bg-destructive/10"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

const Alert = ({
  className,
  variant,
  ...props
}: HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>) => (
  <div
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
);

const AlertTitle = ({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) => (
  <h5
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
);

const AlertDescription = ({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) => (
  <div className={cn("text-sm [&_p]:leading-relaxed", className)} {...props} />
);

export { Alert, AlertTitle, AlertDescription };

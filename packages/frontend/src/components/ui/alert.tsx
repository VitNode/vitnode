import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';

import { cn } from '../../helpers/classnames';

const alertVariants = cva(
  'relative w-full rounded-lg border p-4 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7',
  {
    variants: {
      variant: {
        default: 'bg-secondary/50 text-foreground',
        error:
          'border-destructive/30 bg-destructive/10 text-destructive [&>svg]:text-destructive',
        warn: 'dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-500 dark:[&>svg]:text-amber-500 border-amber-700/30 bg-amber-700/10 text-amber-700 [&>svg]:text-amber-700',
        primary:
          'border-primary/30 bg-primary/10 text-primary [&>svg]:text-primary',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

const Alert = ({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof alertVariants>) => (
  <div
    className={cn(alertVariants({ variant }), className)}
    role="alert"
    {...props}
  />
);

const AlertTitle = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  // eslint-disable-next-line jsx-a11y/heading-has-content
  <h5
    className={cn('mb-1 font-medium leading-none tracking-tight', className)}
    {...props}
  />
);

const AlertDescription = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <div className={cn('text-sm [&_p]:leading-relaxed', className)} {...props} />
);

export { Alert, AlertDescription, AlertTitle };

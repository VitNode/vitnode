'use client';

import {
  Children,
  useEffect,
  type ComponentPropsWithoutRef,
  type ReactNode,
  useState
} from 'react';
import * as ToolbarPrimitive from '@radix-ui/react-toolbar';
import { cn, withCn, withRef, withVariants } from '@udecode/cn';
import { ArrowDown } from 'lucide-react';
import { TooltipPortal } from '@radix-ui/react-tooltip';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { toggleVariants, type Toggle } from '../ui/toggle';
import { Separator } from '../ui/separator';

export const Toolbar = withCn(
  ToolbarPrimitive.Root,
  'relative flex select-none items-stretch gap-1 bg-background'
);

export const ToolbarToggleGroup = withCn(ToolbarPrimitive.ToolbarToggleGroup, 'flex items-center');

export const ToolbarLink = withCn(
  ToolbarPrimitive.Link,
  'font-medium underline underline-offset-4'
);

export const ToolbarSeparator = () => {
  return <Separator className="h-7" orientation="vertical" />;
};

export const ToolbarButton = withRef<
  typeof ToolbarPrimitive.Button,
  Omit<ComponentPropsWithoutRef<typeof Toggle>, 'type'> & {
    buttonType?: 'button' | 'toggle';
    isDropdown?: boolean;
    pressed?: boolean;
    tooltip?: ReactNode;
  }
>(
  (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    { children, className, isDropdown, pressed, size = 'sm', tooltip, value, variant, ...props },
    ref
  ) => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
      setIsLoaded(true);
    }, []);

    const content =
      typeof pressed === 'boolean' ? (
        <ToolbarToggleGroup type="single" value="single">
          <ToolbarToggleItem
            ref={ref}
            className={cn(
              toggleVariants({
                variant,
                size,
                className: 'size-9 [&_svg]:size-5'
              }),
              isDropdown && 'my-1 justify-between pr-1',
              className
            )}
            value={pressed ? 'single' : ''}
            {...props}
          >
            <div className="flex flex-1">{children}</div>
            <div>{isDropdown && <ArrowDown className="ml-0.5 h-4 w-4" data-icon />}</div>
          </ToolbarToggleItem>
        </ToolbarToggleGroup>
      ) : (
        <ToolbarPrimitive.Button
          ref={ref}
          className={cn(
            toggleVariants({
              variant,
              size,
              className: 'size-9 [&_svg]:size-5'
            }),
            isDropdown && 'pr-1',
            className
          )}
          {...props}
        >
          {children}
        </ToolbarPrimitive.Button>
      );

    return isLoaded && tooltip ? (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{content}</TooltipTrigger>

          <TooltipPortal>
            <TooltipContent>{tooltip}</TooltipContent>
          </TooltipPortal>
        </Tooltip>
      </TooltipProvider>
    ) : (
      <>{content}</>
    );
  }
);

export const ToolbarToggleItem = withVariants(ToolbarPrimitive.ToggleItem, toggleVariants, [
  'variant',
  'size'
]);

export const ToolbarGroup = withRef<
  'div',
  {
    noSeparator?: boolean;
  }
>(({ children, className, noSeparator }, ref) => {
  const childArr = Children.map(children, c => c);
  if (!childArr || childArr.length === 0) return null;

  return (
    <div ref={ref} className={cn('flex', className)}>
      {!noSeparator && (
        <div className="h-full py-1">
          <Separator orientation="vertical" />
        </div>
      )}

      <div className="mx-1 flex items-center gap-1">{children}</div>
    </div>
  );
});

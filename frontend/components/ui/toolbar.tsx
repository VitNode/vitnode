import * as Toolbar from '@radix-ui/react-toolbar';
import { forwardRef, type ElementRef, type ComponentPropsWithoutRef } from 'react';

import { cx } from '@/functions/classnames';
import { buttonVariants, type ButtonProps } from './button';
import { toggleVariants } from './toggle';

export const ToolbarRoot = Toolbar.Root;

export interface ToolbarButtonProps
  extends ComponentPropsWithoutRef<typeof Toolbar.Button>,
    Pick<ButtonProps, 'size'> {
  pressed?: boolean;
}

export const ToolbarButton = forwardRef<ElementRef<typeof Toolbar.Button>, ToolbarButtonProps>(
  ({ className, pressed, size, ...props }, ref) => {
    const buttonClass = buttonVariants({
      variant: 'ghost',
      size,
      className: cx(className, {
        'h-9 w-9 [&>svg]:w-5 [&>svg]:h-5': size === 'icon'
      })
    });

    const toggleClass = toggleVariants({
      className: cx(className, 'h-9 w-9 [&>svg]:w-5 [&>svg]:h-5')
    });

    return (
      <Toolbar.Button
        ref={ref}
        className={pressed !== undefined ? toggleClass : buttonClass}
        data-state={pressed !== undefined ? (pressed ? 'on' : 'off') : undefined}
        {...props}
      />
    );
  }
);

ToolbarButton.displayName = Toolbar.Button.displayName;

// export const ToggleGroup = forwardRef<
//   ElementRef<typeof Toolbar.ToggleGroup>,
//   ComponentPropsWithoutRef<typeof Toolbar.ToggleGroup>
// >((props, ref) => {
//   return <Toolbar.ToggleGroup ref={ref} {...props} />;
// });

// ToggleGroup.displayName = Toolbar.ToggleGroup.displayName;

export const ToggleGroup = Toolbar.ToggleGroup;

interface ToggleItemProps extends ComponentPropsWithoutRef<typeof Toolbar.ToggleItem> {}

export const ToggleItem = forwardRef<ElementRef<typeof Toolbar.ToggleItem>, ToggleItemProps>(
  ({ className, ...props }, ref) => {
    return (
      <Toolbar.ToggleItem
        ref={ref}
        className={toggleVariants({
          className
        })}
        {...props}
      />
    );
  }
);

ToggleItem.displayName = Toolbar.ToggleItem.displayName;

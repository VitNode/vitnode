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
    const buttonClass = cx(
      buttonVariants({
        variant: 'ghost',
        size,
        className: cx(className, {
          'size-9 [&>svg]:size-5': size === 'icon'
        })
      })
    );

    const toggleClass = cx(
      toggleVariants({
        className: cx(className, 'size-9 [&>svg]:size-5')
      })
    );

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

export const ToggleGroup = forwardRef<
  ElementRef<typeof Toolbar.ToggleGroup>,
  ComponentPropsWithoutRef<typeof Toolbar.ToggleGroup>
>(({ className, ...props }, ref) => {
  return (
    <Toolbar.ToggleGroup
      ref={ref}
      className={cx('flex items-center gap-1 flex-wrap', className)}
      {...props}
    />
  );
});

ToggleGroup.displayName = Toolbar.ToggleGroup.displayName;

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

export const ToolbarSeparator = forwardRef<
  ElementRef<typeof Toolbar.Separator>,
  ComponentPropsWithoutRef<typeof Toolbar.Separator>
>(({ className, ...props }, ref) => (
  <Toolbar.Separator
    ref={ref}
    className={cx('w-[1px] h-8 shrink-0 bg-border', className)}
    {...props}
  />
));
ToolbarSeparator.displayName = Toolbar.Separator.displayName;

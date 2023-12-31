import { withRef, withVariants } from '@udecode/cn';
import { PlateElement } from '@udecode/plate-common';
import { cva } from 'class-variance-authority';

const listVariants = cva('m-0 ps-6 ol:list-decimal ul:list-disc', {
  variants: {
    variant: {
      ul: 'list-disc [&_ul]:list-[circle] [&_ul_ul]:list-[square]',
      ol: 'list-decimal'
    }
  }
});

const ListElementVariants = withVariants(PlateElement, listVariants, ['variant']);

export const ListElement = withRef<typeof ListElementVariants>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ children, className, variant = 'ul', ...props }, ref) => {
    const Component = variant!;

    return (
      <ListElementVariants
        className={listVariants({
          variant
        })}
        ref={ref}
        asChild
        {...props}
      >
        <Component>{children}</Component>
      </ListElementVariants>
    );
  }
);

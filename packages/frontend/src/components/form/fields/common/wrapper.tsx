import { FormItem } from '@/components/ui/form';
import { cn } from '@/helpers/classnames';

export const AutoFormWrapper = ({
  children,
  className,
  theme,
}: {
  children: React.ReactNode;
  className?: string;
  theme: 'horizontal' | 'vertical';
}) => {
  return (
    <FormItem
      className={cn(className, {
        '@xs:flex-row @xs:gap-6 flex w-full flex-col space-y-2':
          theme === 'horizontal',
      })}
    >
      {children}
    </FormItem>
  );
};

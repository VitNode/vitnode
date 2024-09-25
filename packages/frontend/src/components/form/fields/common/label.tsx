import { FormLabel } from '@/components/ui/form';
import { cn } from '@/helpers/classnames';

export const AutoFormLabel = ({
  label,
  isRequired,
  className,
  theme,
  description,
}: {
  className?: string;
  description: React.ReactNode | undefined;
  isRequired: boolean;
  label: string;
  theme: 'horizontal' | 'vertical';
}) => {
  return (
    <FormLabel
      className={cn(className, {
        '@xs:mt-3 @xs:w-32 @xs:shrink-0 @xs:text-right @sm:w-40 @xl:w-72 @3xl:w-96 @4xl:w-[26rem] flex w-full flex-col items-end gap-1':
          theme === 'horizontal',
      })}
      optional={!isRequired}
    >
      {description && theme === 'horizontal' ? (
        <>
          <span>{label}</span>
          <span
            className={cn(
              'text-muted-foreground mt-1 block max-w-sm text-sm font-normal',
            )}
          >
            {description}
          </span>
        </>
      ) : (
        label
      )}
    </FormLabel>
  );
};

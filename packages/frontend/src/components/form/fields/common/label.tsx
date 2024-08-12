import { FormLabel } from '@/components/ui/form';
import { cn } from '@/helpers/classnames';
import { AutoFormInputComponentProps } from '../../type';

export const AutoFormLabel = ({
  label,
  isRequired,
  className,
  theme,
  description,
}: {
  description: React.ReactNode | undefined;
  isRequired: boolean;
  label: string;
  theme: AutoFormInputComponentProps['autoFormProps']['theme'];
  className?: string;
}) => {
  return (
    <FormLabel
      className={cn(className, {
        '@xs:mt-3 @xs:w-32 @xs:shrink-0 @xs:text-right @sm:w-40 @xl:w-72 @3xl:w-96 @4xl:w-[26rem] flex w-full flex-col gap-1':
          theme === 'horizontal',
      })}
      optional={!isRequired}
    >
      {description && theme === 'horizontal' ? (
        <>
          <span>{label}</span>
          <span className="text-muted-foreground mt-1 block text-sm font-normal">
            {description}
          </span>
        </>
      ) : (
        label
      )}
    </FormLabel>
  );
};

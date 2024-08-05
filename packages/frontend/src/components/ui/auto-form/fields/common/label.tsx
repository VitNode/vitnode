import { FormLabel } from '@/components/ui/form';

export const AutoFormLabel = ({
  label,
  isRequired,
  className,
}: {
  isRequired: boolean;
  label: string;
  className?: string;
}) => {
  return (
    <FormLabel className={className} optional={!isRequired}>
      {label}
    </FormLabel>
  );
};

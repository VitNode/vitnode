'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormMessage } from '@/components/ui/form';
import { cn } from '@/helpers/classnames';
import { FieldValues } from 'react-hook-form';

import { AutoFormItemProps } from '../auto-form';
import { AutoFormInputWrapper } from './common/input-wrapper';
import { AutoFormLabel } from './common/label';
import { AutoFormTooltip } from './common/tooltip';
import { AutoFormWrapper } from './common/wrapper';

export type AutoFormCheckboxProps = Omit<
  React.ComponentProps<typeof Checkbox>,
  'onChange' | 'value'
>;

export function AutoFormCheckbox<T extends FieldValues>({
  field,
  label,
  description,
  isRequired,
  theme,
  isDisabled,
  componentProps,
  className,
  childComponent: ChildComponent,
}: {
  componentProps?: AutoFormCheckboxProps;
} & AutoFormItemProps<T>) {
  const value: boolean = field.value || false;

  return (
    <AutoFormWrapper
      className={cn(
        'flex items-start space-x-3 space-y-0',
        {
          'rounded-md border p-4': label && description,
        },
        className,
      )}
      theme={theme}
    >
      <AutoFormInputWrapper withChildren={!!ChildComponent}>
        <FormControl>
          <Checkbox
            checked={value}
            disabled={isDisabled || componentProps?.disabled}
            onCheckedChange={field.onChange}
            {...componentProps}
          />
        </FormControl>
        {ChildComponent && <ChildComponent field={field} />}
      </AutoFormInputWrapper>

      {(label ?? description) && (
        <div className="space-y-1 leading-none">
          {label && (
            <AutoFormLabel
              description={description}
              isRequired={isRequired}
              label={label}
              theme={theme}
            />
          )}
          {description && theme === 'vertical' && (
            <AutoFormTooltip description={description} />
          )}
        </div>
      )}
      <FormMessage />
    </AutoFormWrapper>
  );
}

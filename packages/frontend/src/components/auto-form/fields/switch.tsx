'use client';

import { FormControl, FormMessage } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/helpers/classnames';
import { FieldValues } from 'react-hook-form';

import { AutoFormItemProps } from '../auto-form';
import { AutoFormLabel } from './common/label';
import { AutoFormTooltip } from './common/tooltip';
import { AutoFormWrapper } from './common/wrapper';

export type AutoFormSwitchProps = Omit<
  React.ComponentProps<typeof Switch>,
  'checked'
>;

export function AutoFormSwitch<T extends FieldValues>({
  field,
  label,
  description,
  isRequired,
  theme,
  isDisabled,
  componentProps,
}: {
  componentProps?: AutoFormSwitchProps;
} & AutoFormItemProps<T>) {
  const value: boolean = field.value || false;

  return (
    <AutoFormWrapper
      className={cn({
        'flex flex-row items-center justify-between gap-4 rounded-lg border p-4':
          theme === 'vertical',
      })}
      theme={theme}
    >
      <div>
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
        <FormMessage />
      </div>

      <FormControl>
        <Switch
          checked={value}
          onCheckedChange={e => {
            field.onChange(e);
            componentProps?.onCheckedChange?.(e);
          }}
          {...componentProps}
          disabled={isDisabled || componentProps?.disabled}
        />
      </FormControl>
    </AutoFormWrapper>
  );
}

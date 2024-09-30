'use client';

import { FormControl, FormMessage } from '@/components/ui/form';
import { StringLanguageInput } from '@/components/ui/text-language-input';
import { StringLanguage } from '@/graphql/types';
import { FieldValues } from 'react-hook-form';

import { AutoFormItemProps } from '../auto-form';
import { AutoFormInputWrapper } from './common/input-wrapper';
import { AutoFormLabel } from './common/label';
import { AutoFormTooltip } from './common/tooltip';
import { AutoFormWrapper } from './common/wrapper';

export type AutoFormStringLanguageInputProps = Omit<
  React.ComponentProps<typeof StringLanguageInput>,
  'onChange' | 'value'
>;

export function AutoFormStringLanguageInput<T extends FieldValues>({
  field,
  zodInputProps,
  label,
  description,
  isRequired,
  theme,
  isDisabled,
  componentProps,
  className,
  childComponent: ChildComponent,
  hideOptionalLabel,
}: {
  componentProps?: AutoFormStringLanguageInputProps;
} & AutoFormItemProps<T>) {
  return (
    <AutoFormWrapper theme={theme}>
      {label && (
        <AutoFormLabel
          description={description}
          hideOptionalLabel={hideOptionalLabel}
          isRequired={isRequired}
          label={label}
          theme={theme}
        />
      )}

      <AutoFormInputWrapper
        className={className}
        withChildren={!!ChildComponent}
      >
        <FormControl>
          <StringLanguageInput
            {...field}
            {...zodInputProps}
            {...componentProps}
            disabled={isDisabled || componentProps?.disabled}
            onChange={field.onChange as (value: StringLanguage[]) => void}
            value={field.value as StringLanguage[]}
          />
        </FormControl>
        {ChildComponent && <ChildComponent field={field} />}
      </AutoFormInputWrapper>

      {description && theme === 'vertical' && (
        <AutoFormTooltip description={description} />
      )}
      <FormMessage />
    </AutoFormWrapper>
  );
}

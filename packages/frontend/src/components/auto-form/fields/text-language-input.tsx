'use client';

import { FormControl, FormMessage } from '@/components/ui/form';
import { TextLanguageInput } from '@/components/ui/text-language-input';
import { TextLanguage } from '@/graphql/types';
import { FieldValues } from 'react-hook-form';

import { AutoFormItemProps } from '../auto-form';
import { AutoFormInputWrapper } from './common/input-wrapper';
import { AutoFormLabel } from './common/label';
import { AutoFormTooltip } from './common/tooltip';
import { AutoFormWrapper } from './common/wrapper';

export type AutoFormTextLanguageInputProps = Omit<
  React.ComponentProps<typeof TextLanguageInput>,
  'onChange' | 'value'
>;

export function AutoFormTextLanguageInput<T extends FieldValues>({
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
}: {
  componentProps?: AutoFormTextLanguageInputProps;
} & AutoFormItemProps<T>) {
  return (
    <AutoFormWrapper theme={theme}>
      {label && (
        <AutoFormLabel
          description={description}
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
          <TextLanguageInput
            {...field}
            {...zodInputProps}
            {...componentProps}
            disabled={isDisabled || componentProps?.disabled}
            onChange={field.onChange as (value: TextLanguage[]) => void}
            value={field.value as TextLanguage[]}
          />
        </FormControl>
        <ChildComponent field={field} />
      </AutoFormInputWrapper>

      {description && theme === 'vertical' && (
        <AutoFormTooltip description={description} />
      )}
      <FormMessage />
    </AutoFormWrapper>
  );
}

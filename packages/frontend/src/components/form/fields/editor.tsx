import { Editor } from '@/components/editor/editor';
import { AutoFormComponentProps } from '@/components/form/auto-form';
import { FormControl, FormMessage } from '@/components/ui/form';

import { AutoFormInputWrapper } from './common/input-wrapper';
import { AutoFormLabel } from './common/label';
import { AutoFormTooltip } from './common/tooltip';
import { AutoFormWrapper } from './common/wrapper';

export function AutoFormEditor({
  field,
  label,
  theme,
  description,
  isRequired,
  isDisabled,
  hideOptionalLabel,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  zodInputProps: _ZodInputProps,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  overrideOptions: _,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  shape: _shape,
  wrapper,
  ...props
}: AutoFormComponentProps &
  Omit<React.ComponentProps<typeof Editor>, 'name' | 'value'>) {
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

      <AutoFormInputWrapper Wrapper={wrapper}>
        <FormControl>
          <Editor
            {...field}
            {...props}
            disabled={isDisabled || props?.disabled}
            onChange={e => {
              field.onChange(e);
              props.onChange?.(e);
            }}
            value={field.value ?? []}
          />
        </FormControl>
      </AutoFormInputWrapper>

      {description && theme === 'vertical' && (
        <AutoFormTooltip description={description} />
      )}
      <FormMessage />
    </AutoFormWrapper>
  );
}

// 'use client';

// import { Editor } from '@/components/editor/editor';
// import { FormControl, FormMessage } from '@/components/ui/form';
// import { FieldValues } from 'react-hook-form';

// import { AutoFormItemProps } from '../auto-form';
// import { AutoFormInputWrapper } from './common/input-wrapper';
// import { AutoFormLabel } from './common/label';
// import { AutoFormTooltip } from './common/tooltip';
// import { AutoFormWrapper } from './common/wrapper';

// export type AutoFormEditorProps = Omit<
//   React.ComponentProps<typeof Editor>,
//   'onChange' | 'value'
// >;

// export function AutoFormEditor<T extends FieldValues>({
//   field,
//   label,
//   description,
//   isRequired,
//   theme,
//   isDisabled,
//   componentProps,
//   className,
//   childComponent: ChildComponent,
//   hideOptionalLabel,
// }: {
//   componentProps?: AutoFormEditorProps;
// } & AutoFormItemProps<T>) {
//   return (
//     <AutoFormWrapper theme={theme}>
//       {label && (
//         <AutoFormLabel
//           description={description}
//           hideOptionalLabel={hideOptionalLabel}
//           isRequired={isRequired}
//           label={label}
//           theme={theme}
//         />
//       )}

//       <AutoFormInputWrapper
//         className={className}
//         withChildren={!!ChildComponent}
//       >
//         <FormControl>
//           <Editor
//             {...field}
//             {...componentProps}
//             disabled={isDisabled || componentProps?.disabled}
//           />
//         </FormControl>
//         {ChildComponent && <ChildComponent field={field} />}
//       </AutoFormInputWrapper>

//       {description && theme === 'vertical' && (
//         <AutoFormTooltip description={description} />
//       )}
//       <FormMessage />
//     </AutoFormWrapper>
//   );
// }

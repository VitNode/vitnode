import { AutoFormSwitch } from './fields/switch';
import { AutoFormColor } from './fields/color';
import { AutoFormFile } from './fields/file';
import { AutoFormInput } from './fields/input';
import { AutoFormNumber } from './fields/number';
import { AutoFormTextArea } from './fields/textarea';
import { AutoFormCheckbox } from './fields/checkbox';
import { AutoFormEnum } from './fields/enum';

export const INPUT_COMPONENTS = {
  switch: AutoFormSwitch,
  checkbox: AutoFormCheckbox,
  // date: AutoFormDate,
  select: AutoFormEnum,
  // radio: AutoFormRadioGroup,
  textarea: AutoFormTextArea,
  file: AutoFormFile,
  fallback: AutoFormInput,
  color: AutoFormColor,
  number: AutoFormNumber,
};

/**
 * Define handlers for specific Zod types.
 * You can expand this object to support more types.
 */
export const DEFAULT_ZOD_HANDLERS: Record<
  string,
  keyof typeof INPUT_COMPONENTS
> = {
  ZodBoolean: 'switch',
  // ZodDate: 'date',
  ZodEnum: 'select',
  ZodNativeEnum: 'select',
  ZodNumber: 'number',
};

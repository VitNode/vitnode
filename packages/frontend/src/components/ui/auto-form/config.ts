import { AutoFormColor } from './fields/color';
import { AutoFormFile } from './fields/file';
import { AutoFormInput } from './fields/input';

export const INPUT_COMPONENTS = {
  // checkbox: AutoFormCheckbox,
  // date: AutoFormDate,
  // select: AutoFormEnum,
  // radio: AutoFormRadioGroup,
  // switch: AutoFormSwitch,
  // textarea: AutoFormTextarea,
  // number: AutoFormNumber,
  file: AutoFormFile,
  fallback: AutoFormInput,
  color: AutoFormColor,
};

/**
 * Define handlers for specific Zod types.
 * You can expand this object to support more types.
 */
export const DEFAULT_ZOD_HANDLERS: Record<
  string,
  keyof typeof INPUT_COMPONENTS
> = {
  // ZodBoolean: 'checkbox',
  // ZodDate: 'date',
  // ZodEnum: 'select',
  // ZodNativeEnum: 'select',
  // ZodNumber: 'number',
};

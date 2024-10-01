import * as z from 'zod';

export const zodLanguageInput = z.array(
  z.object({
    language_code: z.string(),
    value: z.string().trim(),
  }),
);

export const zodFile = z.union([
  z.instanceof(File),
  z.object({
    mimetype: z.string(),
    file_name: z.string(),
    file_name_original: z.string(),
    dir_folder: z.string(),
    extension: z.string(),
    file_size: z.number(),
    width: z.number().optional(),
    height: z.number().optional(),
  }),
]);

export const zodTag = z.array(
  z.object({
    id: z.number(),
    value: z.string(),
  }),
);

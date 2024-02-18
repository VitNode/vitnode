import * as z from "zod";

export const zodInput = {
  languageInput: z.array(
    z.object({
      language_code: z.string(),
      value: z.string().trim()
    })
  ),
  languageInputRequired: z
    .array(
      z.object({
        language_code: z.string(),
        value: z.string().trim().min(1)
      })
    )
    .min(1),
  string: z.string().trim()
};

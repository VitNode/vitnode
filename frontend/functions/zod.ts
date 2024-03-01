import * as z from "zod";

export const zodInput = {
  languageInput: z.array(
    z.object({
      language_code: z.string(),
      value: z.string().trim()
    })
  ),
  string: z.string().trim()
};

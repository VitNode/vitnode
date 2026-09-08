import { z } from "zod";

export interface SSOLinkOffer {
  email: string;
  hasPassword: boolean;
  linkToken: string;
}

export interface SSOLinkFormMessages {
  passwordRequired: string;
}

export type SSOLinkMutationResult =
  | undefined
  | { message: "access_denied" | "Internal Server Error" | "invalid_token" };

export type SSOLinkFormError = "" | "access_denied" | "invalid_token";

export const createSSOLinkFormSchema = ({
  passwordRequired,
}: SSOLinkFormMessages) =>
  z.object({
    password: z.string().min(1, { message: passwordRequired }).default(""),
  });

export type SSOLinkFormSchema = ReturnType<typeof createSSOLinkFormSchema>;
export type SSOLinkFormValues = z.infer<SSOLinkFormSchema>;

export interface SSOLinkSubmitValues extends SSOLinkFormValues {
  token: string;
}

export const ssoLinkFormOutcome = (
  result: SSOLinkMutationResult,
): null | { error: SSOLinkFormError; kind: "field" } | { kind: "toast" } => {
  if (!result?.message) return null;

  return result.message === "Internal Server Error"
    ? { kind: "toast" }
    : { error: result.message, kind: "field" };
};

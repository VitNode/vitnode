import React from "react";
import { toast } from "sonner";
import { useTranslations } from "use-intl";

import type { AutoFormOnSubmit } from "@/components/form/auto-form";

import type {
  SSOLinkFormError,
  SSOLinkFormSchema,
  SSOLinkMutationResult,
  SSOLinkOffer,
  SSOLinkSubmitValues,
} from "./schema";

import { createSSOLinkFormSchema, ssoLinkFormOutcome } from "./schema";

export type SSOLinkSubmit = (
  values: SSOLinkSubmitValues,
) => Promise<SSOLinkMutationResult>;

export const useSSOLinkForm = ({
  offer,
  onLink,
}: {
  offer: SSOLinkOffer;
  onLink: SSOLinkSubmit;
}) => {
  const [error, setError] = React.useState<SSOLinkFormError>("");
  const t = useTranslations("core.auth.sso.link");
  const tErrors = useTranslations("core.global.errors");
  const formSchema = createSSOLinkFormSchema({
    passwordRequired: t("password.required"),
  });

  const onSubmit: AutoFormOnSubmit<SSOLinkFormSchema> = async ({
    password,
  }) => {
    setError("");
    const outcome = ssoLinkFormOutcome(
      await onLink({ password, token: offer.linkToken }),
    );

    if (!outcome) return;

    if (outcome.kind === "field") {
      setError(outcome.error);

      return;
    }

    toast.error(tErrors("title"), {
      description: tErrors("internal_server_error"),
    });
  };

  return { error, formSchema, onSubmit };
};

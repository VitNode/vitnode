import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";

import { mutationApi } from "./mutation-api";
import type { ErrorType } from "@/graphql/fetcher";

export const useSignInView = () => {
  const [error, setError] = useState<ErrorType | null>(null);
  const t = useTranslations("core");

  const formSchema = z.object({
    email: z
      .string({
        required_error: t("forms.empty")
      })
      .min(1, {
        message: t("forms.empty")
      }),
    password: z
      .string({
        required_error: t("forms.empty")
      })
      .min(1, {
        message: t("forms.empty")
      }),
    remember: z.boolean()
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false
    },
    mode: "onChange"
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setError(null);
    const mutation = await mutationApi(values);

    if (mutation?.error) {
      const error = mutation.error as ErrorType;

      if (error?.extensions) {
        setError(error);
      }
    }
  };

  return {
    form,
    onSubmit,
    error
  };
};

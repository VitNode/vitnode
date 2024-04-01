import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";

import { mutationApi } from "./mutation-api";
import type { ErrorType } from "@/graphql/fetcher";
import { zodInput } from "@/functions/zod";

export const useSignInView = (): {
  error: ErrorType | null;
  form: UseFormReturn<z.infer<typeof formSchema>>;
  onSubmit: (values: z.infer<typeof formSchema>) => Promise<void>;
} => {
  const [error, setError] = useState<ErrorType | null>(null);

  const formSchema = z.object({
    email: zodInput.string.min(1),
    password: z.string().min(1),
    remember: z.boolean()
  });

  const form: UseFormReturn<z.infer<typeof formSchema>> = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false
    },
    mode: "onChange"
  });

  const onSubmit = async (
    values: z.infer<typeof formSchema>
  ): Promise<void> => {
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

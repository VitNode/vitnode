import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import * as React from "react";
import { zodInput } from "@vitnode/frontend/helpers";

import { mutationApi } from "@/plugins/core/hooks/sign/in/mutation-api";
import { ErrorType } from "@/graphql/fetcher";

export const useSignInAdminView = () => {
  const [error, setError] = React.useState<ErrorType | null>(null);

  const formSchema = z.object({
    email: zodInput.string.min(1),
    password: z.string().min(1)
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setError(null);
    const mutation = await mutationApi({ ...values, admin: true });

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

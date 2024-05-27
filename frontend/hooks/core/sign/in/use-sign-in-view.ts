import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import * as React from "react";

import { mutationApi } from "./mutation-api";
import { ErrorType } from "@/graphql/fetcher";
import { zodInput } from "@/utils/zod";

export const useSignInView = () => {
  const [error, setError] = React.useState<ErrorType | null>(null);

  const formSchema = z.object({
    email: zodInput.string.min(1),
    password: z.string().min(1),
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

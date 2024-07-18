import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import React from 'react';

import { mutationApi } from './mutation-api';
import { ErrorType } from '@/graphql/fetcher';
import { zodInput } from '@/helpers/zod';

export const useSignInAdminView = () => {
  const [error, setError] = React.useState<ErrorType | null>(null);

  const formSchema = z.object({
    email: zodInput.string.min(1),
    password: z.string().min(1),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setError(null);
    try {
      await mutationApi({ ...values, admin: true });
    } catch (err) {
      const error = err as ErrorType;

      if (error?.extensions) {
        setError(error);
      }
    }
  };

  return {
    form,
    onSubmit,
    error,
  };
};

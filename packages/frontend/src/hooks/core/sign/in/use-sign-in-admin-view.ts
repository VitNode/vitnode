import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import React from 'react';

import { mutationApi } from './mutation-api';
import { FetcherErrorType } from '@/graphql/fetcher';

export const useSignInAdminView = () => {
  const [error, setError] = React.useState<FetcherErrorType | null>(null);

  const formSchema = z.object({
    email: z.string().min(1),
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
    const mutation = await mutationApi({ ...values, admin: true });
    if (mutation?.error) {
      setError(mutation?.error);
    }
  };

  return {
    form,
    onSubmit,
    error,
  };
};

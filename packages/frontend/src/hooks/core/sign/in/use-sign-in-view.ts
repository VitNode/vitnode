import * as z from 'zod';
import React from 'react';

import { mutationApi } from './mutation-api';
import { FetcherErrorType } from '@/graphql/fetcher';

export const useSignInView = () => {
  const [error, setError] = React.useState<FetcherErrorType | null>(null);

  const formSchema = z.object({
    email: z.string().email().default(''),
    password: z.string().min(1).default(''),
    remember: z.boolean().default(false).optional(),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setError(null);
    const mutation = await mutationApi(values);
    if (mutation?.error) {
      setError(mutation.error);
    }
  };

  return {
    formSchema,
    onSubmit,
    error,
  };
};

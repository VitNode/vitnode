import React from 'react';
import * as z from 'zod';

import { mutationApi } from './mutation-api';

export const useSignInAdminView = () => {
  const [error, setError] = React.useState<string>('');

  const formSchema = z.object({
    email: z.string().min(1),
    password: z.string().min(1),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setError('');
    const mutation = await mutationApi({ ...values, admin: true });
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

import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import * as z from 'zod';

import { mutationApi } from './mutation-api';

export const useSignInView = () => {
  const [error, setError] = React.useState('');

  const formSchema = z.object({
    email: z.string().email().default(''),
    password: z.string().min(1).default(''),
    remember: z.boolean().default(false).optional(),
  });

  const onSubmit = async (
    values: z.infer<typeof formSchema>,
    form: UseFormReturn<z.infer<typeof formSchema>>,
  ) => {
    setError('');
    form.reset({}, { keepValues: true });
    const mutation = await mutationApi(values);
    if (mutation?.error) {
      setError(mutation.error);
    }

    // Redirect to home
    window.location.href = '/';
  };

  return {
    formSchema,
    onSubmit,
    error,
  };
};

import React from 'react';
import * as z from 'zod';

import { mutationApi } from './mutation-api';
import { useRouter } from '@/navigation';

export const useSignInView = () => {
  const [error, setError] = React.useState('');
  const { push } = useRouter();

  const formSchema = z.object({
    email: z.string().email().default(''),
    password: z.string().min(1).default(''),
    remember: z.boolean().default(false).optional(),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setError('');
    const mutation = await mutationApi(values);
    if (mutation?.error) {
      setError(mutation.error);

      return;
    }

    push('/');
  };

  return {
    formSchema,
    onSubmit,
    error,
  };
};

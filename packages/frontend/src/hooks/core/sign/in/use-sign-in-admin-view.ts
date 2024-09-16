import React from 'react';
import * as z from 'zod';

import { mutationApi } from './mutation-api';
import { useRouter } from '@/navigation';

export const useSignInAdminView = () => {
  const [error, setError] = React.useState<string>('');
  const { push } = useRouter();

  const formSchema = z.object({
    email: z.string().min(1),
    password: z.string().min(1),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setError('');
    const mutation = await mutationApi({ ...values, admin: true });
    if (mutation?.error) {
      setError(mutation.error);

      return;
    }

    push('/admin/core/dashboard');
  };

  return {
    formSchema,
    onSubmit,
    error,
  };
};

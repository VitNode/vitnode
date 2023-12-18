import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { ErrorType } from '@/graphql/fetcher';
import { mutationApi } from './mutation-api';
import { useToast } from '@/components/ui/use-toast';

const nameRegex = /^[A-Za-z0-9._@-]*$/;

interface Args {
  installPage?: boolean;
}

export const useSignUpView = ({ installPage }: Args) => {
  const t = useTranslations('core');
  const { toast } = useToast();

  const formSchema = z.object({
    name: z
      .string({
        required_error: t('forms.empty')
      })
      .min(1, {
        message: t('forms.empty')
      })
      .refine(value => nameRegex.test(value), {
        message: t('sign_up.form.name.invalid')
      }),
    email: z
      .string({
        required_error: t('forms.empty')
      })
      .min(1, {
        message: t('forms.empty')
      }),
    password: z
      .string({
        required_error: t('forms.empty')
      })
      .min(1, {
        message: t('forms.empty')
      }),
    terms: z.boolean().refine(value => value, {
      message: t('sign_up.form.terms.empty')
    }),
    newsletter: z.boolean()
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      terms: false,
      newsletter: false
    },
    mode: 'onChange'
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { terms, ...rest } = values;

    const mutation = await mutationApi({
      variables: rest,
      installPage
    });

    if (mutation.error) {
      const error = mutation.error as ErrorType;

      if (error?.extensions) {
        const {
          extensions: { code }
        } = error as ErrorType;

        if (code === 'EMAIL_ALREADY_EXISTS') {
          form.setError(
            'email',
            {
              type: 'manual',
              message: t('sign_up.form.email.already_exists')
            },
            {
              shouldFocus: true
            }
          );

          return;
        }

        if (code === 'NAME_ALREADY_EXISTS') {
          form.setError(
            'name',
            {
              type: 'manual',
              message: t('sign_up.form.name.already_exists')
            },
            {
              shouldFocus: true
            }
          );

          return;
        }

        toast({
          title: t('errors.title'),
          description: t('errors.internal_server_error'),
          variant: 'destructive'
        });
      }
    }
  };

  return {
    form,
    onSubmit
  };
};

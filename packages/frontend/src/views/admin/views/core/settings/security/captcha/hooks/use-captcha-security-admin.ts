import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

export const useCaptchaSecurityAdmin = () => {
  const formSchema = z.object({
    type: z.enum([
      'none',
      'recaptcha_v2',
      'recaptcha_v3',
      'hcaptcha',
      'cloudflare_turnstile',
    ]),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: 'none',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {};

  return { form, onSubmit };
};

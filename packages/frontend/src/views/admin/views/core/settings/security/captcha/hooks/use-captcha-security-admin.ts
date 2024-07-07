import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import {
  Admin__Core_Security__Captcha__ShowQuery,
  CaptchaTypeEnum,
} from '../../../../../../../../graphql/graphql';

export const useCaptchaSecurityAdmin = ({
  admin__core_security__captcha__show: data,
}: Admin__Core_Security__Captcha__ShowQuery) => {
  const formSchema = z.object({
    type: z.nativeEnum(CaptchaTypeEnum),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: data.type,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {};

  return { form, onSubmit };
};

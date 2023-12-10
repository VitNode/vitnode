import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import { fetcher } from '@/graphql/fetcher';
import {
  LayoutAdminInstallEnum,
  Admin_Install__LayoutQuery,
  SignUp_Core_Members,
  SignUp_Core_MembersMutation,
  SignUp_Core_MembersMutationVariables
} from '@/graphql/hooks';
import { usePathname } from '@/i18n';
import { APIKeys } from '@/graphql/api-keys';
import { useToast } from '@/components/ui/use-toast';

export const useSignUpAPI = () => {
  const t = useTranslations('core');
  const { toast } = useToast();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables: SignUp_Core_MembersMutationVariables) =>
      await fetcher<SignUp_Core_MembersMutation, SignUp_Core_MembersMutationVariables>({
        query: SignUp_Core_Members,
        variables
      }),
    onError: () => {
      toast({
        title: t('errors.title'),
        description: t('errors.internal_server_error'),
        variant: 'destructive'
      });
    },
    onSuccess: () => {
      if (pathname === '/admin/install/account') {
        queryClient.setQueryData<Admin_Install__LayoutQuery>(
          [APIKeys.LAYOUT_ADMIN_INSTALL],
          old => {
            if (!old) return old;

            return {
              ...old,
              layout_admin_install: {
                status: LayoutAdminInstallEnum.finish
              }
            };
          }
        );
      }
    }
  });
};

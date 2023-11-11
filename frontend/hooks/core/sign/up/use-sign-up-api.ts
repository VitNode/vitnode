import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetcher } from '@/graphql/fetcher';
import {
  LayoutAdminInstallEnum,
  Layout_Admin_InstallQuery,
  SignUp_Core_Members,
  SignUp_Core_MembersMutation,
  SignUp_Core_MembersMutationVariables
} from '@/graphql/hooks';
import { usePathname } from '@/i18n';
import { APIKeys } from '@/graphql/api-keys';

export const useSignUpAPI = () => {
  const pathname = usePathname();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables: SignUp_Core_MembersMutationVariables) =>
      await fetcher<SignUp_Core_MembersMutation, SignUp_Core_MembersMutationVariables>({
        query: SignUp_Core_Members,
        variables
      }),
    onSuccess: () => {
      if (pathname === '/admin/install/account') {
        queryClient.setQueryData<Layout_Admin_InstallQuery>([APIKeys.LAYOUT_ADMIN_INSTALL], old => {
          if (!old) return old;

          return {
            ...old,
            layout_admin_install: {
              status: LayoutAdminInstallEnum.Finish
            }
          };
        });
      }
    }
  });
};

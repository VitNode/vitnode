import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetcher } from '@/graphql/fetcher';
import {
  Admin_Install__Create_Database,
  Admin_Install__Create_DatabaseMutation,
  Admin_Install__Create_DatabaseMutationVariables,
  LayoutAdminInstallEnum,
  Admin_Install__LayoutQuery
} from '@/graphql/hooks';
import { useRouter } from '@/i18n';
import { APIKeys } from '@/graphql/api-keys';

export const useCreateDatabaseInstallConfigsAPI = () => {
  const { push } = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () =>
      await fetcher<
        Admin_Install__Create_DatabaseMutation,
        Admin_Install__Create_DatabaseMutationVariables
      >({
        query: Admin_Install__Create_Database
      }),
    onSuccess: () => {
      queryClient.setQueryData<Admin_Install__LayoutQuery>([APIKeys.LAYOUT_ADMIN_INSTALL], old => {
        if (!old) return old;

        return {
          ...old,
          layout_admin_install: {
            status: LayoutAdminInstallEnum.account
          }
        };
      });

      push('/admin/install/account');
    }
  });
};

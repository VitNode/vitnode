import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetcher } from '@/graphql/fetcher';
import {
  Create_Database_Admin_Install,
  Create_Database_Admin_InstallMutation,
  Create_Database_Admin_InstallMutationVariables,
  LayoutAdminInstallEnum,
  Layout_Admin_InstallQuery
} from '@/graphql/hooks';
import { useRouter } from '@/i18n';
import { APIKeys } from '@/graphql/api-keys';

export const useCreateDatabaseInstallConfigsAPI = () => {
  const { push } = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () =>
      await fetcher<
        Create_Database_Admin_InstallMutation,
        Create_Database_Admin_InstallMutationVariables
      >({
        query: Create_Database_Admin_Install
      }),
    onSuccess: () => {
      queryClient.setQueryData<Layout_Admin_InstallQuery>([APIKeys.LAYOUT_ADMIN_INSTALL], old => {
        if (!old) return old;

        return {
          ...old,
          layout_admin_install: {
            status: LayoutAdminInstallEnum.Account
          }
        };
      });

      push('/admin/install/account');
    }
  });
};

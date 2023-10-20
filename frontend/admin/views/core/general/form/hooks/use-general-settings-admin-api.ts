import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import { fetcher } from '@/graphql/fetcher';
import {
  Edit_General_Admin_Settings,
  Edit_General_Admin_SettingsMutation,
  Edit_General_Admin_SettingsMutationVariables
} from '@/graphql/hooks';
import { useToast } from '@/components/ui/use-toast';

export const useGeneralSettingsAdminAPI = () => {
  const t = useTranslations('core');
  const { toast } = useToast();
  // const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables: Edit_General_Admin_SettingsMutationVariables) =>
      await fetcher<
        Edit_General_Admin_SettingsMutation,
        Edit_General_Admin_SettingsMutationVariables
      >({
        query: Edit_General_Admin_Settings,
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
      toast({
        title: t('saved_success')
      });

      // TODO: Update cache
    }
  });
};

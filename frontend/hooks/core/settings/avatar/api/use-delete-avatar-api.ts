import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import { fetcher } from '@/graphql/fetcher';
import {
  Core_Sessions__AuthorizationQuery,
  Core_Members__Avatar__Delete,
  Core_Members__Avatar__DeleteMutation,
  Core_Members__Avatar__DeleteMutationVariables
} from '@/graphql/hooks';
import { useToast } from '@/components/ui/use-toast';
import { useDialog } from '@/components/ui/dialog';
import { APIKeys } from '@/graphql/api-keys';

export const useDeleteAvatarAPI = () => {
  const t = useTranslations('core');
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { setOpen } = useDialog();

  return useMutation({
    mutationFn: async () =>
      await fetcher<
        Core_Members__Avatar__DeleteMutation,
        Core_Members__Avatar__DeleteMutationVariables
      >({
        query: Core_Members__Avatar__Delete
      }),
    onSuccess: () => {
      toast({
        title: t('settings.change_avatar.options.delete.title'),
        description: t('settings.change_avatar.options.delete.success')
      });

      queryClient.setQueryData<Core_Sessions__AuthorizationQuery>([APIKeys.AUTHORIZATION], old => {
        if (!old) return old;

        return {
          ...old,
          core_sessions__authorization: {
            ...old.core_sessions__authorization,
            user: old.core_sessions__authorization.user
              ? {
                  ...old.core_sessions__authorization.user,
                  avatar: null
                }
              : null
          }
        };
      });
      setOpen(false);
    },
    onError: () => {
      toast({
        title: t('errors.title'),
        description: t('settings.change_avatar.options.delete.error'),
        variant: 'destructive'
      });
    }
  });
};

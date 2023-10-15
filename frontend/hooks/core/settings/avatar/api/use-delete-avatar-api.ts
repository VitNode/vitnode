import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import { fetcher } from '@/graphql/fetcher';
import {
  Authorization_Core_SessionsQuery,
  Delete_Avatar_Core_Members,
  Delete_Avatar_Core_MembersMutation,
  Delete_Avatar_Core_MembersMutationVariables
} from '@/graphql/hooks';
import { useToast } from '@/components/ui/use-toast';
import { useDialog } from '@/components/ui/dialog';

import { APIKeys } from '../../../../../graphql/api-keys';

export const useDeleteAvatarAPI = () => {
  const t = useTranslations('core');
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { setOpen } = useDialog();

  return useMutation({
    mutationFn: async () =>
      await fetcher<
        Delete_Avatar_Core_MembersMutation,
        Delete_Avatar_Core_MembersMutationVariables
      >({
        query: Delete_Avatar_Core_Members
      }),
    onSuccess: () => {
      toast({
        title: t('settings.change_avatar.options.delete.title'),
        description: t('settings.change_avatar.options.delete.success')
      });

      queryClient.setQueryData<Authorization_Core_SessionsQuery>([APIKeys.AUTHORIZATION], old => {
        if (!old) return old;

        return {
          ...old,
          authorization_core_sessions: {
            ...old.authorization_core_sessions,
            avatar: {
              ...old.authorization_core_sessions.avatar,
              img: null
            }
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

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import { fetcher } from '@/graphql/fetcher';
import {
  Core_Sessions__AuthorizationQuery,
  Core_Members__Avatar__Upload,
  Core_Members__Avatar__UploadMutation,
  Core_Members__Avatar__UploadMutationVariables
} from '@/graphql/hooks';
import { useToast } from '@/components/ui/use-toast';
import { useDialog } from '@/components/ui/dialog';

import { APIKeys } from '@/graphql/api-keys';

export const useUploadAvatarAPI = () => {
  const t = useTranslations('core');
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { setOpen } = useDialog();

  return useMutation({
    mutationFn: async ({ file }: Core_Members__Avatar__UploadMutationVariables) =>
      await fetcher<
        Core_Members__Avatar__UploadMutation,
        Core_Members__Avatar__UploadMutationVariables
      >({
        query: Core_Members__Avatar__Upload,
        uploads: [
          {
            files: file,
            variable: 'file'
          }
        ]
      }),
    onSuccess: data => {
      toast({
        title: t('settings.change_avatar.options.upload.title'),
        description: t('settings.change_avatar.options.upload.success')
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
                  avatar: data.core_members__avatar__upload
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
        description: t('settings.change_avatar.options.upload.error'),
        variant: 'destructive'
      });
    }
  });
};

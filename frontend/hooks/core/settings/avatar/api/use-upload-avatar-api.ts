import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import { fetcher } from '@/graphql/fetcher';
import {
  Authorization_Core_SessionsQuery,
  Upload_Avatar_Core_Members,
  Upload_Avatar_Core_MembersMutation,
  Upload_Avatar_Core_MembersMutationVariables
} from '@/graphql/hooks';
import { useToast } from '@/components/ui/use-toast';
import { useDialog } from '@/components/ui/dialog';

import { APIKeys } from '../../../../../graphql/api-keys';

export const useUploadAvatarAPI = () => {
  const t = useTranslations('core');
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { setOpen } = useDialog();

  return useMutation({
    mutationFn: async ({ file }: Upload_Avatar_Core_MembersMutationVariables) =>
      await fetcher<
        Upload_Avatar_Core_MembersMutation,
        Upload_Avatar_Core_MembersMutationVariables
      >({
        query: Upload_Avatar_Core_Members,
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

      queryClient.setQueryData<Authorization_Core_SessionsQuery>([APIKeys.AUTHORIZATION], old => {
        if (!old) return old;

        return {
          ...old,
          authorization_core_sessions: {
            ...old.authorization_core_sessions,
            avatar: {
              ...old.authorization_core_sessions.avatar,
              img: data.upload_avatar_core_members
            }
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

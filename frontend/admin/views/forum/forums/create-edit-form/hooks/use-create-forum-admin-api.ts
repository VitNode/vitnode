import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { UseFormSetError } from 'react-hook-form';

import {
  Forum_Forums__Admin__Create,
  Forum_Forums__Admin__CreateMutation,
  Forum_Forums__Admin__CreateMutationVariables
} from '@/graphql/hooks';
import { ErrorType, fetcher } from '@/graphql/fetcher';
import { useToast } from '@/components/ui/use-toast';
import { useDialog } from '@/components/ui/dialog';

interface Args {
  setError: UseFormSetError<{ name_seo?: string }>;
}

export const useCreateForumAdminAPI = ({ setError }: Args) => {
  const t = useTranslations('admin.forum.forums.create_edit');
  const tCore = useTranslations('core.errors');
  const { toast } = useToast();
  const { setOpen } = useDialog();

  return useMutation({
    mutationFn: async (variables: Forum_Forums__Admin__CreateMutationVariables) =>
      await fetcher<
        Forum_Forums__Admin__CreateMutation,
        Forum_Forums__Admin__CreateMutationVariables
      >({
        query: Forum_Forums__Admin__Create,
        variables
      }),
    onError: (error: ErrorType) => {
      if (error.extensions.code === 'FORUM_NAME_SEO_ALREADY_EXISTS') {
        setError('name_seo', {
          type: 'manual',
          message: t('name_seo.already_exists')
        });

        return;
      }

      toast({
        title: tCore('title'),
        description: tCore('internal_server_error'),
        variant: 'destructive'
      });
    },
    onSuccess: () => {
      setOpen(false);
    }
  });
};

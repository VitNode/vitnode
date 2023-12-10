import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import {
  Forum_Forums__Admin__Create,
  Forum_Forums__Admin__CreateMutation,
  Forum_Forums__Admin__CreateMutationVariables
} from '@/graphql/hooks';
import { fetcher } from '@/graphql/fetcher';
import { useToast } from '@/components/ui/use-toast';
import { useDialog } from '@/components/ui/dialog';

export const useCreateForumAdminAPI = () => {
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
    onError: () => {
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

import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import {
  Create_Forum_Forums,
  Create_Forum_ForumsMutation,
  Create_Forum_ForumsMutationVariables
} from '@/graphql/hooks';
import { fetcher } from '@/graphql/fetcher';
import { useToast } from '@/components/ui/use-toast';
import { useDialog } from '@/components/ui/dialog';

export const useCreateForumAdminAPI = () => {
  const tCore = useTranslations('core.errors');
  const { toast } = useToast();
  const { setOpen } = useDialog();

  return useMutation({
    mutationFn: async (variables: Create_Forum_ForumsMutationVariables) =>
      await fetcher<Create_Forum_ForumsMutation, Create_Forum_ForumsMutationVariables>({
        query: Create_Forum_Forums,
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

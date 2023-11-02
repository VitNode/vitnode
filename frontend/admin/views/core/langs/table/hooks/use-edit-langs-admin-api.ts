import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import { fetcher } from '@/graphql/fetcher';
import {
  Edit_Core_Languages,
  Edit_Core_LanguagesMutation,
  Edit_Core_LanguagesMutationVariables
} from '@/graphql/hooks';
import { APIKeys } from '@/graphql/api-keys';

export const useEditLangsAdminAPI = () => {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const pagination = {
    first: searchParams.get('first') ?? 0,
    last: searchParams.get('last'),
    cursor: searchParams.get('cursor')
  };

  return useMutation({
    mutationFn: async (variables: Edit_Core_LanguagesMutationVariables) =>
      await fetcher<Edit_Core_LanguagesMutation, Edit_Core_LanguagesMutationVariables>({
        query: Edit_Core_Languages,
        variables
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [APIKeys.LANGUAGES_ADMIN, { ...pagination }]
      });
    }
  });
};

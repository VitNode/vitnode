import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';

import { fetcher } from '@/graphql/fetcher';
import {
  Core_Languages__Edit,
  Core_Languages__EditMutation,
  Core_Languages__EditMutationVariables,
  Core_Languages__MiddlewareQuery,
  Core_Languages__ShowQuery
} from '@/graphql/hooks';
import { APIKeys } from '@/graphql/api-keys';
import { useDialog } from '@/components/ui/dialog';
import { usePathname, useRouter } from '@/i18n';
import { useGlobals } from '@/hooks/core/use-globals';

export const useEditLangsAdminAPI = () => {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const pagination = {
    first: searchParams.get('first') ?? 0,
    last: searchParams.get('last'),
    cursor: searchParams.get('cursor')
  };
  const { setOpen } = useDialog();
  const locale = useLocale();
  const { replace } = useRouter();
  const pathname = usePathname();
  const { languages } = useGlobals();

  return useMutation({
    mutationFn: async (variables: Core_Languages__EditMutationVariables) =>
      await fetcher<Core_Languages__EditMutation, Core_Languages__EditMutationVariables>({
        query: Core_Languages__Edit,
        variables
      }),
    onSuccess: data => {
      queryClient.setQueryData<Core_Languages__ShowQuery>(
        [APIKeys.LANGUAGES_ADMIN, { ...pagination }],
        oldData => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            core_languages__show: {
              ...oldData.core_languages__show,
              edges: oldData.core_languages__show.edges.map(edge => {
                if (edge.id === data.core_languages__edit.id) {
                  return data.core_languages__edit;
                }

                return edge;
              })
            }
          };
        }
      );

      // Update languages
      queryClient.setQueryData<Core_Languages__MiddlewareQuery>([APIKeys.LANGUAGES], oldData => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          core_languages__show: {
            ...oldData.core_languages__show,
            edges: oldData.core_languages__show.edges.map(edge => {
              if (edge.id === data.core_languages__edit.id) {
                return data.core_languages__edit;
              }

              return edge;
            })
          }
        };
      });

      setOpen(false);

      if (locale === data.core_languages__edit.id) {
        const defaultLocale = languages.find(item => item.enabled)?.id ?? 'en';
        replace(pathname, { locale: defaultLocale });
      }
    }
  });
};

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useLocale } from 'next-intl';

import { fetcher } from '@/graphql/fetcher';
import {
  Edit_Core_Languages,
  Edit_Core_LanguagesMutation,
  Edit_Core_LanguagesMutationVariables,
  Middleware_Core_LanguagesQuery,
  Show_Core_LanguagesQuery
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
    mutationFn: async (variables: Edit_Core_LanguagesMutationVariables) =>
      await fetcher<Edit_Core_LanguagesMutation, Edit_Core_LanguagesMutationVariables>({
        query: Edit_Core_Languages,
        variables
      }),
    onSuccess: data => {
      queryClient.setQueryData<Show_Core_LanguagesQuery>(
        [APIKeys.LANGUAGES_ADMIN, { ...pagination }],
        oldData => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            show_core_languages: {
              ...oldData.show_core_languages,
              edges: oldData.show_core_languages.edges.map(edge => {
                if (edge.id === data.edit_core_languages.id) {
                  return data.edit_core_languages;
                }

                return edge;
              })
            }
          };
        }
      );

      // Update languages
      queryClient.setQueryData<Middleware_Core_LanguagesQuery>([APIKeys.LANGUAGES], oldData => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          show_core_languages: {
            ...oldData.show_core_languages,
            edges: oldData.show_core_languages.edges.map(edge => {
              if (edge.id === data.edit_core_languages.id) {
                return data.edit_core_languages;
              }

              return edge;
            })
          }
        };
      });

      setOpen(false);

      if (locale === data.edit_core_languages.id) {
        const defaultLocale = languages.find(item => item.enabled)?.id ?? 'en';
        replace(pathname, { locale: defaultLocale });
      }
    }
  });
};

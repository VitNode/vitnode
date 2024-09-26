import { fetcher } from '@/graphql/fetcher';
import {
  Admin__Core_Ai__Show,
  Admin__Core_Ai__ShowQuery,
  Admin__Core_Ai__ShowQueryVariables,
} from '@/graphql/queries/admin/ai/admin__core_ai__show.generated';

export const getAdminAiSettings = async () => {
  const data = await fetcher<
    Admin__Core_Ai__ShowQuery,
    Admin__Core_Ai__ShowQueryVariables
  >({
    query: Admin__Core_Ai__Show,
    cache: 'force-cache',
    next: {
      tags: ['admin__core_ai__show'],
    },
  });

  return data;
};

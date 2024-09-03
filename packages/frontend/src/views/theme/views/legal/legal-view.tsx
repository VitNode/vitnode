import { fetcher } from '@/graphql/fetcher';
import {
  Core_Terms__Show,
  Core_Terms__ShowQuery,
  Core_Terms__ShowQueryVariables,
} from '@/graphql/queries/terms/core_terms__show.generated';
import { getTranslations } from 'next-intl/server';

import { ItemLegal } from './item';

const getData = async () => {
  const data = await fetcher<
    Core_Terms__ShowQuery,
    Core_Terms__ShowQueryVariables
  >({
    query: Core_Terms__Show,
    cache: 'force-cache',
  });

  return data;
};

export const LegalView = async () => {
  const [
    t,
    {
      core_terms__show: { edges },
    },
  ] = await Promise.all([getTranslations('core.legal'), getData()]);

  return (
    <div className="container my-14 flex max-w-6xl flex-col justify-between gap-14 md:flex-row">
      <div className="max-w-sm">
        <h1 className="text-3xl font-semibold">{t('title')}</h1>
      </div>

      <ul className="flex-1 space-y-6">
        {edges.map(edge => (
          <ItemLegal key={edge.id} {...edge} />
        ))}
      </ul>
    </div>
  );
};

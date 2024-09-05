import { Card } from '@/components/ui/card';
import { fetcher } from '@/graphql/fetcher';
import {
  Core_Terms__Show,
  Core_Terms__ShowQuery,
  Core_Terms__ShowQueryVariables,
} from '@/graphql/queries/terms/core_terms__show.generated';
import { getTranslations } from 'next-intl/server';

import { ItemLegal } from './item';

export const getLegalData = async (
  variables: Core_Terms__ShowQueryVariables,
) => {
  const data = await fetcher<
    Core_Terms__ShowQuery,
    Core_Terms__ShowQueryVariables
  >({
    query: Core_Terms__Show,
    variables,
    cache: 'force-cache',
    next: {
      tags: [`core_terms__show${variables.code ? `-${variables.code}` : ''}`],
    },
  });

  return data;
};

export const generateMetadataLegal = async () => {
  const t = await getTranslations('core.legal');

  return {
    title: t('title'),
  };
};

export const LegalView = async () => {
  const [
    t,
    {
      core_terms__show: { edges },
    },
  ] = await Promise.all([getTranslations('core.legal'), getLegalData({})]);

  return (
    <div className="container my-14 flex max-w-5xl flex-col justify-between gap-10 md:flex-row">
      <div className="max-w-xs">
        <h1 className="text-3xl font-semibold">{t('title_page')}</h1>
      </div>

      <div className="flex-1 space-y-10">
        {edges.length ? (
          edges.map(edge => <ItemLegal key={edge.id} {...edge} />)
        ) : (
          <Card className="text-muted-foreground flex items-center justify-center p-6">
            {t('empty')}
          </Card>
        )}
      </div>
    </div>
  );
};

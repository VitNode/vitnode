import { Card } from '@/components/ui/card';
import { HeaderContent } from '@/components/ui/header-content';
import { fetcher } from '@/graphql/fetcher';
import {
  Admin__Core_Manifest_Metadata__Show,
  Admin__Core_Manifest_Metadata__ShowQuery,
  Admin__Core_Manifest_Metadata__ShowQueryVariables,
} from '@/graphql/queries/admin/settings/admin__core_manifest_metadata__show.generated';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { ContentManifestMetadataCoreAdmin } from './content';

const getData = async () => {
  const data = await fetcher<
    Admin__Core_Manifest_Metadata__ShowQuery,
    Admin__Core_Manifest_Metadata__ShowQueryVariables
  >({
    query: Admin__Core_Manifest_Metadata__Show,
  });

  return data;
};

export const generateMetadataManifestMetadataCoreAdmin =
  async (): Promise<Metadata> => {
    const t = await getTranslations('admin.core.metadata.manifest');

    return {
      title: t('title'),
    };
  };

export const ManifestMetadataCoreAdminView = async () => {
  const [t, data] = await Promise.all([
    getTranslations('admin.core.metadata.manifest'),
    getData(),
  ]);

  return (
    <>
      <HeaderContent desc={t('desc')} h1={t('title')} />

      <Card className="p-6">
        <ContentManifestMetadataCoreAdmin {...data} />
      </Card>
    </>
  );
};

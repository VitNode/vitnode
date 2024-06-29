import { getTranslations } from 'next-intl/server';

import { ContentManifestMetadataCoreAdmin } from './content';

import { HeaderContent } from '../../../../../../../components/ui/header-content';
import { Card } from '../../../../../../../components/ui/card';
import { fetcher } from '../../../../../../../graphql/fetcher';
import {
  Admin__Core_Manifest_Metadata__Show,
  Admin__Core_Manifest_Metadata__ShowQuery,
  Admin__Core_Manifest_Metadata__ShowQueryVariables,
} from '../../../../../../../graphql/graphql';

const getData = async () => {
  const { data } = await fetcher<
    Admin__Core_Manifest_Metadata__ShowQuery,
    Admin__Core_Manifest_Metadata__ShowQueryVariables
  >({
    query: Admin__Core_Manifest_Metadata__Show,
  });

  return data;
};

export const ManifestMetadataCoreAdminView = async () => {
  const [t, data] = await Promise.all([
    getTranslations('admin.core.metadata.manifest'),
    getData(),
  ]);

  return (
    <>
      <HeaderContent h1={t('title')} desc={t('desc')} />

      <Card className="p-6">
        <ContentManifestMetadataCoreAdmin {...data} />
      </Card>
    </>
  );
};

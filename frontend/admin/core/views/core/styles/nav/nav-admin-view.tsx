import { useTranslations } from 'next-intl';

import { HeaderContent } from '@/components/header-content/header-content';
import { TableNavAdmin } from './table/table';
import type { Core_Nav__Admin__ShowQuery } from '@/graphql/hooks';
import { ActionsNavAdmin } from './actions/actions';

export const NavAdminView = (props: Core_Nav__Admin__ShowQuery) => {
  const t = useTranslations('admin.core.styles.nav');

  return (
    <>
      <HeaderContent h1={t('title')}>
        <ActionsNavAdmin />
      </HeaderContent>

      <TableNavAdmin {...props} />
    </>
  );
};

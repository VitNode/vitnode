import { ContentInstallConfigsView } from './content/content';

import {
  Admin__Install__Layout,
  Admin__Install__LayoutQuery,
  Admin__Install__LayoutQueryVariables,
} from '../../../../graphql/code';
import { ErrorType, fetcher } from '../../../../graphql/fetcher';
import { redirect } from '../../../../navigation';
import { InternalErrorView } from '../../../global';

const getData = async () => {
  const { data } = await fetcher<
    Admin__Install__LayoutQuery,
    Admin__Install__LayoutQueryVariables
  >({
    query: Admin__Install__Layout,
    cache: 'force-cache',
  });

  return data;
};

export const InstallConfigsView = async () => {
  try {
    const data = await getData();

    return (
      <ContentInstallConfigsView data={data.admin__install__layout.status} />
    );
  } catch (error) {
    const code = error as ErrorType;

    if (code.extensions?.code === 'ACCESS_DENIED') {
      redirect('/admin');
    }

    return <InternalErrorView />;
  }
};

import { AdminProviders } from './providers';

import { getSessionAdminData } from '../../../graphql/get-session-admin';
import { ErrorView } from '../../theme/views/error/error-view';

interface Props {
  children: React.ReactNode;
}

export const AdminLayout = async ({ children }: Props) => {
  try {
    const data = await getSessionAdminData();

    return <AdminProviders data={data}>{children}</AdminProviders>;
  } catch (error) {
    return <ErrorView code="403" />;
  }
};

import { AdminProviders } from './providers';

import { getSessionAdminData } from '../../../graphql/get-session-admin';

export const AdminLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const data = await getSessionAdminData();

  return <AdminProviders data={data}>{children}</AdminProviders>;
};

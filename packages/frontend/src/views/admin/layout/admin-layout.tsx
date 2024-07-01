import { AdminProviders } from './providers';

import { getSessionAdminData } from '../../../graphql/get-session-admin';

interface Props {
  children: React.ReactNode;
}

export const AdminLayout = async ({ children }: Props) => {
  const data = await getSessionAdminData();

  return <AdminProviders data={data}>{children}</AdminProviders>;
};

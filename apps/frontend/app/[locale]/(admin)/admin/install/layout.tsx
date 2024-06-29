import { InstallConfigLayout } from 'vitnode-frontend/admin/install/install-config-layout';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return <InstallConfigLayout>{children}</InstallConfigLayout>;
}

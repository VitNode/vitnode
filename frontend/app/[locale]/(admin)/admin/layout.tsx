import { ReactNode } from 'react';
import '@/themes/default/core/layout/global.scss';

interface Props {
  children: ReactNode;
  params: { locale: string };
}

export default function Layout({ children }: Props) {
  return <>{children}</>;
}

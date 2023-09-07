import { ReactNode } from 'react';

import '@/styles/global.scss';

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return children;
}

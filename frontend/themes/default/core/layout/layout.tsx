import type { ReactNode } from 'react';

import { Header } from './header/header';
import { Footer } from './footer/footer';
import { QuickMenu } from './quick-menu/quick-menu';

import './global.scss';

interface Props {
  children: ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <QuickMenu />
    </>
  );
};

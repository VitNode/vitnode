import { ReactNode } from 'react';

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
      <div className="max-w-[100rem] mx-auto p-5">{children}</div>
      <Footer />
      <QuickMenu />
    </>
  );
};

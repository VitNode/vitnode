import { ReactNode } from 'react';

import { Header } from './header/header';
import { Footer } from './footer/footer';

import './global.scss';

interface Props {
  children: ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <div className="max-w-[120rem] mx-auto p-5">{children}</div>
      <Footer />
    </>
  );
};

import { ReactNode } from 'react';

import { Header } from './header/Header';

interface Props {
  children: ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <div className="max-w-[120rem] mx-auto px-5">{children}</div>
    </>
  );
};

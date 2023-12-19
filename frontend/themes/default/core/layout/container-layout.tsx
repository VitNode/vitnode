import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const ContainerLayout = ({ children }: Props) => {
  return <div className="container py-5">{children}</div>;
};

import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const ContainerLayout = ({ children }: Props) => {
  return <div className="container py-6">{children}</div>;
};

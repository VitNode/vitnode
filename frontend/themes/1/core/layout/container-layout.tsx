import type { ReactNode } from "react";

export interface ContainerLayoutProps {
  children: ReactNode;
}

export default function ContainerLayout({ children }: ContainerLayoutProps) {
  return <div className="container py-5">{children}</div>;
}

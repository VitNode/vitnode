import * as React from "react";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return <div className="container my-4">{children}</div>;
}

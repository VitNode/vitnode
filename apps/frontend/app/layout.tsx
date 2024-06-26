import * as React from 'react';

interface Props {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: Props) {
  return children;
}

import config from '~/config.json';

import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export function generateMetadata(): Metadata {
  const defaultTitle = config.side_name;

  return {
    title: {
      default: defaultTitle,
      template: `%s - ${defaultTitle}`
    }
  };
}

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return children;
}

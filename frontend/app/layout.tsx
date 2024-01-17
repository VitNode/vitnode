import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import config from '@/config.json';

export function generateMetadata(): Metadata {
  const defaultTitle = config.side_name;

  return {
    title: {
      default: defaultTitle,
      template: `%s - ${defaultTitle}`
    },
    icons: {
      icon: '/icons/favicon.ico'
    }
  };
}

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return children;
}

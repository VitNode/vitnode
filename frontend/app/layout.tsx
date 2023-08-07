import { ReactNode } from 'react';
import { Metadata } from 'next';

import { GLOBAL_CONFIG } from '@/config';
import '@/styles/global.scss';

export function generateMetadata(): Metadata {
  return {
    title: {
      default: GLOBAL_CONFIG.title,
      template: `%s - ${GLOBAL_CONFIG.title}`
    }
  };
}

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return children;
}

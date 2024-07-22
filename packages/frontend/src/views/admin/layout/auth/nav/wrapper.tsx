'use client';

import * as Accordion from '@radix-ui/react-accordion';
import React from 'react';

import { usePathname } from '@/navigation';

export const NavAdminWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const params = usePathname();
  const segments = params.split('/').filter(item => item);

  return (
    <Accordion.Root
      type="multiple"
      defaultValue={[`${segments[1]}_${segments[2]}`]}
    >
      {children}
    </Accordion.Root>
  );
};

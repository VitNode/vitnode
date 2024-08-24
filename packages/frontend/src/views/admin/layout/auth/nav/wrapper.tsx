'use client';

import { usePathname } from '@/navigation';
import * as Accordion from '@radix-ui/react-accordion';
import React from 'react';

export const NavAdminWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const params = usePathname();
  const segments = params.split('/').filter(item => item);

  return (
    <Accordion.Root
      defaultValue={[`${segments[1]}_${segments[2]}`]}
      type="multiple"
    >
      {children}
    </Accordion.Root>
  );
};

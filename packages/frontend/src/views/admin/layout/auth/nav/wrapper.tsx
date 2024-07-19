'use client';

import * as Accordion from '@radix-ui/react-accordion';
import { useSelectedLayoutSegments } from 'next/navigation';
import React from 'react';

export const NavAdminWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const layoutSegments = useSelectedLayoutSegments();

  return (
    <Accordion.Root
      type="multiple"
      defaultValue={[`${layoutSegments[0]}_${layoutSegments[1]}`]}
    >
      {children}
    </Accordion.Root>
  );
};

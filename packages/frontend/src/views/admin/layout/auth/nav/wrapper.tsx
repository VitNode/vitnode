'use client';

import * as Accordion from '@radix-ui/react-accordion';
import { useSelectedLayoutSegments } from 'next/navigation';
import * as React from 'react';

interface Props {
  children: React.ReactNode;
}

export const NavAdminWrapper = ({ children }: Props) => {
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

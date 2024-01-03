import React from 'react';
import { withRef } from '@udecode/cn';
import { PlateElement, useElement } from '@udecode/plate-common';
import { type TLinkElement, useLink } from '@udecode/plate-link';

export const LinkElement = withRef<typeof PlateElement>(({ children, ...props }, ref) => {
  const element = useElement<TLinkElement>();
  const { props: linkProps } = useLink({ element });

  return (
    <PlateElement ref={ref} asChild {...(linkProps as object)} {...props}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a>{children}</a>
    </PlateElement>
  );
});

import { forwardRef, type AnchorHTMLAttributes } from 'react';

import { Link } from '@/i18n';

interface Props extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'children'> {
  user: {
    id: string;
    name: string;
  };
}

export const UserLink = forwardRef<HTMLAnchorElement, Props>(
  ({ user: { id, name }, ...props }, ref) => {
    return (
      <Link href={`/profile/${id}`} ref={ref} {...props}>
        {name}
      </Link>
    );
  }
);

UserLink.displayName = 'UserLink';

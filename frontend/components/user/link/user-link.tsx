import { forwardRef, type AnchorHTMLAttributes } from 'react';

import { Link } from '@/i18n';
import type { User } from '@/graphql/hooks';

interface Props extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'children'> {
  user: Pick<User, 'name' | 'name_seo'>;
}

export const UserLink = forwardRef<HTMLAnchorElement, Props>(
  ({ user: { name_seo, name }, ...props }, ref) => {
    return (
      <Link href={`/profile/${name_seo}`} ref={ref} {...props}>
        {name}
      </Link>
    );
  }
);

UserLink.displayName = 'UserLink';

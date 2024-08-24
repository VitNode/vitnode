import { User } from '@/graphql/types';
import React from 'react';

import { Link } from '../../../navigation';

interface Props
  extends Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    'children' | 'href'
  > {
  user: Pick<User, 'name' | 'name_seo'>;
}

export const UserLink = ({ user: { name, name_seo }, ...props }: Props) => {
  return (
    <Link className="font-medium" href={`/profile/${name_seo}`} {...props}>
      {name}
    </Link>
  );
};

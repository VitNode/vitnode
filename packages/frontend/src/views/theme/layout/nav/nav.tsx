import { getSessionData } from '@/graphql/get-session-data';
import { cn } from '@/helpers/classnames';

import { ItemNav } from './item';
import { NavWrapper } from './wrapper';

export const Nav = async ({ className }: { className?: string }) => {
  const data = await getSessionData();

  return (
    <NavWrapper>
      <nav className={cn('hidden gap-2 sm:flex', className)}>
        {data.core_nav__show.edges.map(nav => {
          return <ItemNav key={nav.id} {...nav} />;
        })}
      </nav>
    </NavWrapper>
  );
};

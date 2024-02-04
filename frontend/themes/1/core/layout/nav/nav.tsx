'use client';

import { useSession } from '@/hooks/core/use-session';
import { ItemNav } from './item';

export const Nav = () => {
  const { nav } = useSession();

  return (
    <nav
      className="flex-1 overflow-x-auto sm:flex hidden h-full items-center px-1"
      style={{ scrollbarWidth: 'none' }}
    >
      <ul className="flex gap-2">
        {nav.map((data, i) => (
          <ItemNav key={i} {...data} />
        ))}
      </ul>
    </nav>
  );
};

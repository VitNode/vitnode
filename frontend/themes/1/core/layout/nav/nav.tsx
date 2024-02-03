'use client';

import { useSession } from '@/hooks/core/use-session';
import { ItemNav } from './item';

export const Nav = () => {
  const { nav } = useSession();
  // const [rootRef, { width: rootWidth }] = useMeasure<HTMLDivElement>();
  // const [ref, { width }] = useMeasure<HTMLDivElement>();

  // console.log({ rootWidth, width });

  return (
    <nav
      className="flex-1 overflow-x-auto sm:flex hidden h-full items-center px-1"
      style={{ scrollbarWidth: 'none' }}
    >
      <ul className="flex">
        {nav.map((data, i) => (
          <ItemNav key={i} {...data} />
        ))}
      </ul>
    </nav>
  );
};

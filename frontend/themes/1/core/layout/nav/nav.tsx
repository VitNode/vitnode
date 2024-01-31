'use client';

import { ItemNav } from './item';

export const Nav = () => {
  // const [rootRef, { width: rootWidth }] = useMeasure<HTMLDivElement>();
  // const [ref, { width }] = useMeasure<HTMLDivElement>();

  // console.log({ rootWidth, width });

  return (
    <nav
      className="flex-1 overflow-x-auto sm:flex hidden h-full items-center px-1"
      style={{ scrollbarWidth: 'none' }}
    >
      <ul className="flex">
        {[...Array(16)].map((_, i) => (
          <ItemNav key={i} />
        ))}
      </ul>
    </nav>
  );
};

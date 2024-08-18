import React from 'react';

interface Args {
  openChild: number | null;
  setOpenChild: React.Dispatch<React.SetStateAction<number | null>>;
}

export const NavContext = React.createContext<Args>({
  openChild: null,
  setOpenChild: () => {},
});

export const useNav = () => React.useContext(NavContext);

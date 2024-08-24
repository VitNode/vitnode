import React from 'react';

interface Args {
  openChild: null | number;
  setOpenChild: React.Dispatch<React.SetStateAction<null | number>>;
}

export const NavContext = React.createContext<Args>({
  openChild: null,
  setOpenChild: () => {},
});

export const useNav = () => React.useContext(NavContext);

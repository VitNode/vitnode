import { createContext, useContext } from 'react';

interface Args {
  id: string;
  title: string;
}

export const FilterToolbarDataTableContext = createContext<Args>({
  id: '',
  title: ''
});

export const useFilterToolbarDataTable = () => useContext(FilterToolbarDataTableContext);

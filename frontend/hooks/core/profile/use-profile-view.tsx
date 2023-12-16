'use client';

import { ReactNode, createContext, useContext } from 'react';

import { useProfileAPI } from './use-profile-api';
import { ShowCoreMembers } from '@/graphql/hooks';

interface ContextArgs {
  data: ShowCoreMembers | undefined;
  isError: boolean;
  isLoading: boolean;
}

export const Context = createContext<ContextArgs>({
  isLoading: false,
  isError: false,
  data: undefined
});

interface Props {
  children: ReactNode;
}

export const useProfileView = () => useContext(Context);

export const DataWrapperProfileView = ({ children }: Props) => {
  const { data, isError, isLoading } = useProfileAPI();

  return <Context.Provider value={{ isLoading, data, isError }}>{children}</Context.Provider>;
};

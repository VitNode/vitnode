import React from 'react';
import { ShowMiddlewareObj } from 'vitnode-shared/middleware.dto';

export const MiddlewareContext = React.createContext<
  object | ShowMiddlewareObj
>({});

export const useMiddlewareData = () => {
  const hook = React.useContext(MiddlewareContext);

  if (!hook) {
    throw new Error(
      'useMiddlewareData must be used within a RootProviders componen!',
    );
  }

  return hook;
};

"use client";

import { type ReactNode } from "react";

import { WrapperPostsContext } from "./use-wrapper-posts";

interface Props {
  children: ReactNode;
}

export const WrapperPosts = ({ children }: Props): JSX.Element => {
  return (
    <WrapperPostsContext.Provider value={{}}>
      {children}
    </WrapperPostsContext.Provider>
  );
};

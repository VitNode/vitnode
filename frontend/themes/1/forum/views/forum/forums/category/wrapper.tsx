"use client";

import { useState, type ReactNode, useEffect } from "react";

import { WrapperCategoryForumContext } from "@/hooks/forum/forum/use-wrapper-category-forum";

interface Props {
  children: ReactNode;
  id: number;
}

export const LOCAL_STORAGE_KEY = "forum:category-accordion";

export const WrapperCategoryForum = ({ children, id }: Props): JSX.Element => {
  const [open, setOpen] = useState(true);

  useEffect((): void => {
    const ids = localStorage.getItem(LOCAL_STORAGE_KEY)?.split(",");

    if (ids?.includes(id.toString())) {
      setOpen(false);
    }
  }, []);

  return (
    <WrapperCategoryForumContext.Provider value={{ open, setOpen }}>
      {children}
    </WrapperCategoryForumContext.Provider>
  );
};

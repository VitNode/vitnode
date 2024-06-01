"use client";

import * as React from "react";

import { WrapperCategoryForumContext } from "@/plugins/forum/hooks/forum/use-wrapper-category-forum";

interface Props {
  children: React.ReactNode;
  id: number;
}

export const LOCAL_STORAGE_KEY = "forum:category-accordion";

export const WrapperCategoryForum = ({ children, id }: Props) => {
  const [open, setOpen] = React.useState(true);

  React.useEffect(() => {
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

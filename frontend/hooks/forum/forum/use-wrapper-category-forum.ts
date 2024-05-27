import * as React from "react";

interface Args {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const WrapperCategoryForumContext = React.createContext<Args>({
  open: true,
  setOpen: () => {}
});

export const useWrapperCategoryForum = () =>
  React.useContext(WrapperCategoryForumContext);

import { createContext, useContext, Dispatch, SetStateAction } from "react";

interface Args {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const WrapperCategoryForumContext = createContext<Args>({
  open: true,
  setOpen: () => {}
});

export const useWrapperCategoryForum = () =>
  useContext(WrapperCategoryForumContext);

import {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction
} from "react";

interface Args {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const WrapperCategoryForumContext = createContext<Args>({
  open: true,
  setOpen: (): void => {}
});

export const useWrapperCategoryForum = (): Args =>
  useContext(WrapperCategoryForumContext);

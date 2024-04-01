import { createContext, useContext } from "react";

interface Args {}

export const WrapperPostsContext = createContext<Args>({});

export const useWrapperPosts = (): Args => useContext(WrapperPostsContext);

"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { type ReactNode } from "react";

interface Props {
  children: ReactNode;
  forums: { id: number }[];
}

export const WrapperForumsForum = ({ children, forums }: Props) => {
  return (
    <Accordion.Root
      type="multiple"
      defaultValue={forums.map(forum => `${forum.id}`)}
    >
      {children}
    </Accordion.Root>
  );
};

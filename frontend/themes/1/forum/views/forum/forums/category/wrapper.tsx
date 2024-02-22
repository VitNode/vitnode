"use client";

import * as Accordion from "@radix-ui/react-accordion";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  id: number;
}

export const WrapperCategoryForum = ({ children, id }: Props) => {
  return <Accordion.Item value={`${id}`}>{children}</Accordion.Item>;
};

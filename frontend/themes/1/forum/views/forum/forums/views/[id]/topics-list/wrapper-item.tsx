/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
"use client";

import type { ReactNode } from "react";

import { useRouter } from "@/i18n";

interface Props {
  children: ReactNode;
  href: string;
}

export const WrapperItemTopicListForum = ({ children, href }: Props) => {
  const { push } = useRouter();

  return (
    <div
      onClick={() => push(href)}
      className="px-6 py-4 hover:bg-muted/50 cursor-pointer"
    >
      {children}
    </div>
  );
};

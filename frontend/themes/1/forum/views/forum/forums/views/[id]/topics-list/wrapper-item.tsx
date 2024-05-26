/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
"use client";

import { ReactNode } from "react";

import { useRouter } from "@/utils/i18n";

interface Props {
  children: ReactNode;
  href: string;
  className?: string;
}

export const WrapperItemTopicListForum = ({
  children,
  className,
  href
}: Props) => {
  const { push } = useRouter();

  return (
    <div onClick={() => push(href)} className={className}>
      {children}
    </div>
  );
};

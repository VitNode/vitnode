/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
"use client";

import type { ReactNode } from "react";

import { useRouter } from "@/i18n";

interface Props {
  children: ReactNode;
  href: string;
  className?: string;
}

export const WrapperLastPostItemForum = ({
  children,
  className,
  href
}: Props): JSX.Element => {
  const { push } = useRouter();

  return (
    <div
      onClick={(e): void => {
        e.stopPropagation();
        push(href);
      }}
      className={className}
    >
      {children}
    </div>
  );
};

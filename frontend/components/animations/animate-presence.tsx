"use client";

import { AnimatePresence, AnimatePresenceProps } from "framer-motion";
import { ReactNode } from "react";

interface Props extends AnimatePresenceProps {
  children: ReactNode;
}

export const AnimatePresenceClient = ({ children, ...props }: Props) => {
  return <AnimatePresence {...props}>{children}</AnimatePresence>;
};

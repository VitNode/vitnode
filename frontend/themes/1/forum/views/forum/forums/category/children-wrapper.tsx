"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";

import { useWrapperCategoryForum } from "@/hooks/forum/forum/use-wrapper-category-forum";

interface Props {
  children: ReactNode;
}

export const ChildrenWrapperCategoryForum = ({
  children
}: Props): JSX.Element => {
  const { open } = useWrapperCategoryForum();

  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          initial="collapsed"
          animate="open"
          exit="collapsed"
          className="overflow-hidden"
          variants={{
            open: { opacity: 1, height: "auto" },
            collapsed: { opacity: 0, height: 0 }
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

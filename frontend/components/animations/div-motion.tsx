"use client";

import { forwardRef, type ReactNode } from "react";
import { motion, type AnimationProps, type LayoutProps } from "framer-motion";

interface Props extends AnimationProps, LayoutProps {
  children?: ReactNode;
  className?: string;
}

const DivMotion = forwardRef<HTMLDivElement, Props>((props, ref) => {
  return <motion.div ref={ref} {...props} />;
});
DivMotion.displayName = "DivMotion";

const LiMotion = forwardRef<HTMLLIElement, Props>((props, ref) => {
  return <motion.li ref={ref} {...props} />;
});

LiMotion.displayName = "LiMotion";

export { DivMotion, LiMotion };

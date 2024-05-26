"use client";

import { ReactNode } from "react";
import { motion, AnimationProps, LayoutProps } from "framer-motion";

interface Props extends AnimationProps, LayoutProps {
  children?: ReactNode;
  className?: string;
}

const DivMotion = (props: Props) => {
  return <motion.div {...props} />;
};

const LiMotion = (props: Props) => {
  return <motion.li {...props} />;
};

export { DivMotion, LiMotion };

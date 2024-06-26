'use client';

import { AnimatePresence, AnimatePresenceProps } from 'framer-motion';
import * as React from 'react';

interface Props extends AnimatePresenceProps {
  children: React.ReactNode;
}

export const AnimatePresenceClient = ({ children, ...props }: Props) => {
  return <AnimatePresence {...props}>{children}</AnimatePresence>;
};

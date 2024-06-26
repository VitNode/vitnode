"use client";

import { useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

import { Card } from "@/components/ui/card";

interface Props {
  children: ReactNode;
  animateFromRight?: boolean;
}

export const WrapperSection = ({ animateFromRight, children }: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true
  });

  return (
    <Card
      ref={ref}
      style={{
        transform: isInView
          ? "none"
          : `translateX(${animateFromRight ? "200" : "-200"}px)`,
        opacity: isInView ? 1 : 0,
        transition: "all 1s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
      }}
    >
      {children}
    </Card>
  );
};

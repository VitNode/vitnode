"use client";

import { motion } from "framer-motion";

export const ImgThemesSectionTabsHome = () => {
  return (
    <div className="flex-1">
      <motion.div
        className="size-5 bg-primary"
        animate={{
          scale: [1, 2, 2, 1, 1],
          rotate: [0, 0, 180, 180, 0],
          borderRadius: ["0%", "0%", "50%", "50%", "0%"]
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1],
          repeat: Infinity,
          repeatDelay: 1
        }}
      />
    </div>
  );
};

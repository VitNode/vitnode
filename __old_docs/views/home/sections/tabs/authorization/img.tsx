"use client";

import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { useRef, useState } from "react";

const TARGET_TEXT = "Encrypt data";
const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 50;

const CHARS = "!@#$%^&*():{};|,.<>/?";

export const ImgAuthorizationSectionTabsHome = () => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [text, setText] = useState(TARGET_TEXT);

  const stopScramble = (): void => {
    clearInterval(intervalRef.current || undefined);

    setText(TARGET_TEXT);
  };

  const scramble = (): void => {
    let pos = 0;

    intervalRef.current = setInterval((): void => {
      const scrambled = TARGET_TEXT.split("")
        .map((char, index): string => {
          if (pos / CYCLES_PER_LETTER > index) {
            return char;
          }

          const randomCharIndex = Math.floor(Math.random() * CHARS.length);
          const randomChar = CHARS[randomCharIndex];

          return randomChar;
        })
        .join("");

      setText(scrambled);
      pos++;

      if (pos >= TARGET_TEXT.length * CYCLES_PER_LETTER) {
        stopScramble();
      }
    }, SHUFFLE_TIME);
  };

  return (
    <div
      className="flex-1 flex items-center justify-center"
      onMouseEnter={scramble}
      onMouseLeave={stopScramble}
    >
      <motion.div className="group relative overflow-hidden flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 sm:text-xs text-sm shadow-sm transition-colors max-w-xs sm:scale-125">
        <div className="relative z-10 flex items-center gap-2">
          <Lock className="size-3" />
          <span>{text}</span>
        </div>
        <motion.span
          initial={{
            y: "100%"
          }}
          animate={{
            y: "-100%"
          }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            duration: 2,
            ease: "linear"
          }}
          className="duration-200 absolute inset-0 z-0 scale-125 bg-gradient-to-t from-primary/0 from-40% via-primary/100 to-primary/0 to-60% transition-opacity opacity-100"
        />
      </motion.div>
    </div>
  );
};

"use client";

import { Globe } from "lucide-react";
import type { CSSProperties } from "react";
import { motion } from "framer-motion";

import { PolandFlag } from "./flags/poland";
import { USAFlag } from "./flags/usa";

export const ImgLanguageSectionTabsHome = () => {
  return (
    <div
      className="w-full flex-1 h-64 relative select-none flex gap-2 sm:gap-8 items-center max-w-[680px] sm:flex-row flex-col self-center"
      style={
        {
          "--max-window-width": "210px",
          "--globe-size": "40px",
          "--gap": "2rem"
        } as CSSProperties
      }
    >
      {/* Arrows */}
      <div
        className="hidden sm:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  w-full
            max-w-[calc(100%_-_var(--max-window-width)_-_(var(--globe-size))_-_8rem)]
            h-[calc(100%_-_var(--flag-height)_-_1rem)]
            min-w-[calc((100%_-_(var(--gap)_*_2)_-_var(--globe-size))_/_2)]
            [&>div]:absolute [&>div]:size-1/2 after:[&>div]:absolute"
        style={
          {
            "--flag-width": "44px",
            "--flag-height": "32px"
          } as CSSProperties
        }
      >
        <div className="bottom-0 border-b-2 border-r-2 border-[#1A47B8] rounded-br-3xl translate-x-[1.2px] after:border-t-[5px] after:border-r-[10px] after:border-b-[5px] after:border-l-0 after:-left-1 after:bottom-0 after:translate-y-[calc(50%_+_1px)] after:border-r-[#1A47B8] after:border-transparent" />
        <div className="right-0 border-t-2 border-l-2 border-[#AF010D] rounded-tl-3xl -translate-x-[1px] after:border-t-[5px] after:border-r-0 after:border-b-[5px] after:border-l-[10px] after:-right-1 after:top-0 after:translate-y-[calc(-50%_-_1px)] after:border-l-[#AF010D] after:border-transparent" />
      </div>

      <div className="flex flex-1 flex-row sm:flex-col items-start sm:items-center h-full gap-5 justify-between">
        <motion.div
          animate={{ y: [0, -8, 0], x: [0, -5, 0] }}
          transition={{
            times: [0, 1],
            duration: 3,
            repeat: Infinity,
            type: "keyframes",
            ease: "easeInOut"
          }}
          className="max-w-[var(--max-window-width)] border p-3 rounded-md w-full bg-background will-change-transform"
        >
          <div className="flex gap-1 [&>div]:size-2 [&>div]:bg-muted-foreground/50 [&>div]:rounded-full mb-3">
            <div />
            <div />
            <div />
          </div>

          <div className="items-center flex w-full rounded-md border border-input justify-center bg-card p-5 text-sm shadow-sm transition-colors text-center leading-5 text-muted-foreground capitalize">
            Full steam ahead!
          </div>
        </motion.div>

        <div className="p-2 border rounded-md w-fit mt-5 sm:mt-0 bg-background">
          <USAFlag />
        </div>
      </div>

      <div className="hidden sm:flex self-center items-center justify-center size-[var(--globe-size)] bg-primary rounded-md text-white relative z-10">
        <Globe className="size-4.5" />
      </div>

      <div className="flex flex-1 flex-row sm:flex-col -mt-8 sm:mt-0 items-end sm:items-center h-full gap-5 justify-between">
        <div className="p-2 border rounded-md w-fit mb-5 sm:mb-0 bg-background">
          <PolandFlag />
        </div>

        <motion.div
          animate={{ y: [0, 8, 0], x: [0, 5, 0] }}
          transition={{
            times: [0, 1],
            duration: 3,
            repeat: Infinity,
            type: "keyframes",
            ease: "easeInOut"
          }}
          className="max-w-[var(--max-window-width)] border p-3 rounded-md w-full bg-background will-change-transform"
        >
          <div className="flex gap-1 [&>div]:size-2 [&>div]:bg-muted-foreground/50 [&>div]:rounded-full mb-3">
            <div />
            <div />
            <div />
          </div>

          <div className="items-center flex w-full rounded-md border border-input justify-center bg-card p-5 text-sm shadow-sm transition-colors text-center leading-5 text-muted-foreground capitalize">
            Cała naprzód!
          </div>
        </motion.div>
      </div>
    </div>
  );
};

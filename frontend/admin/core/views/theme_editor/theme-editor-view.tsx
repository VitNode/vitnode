"use client";

import { Monitor, Smartphone, Tablet } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { CONFIG } from "@/config";
import { cn } from "@/functions/classnames";

export const ThemeEditorView = () => {
  const [activeMode, setActiveMode] = useState<"desktop" | "tablet" | "mobile">(
    "desktop"
  );

  return (
    <>
      <div className="flex-1 flex items-center justify-center">
        <iframe
          title={CONFIG.frontend_url}
          className={cn("border bg-background rounded-md transition-all", {
            "w-full h-full": activeMode === "desktop",
            "w-[768px] h-5/6": activeMode === "tablet",
            "w-[375px] h-5/6": activeMode === "mobile"
          })}
          src={CONFIG.frontend_url}
        />
      </div>

      <div className="w-80 flex-shrink-0 shadow-lg border-l flex">
        <div className="p-1 border-r flex flex-col gap-1">
          <Button
            size="icon"
            ariaLabel="test"
            variant="ghost"
            onClick={() => setActiveMode("desktop")}
          >
            <Monitor />
          </Button>
          <Button
            size="icon"
            ariaLabel="test"
            variant="ghost"
            onClick={() => setActiveMode("tablet")}
          >
            <Tablet />
          </Button>
          <Button
            size="icon"
            ariaLabel="test"
            variant="ghost"
            onClick={() => setActiveMode("mobile")}
          >
            <Smartphone />
          </Button>
        </div>
      </div>
    </>
  );
};

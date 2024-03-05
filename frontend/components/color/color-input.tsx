"use client";

import { forwardRef, useEffect, useState } from "react";
import type { HslColor } from "react-colorful";
import { useTranslations } from "next-intl";
import { X } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { PickerColor } from "./picker/picker";
import { Button } from "../ui/button";
import { cn } from "@/functions/classnames";
import { getHSLFromString } from "@/functions/colors";

interface Props {
  onChange: (value: string) => void;
  value: string;
  disableRemoveColor?: boolean;
  disabled?: boolean;
}

export const ColorInput = forwardRef<HTMLButtonElement, Props>(
  ({ disableRemoveColor, disabled, onChange, value }, ref) => {
    const t = useTranslations("core.colors");
    const [color, setColor] = useState<HslColor | null>(
      getHSLFromString(value)
    );

    // Set color from value
    useEffect(() => {
      onChange(color ? `hsl(${color.h}, ${color.s}%, ${color.l}%)` : "");
    }, [color]);

    const isColorBrightness = color && color.l > 55;

    return (
      <Popover>
        <div className="flex gap-2">
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn("justify-start flex-1", {
                "text-black": color && isColorBrightness,
                "text-white": color && !isColorBrightness
              })}
              style={{
                backgroundColor: color
                  ? `hsl(${color.h}, ${color.s}%, ${color.l}%)`
                  : ""
              }}
              disabled={disabled}
              ref={ref}
            >
              <span
                className={cn({
                  "text-muted-foreground": !color
                })}
              >
                {color
                  ? `hsl(${color.h}, ${color.s}%, ${color.l}%)`
                  : t("none")}
              </span>
            </Button>
          </PopoverTrigger>
          {color !== null && !disableRemoveColor && (
            <Button
              className="shrink-0"
              size="icon"
              ariaLabel={t("remove")}
              variant="destructiveGhost"
              onClick={() => setColor(null)}
            >
              <X />
            </Button>
          )}
        </div>

        {!disabled && (
          <PopoverContent align="start" className="w-auto">
            <PickerColor color={color} setColor={setColor} />
          </PopoverContent>
        )}
      </Popover>
    );
  }
);

ColorInput.displayName = "ColorInput";

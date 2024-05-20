"use client";

import { forwardRef, useEffect, useState } from "react";
import type { HslColor } from "react-colorful";
import { useTranslations } from "next-intl";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { PickerColor } from "./picker/picker";
import { Button } from "../ui/button";
import { cn } from "@/functions/classnames";
import { getHSLFromString, isColorBrightness } from "@/functions/colors";

interface Props {
  onChange: (value: string) => void;
  value: string;
  disableRemoveColor?: boolean;
  disabled?: boolean;
}

export const ColorInput = forwardRef<HTMLButtonElement, Props>(
  ({ disableRemoveColor, disabled, onChange, value }, ref) => {
    const t = useTranslations("core.colors");
    const [open, setOpen] = useState(false);
    const [color, setColor] = useState<HslColor | null>(
      getHSLFromString(value)
    );

    // Set color from value
    useEffect(() => {
      onChange(color ? `hsl(${color.h}, ${color.s}%, ${color.l}%)` : "");
    }, [color]);

    const colorBrightness = color ? isColorBrightness(color) : false;

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <div className="flex gap-2">
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn("justify-start flex-1 max-w-52", {
                "text-black": color && colorBrightness,
                "text-white": color && !colorBrightness
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
        </div>

        {!disabled && (
          <PopoverContent align="start" className="w-auto">
            <PickerColor
              color={color}
              setColor={setColor}
              disableRemoveColor={disableRemoveColor}
            />
          </PopoverContent>
        )}
      </Popover>
    );
  }
);

ColorInput.displayName = "ColorInput";

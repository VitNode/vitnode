"use client";

import * as React from "react";
import { HslColorPicker, HslColor } from "react-colorful";
import { RemoveFormatting } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  checkColorType,
  convertColor,
  isColorBrightness,
} from "@vitnode/shared";

import { Input } from "./input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import { Button } from "./button";

import { cn } from "../../helpers";

const presetColors: { color: HslColor; name: string }[] = [
  {
    name: "Red",
    color: {
      h: 0,
      s: 80,
      l: 45,
    },
  },
  {
    name: "Orange",
    color: {
      h: 30,
      s: 80,
      l: 45,
    },
  },
  {
    name: "Yellow",
    color: {
      h: 60,
      s: 80,
      l: 45,
    },
  },
  {
    name: "Lime",
    color: {
      h: 150,
      s: 80,
      l: 45,
    },
  },
  {
    name: "Green",
    color: {
      h: 150,
      s: 80,
      l: 45,
    },
  },
  {
    name: "Teal",
    color: {
      h: 180,
      s: 80,
      l: 45,
    },
  },
  {
    name: "Cyan",
    color: {
      h: 210,
      s: 80,
      l: 45,
    },
  },
  {
    name: "Blue",
    color: {
      h: 240,
      s: 80,
      l: 45,
    },
  },
  {
    name: "Indigo",
    color: {
      h: 270,
      s: 80,
      l: 45,
    },
  },
  {
    name: "Purple",
    color: {
      h: 300,
      s: 80,
      l: 45,
    },
  },
  {
    name: "Magenta",
    color: {
      h: 330,
      s: 80,
      l: 45,
    },
  },
  {
    name: "Primary",
    color: {
      h: 221.2,
      s: 83.2,
      l: 53.3,
    },
  },
];

interface Props {
  color: HslColor | null;
  setColor: (color: HslColor | null) => void;
  disableRemoveColor?: boolean;
}

export const PickerColor = ({ color, disableRemoveColor, setColor }: Props) => {
  const t = useTranslations("core.colors");
  const [internalColor, setInternalColor] = React.useState<HslColor | null>(
    color,
  );
  const inputRef = React.useRef<HTMLInputElement>(null);
  const colorBrightness = internalColor
    ? isColorBrightness(internalColor)
    : false;

  const handleInput = (value: string) => {
    const input = value.trim();
    const type = checkColorType(input);

    if (type === "hex") {
      const hsl = convertColor.hexToHSL(input);
      if (!hsl) return;
      setColor(hsl);
      setInternalColor(hsl);
    } else if (type === "rgb") {
      const [r, g, b] = input.includes(",")
        ? input
            .replaceAll("rgb(", "")
            .replaceAll(")", "")
            .split(",")
            .map(Number)
        : input
            .replaceAll("rgb(", "")
            .replaceAll(")", "")
            .split(" ")
            .map(Number);

      const { h, l, s } = convertColor.RGBToHSL(r, g, b);
      setColor({ h, s, l });
      setInternalColor({ h, s, l });
    } else if (type === "hsl") {
      const [h, s, l] = input
        .replaceAll("hsl(", "")
        .replaceAll(")", "")
        .replaceAll("%", "")
        .split(",")
        .map(Number);

      setColor({ h, s, l });
      setInternalColor({ h, s, l });
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <HslColorPicker
        color={
          internalColor ?? {
            h: 0,
            s: 0,
            l: 0,
          }
        }
        onChange={color => {
          handleInput(`hsl(${color.h}, ${color.s}%, ${color.l}%)`);

          // Change value of input
          if (!inputRef.current) return;
          inputRef.current.value = `hsl(${color.h}, ${color.s}%, ${color.l}%)`;
        }}
      />

      <div className="space-y-2">
        <div className="flex w-[200px] gap-2">
          <Input
            type="text"
            className={cn("h-9", {
              "text-black": internalColor && colorBrightness,
              "text-white": internalColor && !colorBrightness,
            })}
            ref={inputRef}
            defaultValue={
              internalColor
                ? `hsl(${internalColor.h}, ${internalColor.s}%, ${internalColor.l}%)`
                : "hs(0, 0%, 0%)"
            }
            style={{
              backgroundColor: internalColor
                ? `hsl(${internalColor.h}, ${internalColor.s}%, ${internalColor.l}%)`
                : "",
            }}
            onChange={e => handleInput(e.target.value)}
          />

          {!disableRemoveColor && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    className="shrink-0"
                    ariaLabel={t("remove")}
                    variant="ghost"
                    onClick={() => {
                      setColor(null);
                      setInternalColor(null);

                      // Change value of input
                      if (!inputRef.current) return;
                      inputRef.current.value = "hsl(0, 0%, 0%)";
                    }}
                  >
                    <RemoveFormatting />
                  </Button>
                </TooltipTrigger>

                <TooltipContent>{t("remove")}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>

        <div className="grid grid-cols-6 grid-rows-2 gap-1">
          {presetColors.map(({ color, name }) => (
            <button
              key={name}
              className="size-7 rounded-sm border"
              style={{
                backgroundColor: `hsl(${color.h}, ${color.s}%, ${color.l}%)`,
              }}
              onClick={() => {
                setColor(color);
                setInternalColor(color);

                // Change value of input
                if (!inputRef.current) return;
                inputRef.current.value = `hsl(${color.h}, ${color.s}%, ${color.l}%)`;
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

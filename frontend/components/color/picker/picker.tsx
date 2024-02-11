/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useRef, type ChangeEvent } from "react";
import { HslColorPicker, type HslColor } from "react-colorful";

import { checkColorType, colorConverter } from "@/functions/colors";
import { Input } from "@/components/ui/input";

interface Props {
  color: HslColor | null;
  setColor: (color: HslColor | null) => void;
}

export const PickerColor = ({ color, setColor }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.trim();
    const type = checkColorType(input);

    if (type === "hex") {
      const hsl = colorConverter.hexToHSL(input);
      if (!hsl) return;
      setColor(hsl);
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

      const { h, l, s } = colorConverter.RGBToHSL(r, g, b);
      setColor({ h, s, l });
    } else if (type === "hsl") {
      const [h, s, l] = input
        .replaceAll("hsl(", "")
        .replaceAll(")", "")
        .replaceAll("%", "")
        .split(",")
        .map(Number);

      setColor({ h, s, l });
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <HslColorPicker
        color={
          color ?? {
            h: 0,
            s: 0,
            l: 0
          }
        }
        onChange={color => {
          setColor(color);

          if (!inputRef.current) return;
          inputRef.current.value = `hsl(${color.h}, ${color.s}%, ${color.l}%)`;
        }}
      />

      <div className="w-52 flex gap-2">
        <Input
          type="text"
          className="h-9"
          ref={inputRef}
          defaultValue={
            color
              ? `hsl(${color.h}, ${color.s}%, ${color.l}%)`
              : "hs(0, 0%, 0%)"
          }
          onChange={handleInput}
        />

        <div
          className="size-9 bg-black shrink-0 rounded-md border"
          style={{
            backgroundColor: color
              ? `hsl(${color.h}, ${color.s}%, ${color.l}%)`
              : ""
          }}
        />
      </div>
    </div>
  );
};

/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useRef, type MouseEvent } from "react";

import { colorConverter } from "@/functions/colors";
import type { ColorInputProps } from "../color-input";
import { Input } from "@/components/ui/input";

interface HSL {
  hue: number;
  lightness: number;
  saturation: number;
}

const MAX_HUE = 360;

export const ColorPicker = ({ onChange }: ColorInputProps) => {
  const hueRef = useRef<HTMLDivElement>(null);
  const hueSelectorRef = useRef<HTMLDivElement>(null);
  const saturationRef = useRef<HTMLDivElement>(null);
  const saturationSelectorRef = useRef<HTMLDivElement>(null);
  const isDown = useRef<boolean>(false);
  const optionActive = useRef<"saturation" | "hue" | undefined>(undefined);
  const mousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const inputRef = useRef<HTMLInputElement>(null);
  const hslColor = useRef<HSL>({
    hue: 0,
    saturation: 0,
    lightness: 0
  });

  const calculateHslFromCoordinates = (x: number, y: number) => {
    hslColor.current.saturation = x;
    hslColor.current.lightness = (50 * (1 - x / 100) + 50) * (1 - y / 100);
  };

  const handleHueCursorPosition = (
    e: MouseEvent<HTMLDivElement> | MouseEvent
  ): void => {
    if (
      !hueRef.current ||
      !hueSelectorRef.current ||
      !saturationRef.current ||
      !inputRef.current
    )
      return;

    const hueRect = hueRef.current.getBoundingClientRect();
    const hueWidth =
      hueRef.current.offsetWidth - hueSelectorRef.current.offsetWidth;
    const mousePositionX = e.clientX - hueRect.left;

    mousePosition.current = {
      x:
        mousePositionX >= 0 && mousePositionX <= hueWidth
          ? mousePositionX
          : mousePositionX > hueWidth
            ? hueWidth
            : 0,
      y: 0
    };

    hueSelectorRef.current.style.left = mousePosition.current.x + "px";
    const hue = (mousePosition.current.x / hueWidth) * MAX_HUE;
    hslColor.current.hue = hue;
    saturationRef.current.style.background = `hsl(${hue},${100}%,${50}%)`;

    const hex = colorConverter.hslToHex(
      hslColor.current.hue,
      hslColor.current.saturation,
      hslColor.current.lightness
    );

    const hsl = colorConverter.hexToHSL(hex);
    if (!hsl) return;
    inputRef.current.value = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
  };

  const handleSaturationCursorPosition = (
    e: MouseEvent<HTMLDivElement> | MouseEvent
  ): void => {
    if (
      !saturationRef.current ||
      !saturationSelectorRef.current ||
      !inputRef.current
    )
      return;

    const saturationRect = saturationRef.current.getBoundingClientRect();
    const [saturationWidth, saturationHeight] = [
      saturationRef.current.offsetWidth,
      saturationRef.current.offsetHeight
    ];
    const [mousePositionX, mousePositionY] = [
      e.clientX - saturationRect.left,
      e.clientY - saturationRect.top
    ];

    mousePosition.current = {
      x:
        mousePositionX >= 0 && mousePositionX <= saturationWidth
          ? mousePositionX
          : mousePositionX > saturationWidth
            ? saturationWidth
            : 0,
      y:
        mousePositionY >= 0 && mousePositionY <= saturationHeight
          ? mousePositionY
          : mousePositionY > saturationHeight
            ? saturationHeight
            : 0
    };

    saturationSelectorRef.current.style.top = mousePosition.current.y + "px";
    saturationSelectorRef.current.style.left = mousePosition.current.x + "px";

    calculateHslFromCoordinates(
      (mousePosition.current.x * 100) / saturationWidth,
      (mousePosition.current.y * 100) / saturationHeight
    );

    const hex = colorConverter.hslToHex(
      hslColor.current.hue,
      hslColor.current.saturation,
      hslColor.current.lightness
    );

    const hsl = colorConverter.hexToHSL(hex);
    if (!hsl) return;
    inputRef.current.value = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
  };

  const handleMouseMove = (e: MouseEvent): void => {
    e.preventDefault();

    if (isDown.current) {
      if (optionActive.current === "saturation") {
        handleSaturationCursorPosition(e);
      } else if (optionActive.current === "hue") {
        handleHueCursorPosition(e);
      }
    }
  };

  const handleMouseUp = (): void => {
    isDown.current = false;

    window.removeEventListener("mouseup", handleMouseUp);
    window.removeEventListener(
      "mousemove",
      handleMouseMove as unknown as EventListener
    );

    optionActive.current = undefined;
    const hex = colorConverter.hslToHex(
      hslColor.current.hue,
      hslColor.current.saturation,
      hslColor.current.lightness
    );

    const hsl = colorConverter.hexToHSL(hex);
    if (!hsl) return;
    onChange(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`);
  };

  const handleMouseDown = ({
    event,
    option
  }: {
    event: MouseEvent<HTMLDivElement> | MouseEvent;
    option: "saturation" | "hue";
  }) => {
    isDown.current = true;
    optionActive.current = option;

    if (optionActive.current === "saturation") {
      handleSaturationCursorPosition(event);
    } else if (optionActive.current === "hue") {
      handleHueCursorPosition(event);
    }

    window.addEventListener(
      "mousemove",
      handleMouseMove as unknown as EventListener
    );
    window.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Saturation */}
      <div
        className="size-52 relative border rounded-md overflow-hidden"
        ref={saturationRef}
        onMouseDown={event => handleMouseDown({ event, option: "saturation" })}
        style={{ backgroundColor: "hsl(0, 100%, 50%)" }}
      >
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: "linear-gradient(to right, #fff, rgba(0, 0, 0, 0))"
          }}
        />
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: "linear-gradient(to top, #000, rgba(0, 0, 0, 0))"
          }}
        />
        <span
          ref={saturationSelectorRef}
          className="absolute size-4 top-0 right-0 rounded-full border-2 border-white -translate-x-1/2 -translate-y-1/2 cursor-pointer"
        />
      </div>

      <div className="w-52 flex gap-2">
        <Input
          type="text"
          className="h-9"
          // onChange={handleTextInput}
          // value={value}
          ref={inputRef}
          defaultValue={"#000000"}
        />

        <div
          className="size-9 bg-black shrink-0 rounded-md border"
          style={{
            backgroundColor: inputRef.current?.value
          }}
        />
      </div>

      {/* Hue */}
      <div className="h-4 w-52">
        <div
          ref={hueRef}
          className="h-full rounded-md relative flex items-center"
          style={{
            backgroundImage:
              "linear-gradient(to right, red, yellow, lime, aqua, blue, fuchsia, red"
          }}
          onMouseDown={event => handleMouseDown({ event, option: "hue" })}
        >
          <span
            ref={hueSelectorRef}
            className="absolute w-2 h-6 rounded-md dark:bg-white bg-dark cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

import { forwardRef } from "react";

import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ColorPicker } from "./picker/picker";

export interface ColorInputProps {
  onChange: (value: string) => void;
  value: string;
}

export const ColorInput = forwardRef<HTMLInputElement, ColorInputProps>(
  ({ onChange, value }, ref) => {
    // const handleTextInput = (e: ChangeEvent<HTMLInputElement>) => {
    //   const input = e.target.value;

    //   onChange(input);
    // };

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Input
            type="text"
            // onChange={handleTextInput}
            // value={value}
            ref={ref}
          />
        </PopoverTrigger>

        <PopoverContent align="start" className="w-auto">
          <ColorPicker onChange={onChange} value={value} />
        </PopoverContent>
      </Popover>
    );
  }
);

ColorInput.displayName = "ColorInput";

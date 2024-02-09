import { forwardRef, type ChangeEvent } from "react";

import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ColorPicker } from "./picker/picker";

interface Props {
  onChange: (value: string) => void;
  value: string;
}

export const ColorInput = forwardRef<HTMLInputElement, Props>(
  ({ onChange, value }, ref) => {
    const handleTextInput = (e: ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value;

      onChange(input);
    };

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Input
            type="text"
            onChange={handleTextInput}
            value={value}
            ref={ref}
          />
        </PopoverTrigger>

        <PopoverContent>
          <div>
            <ColorPicker />
          </div>
        </PopoverContent>
      </Popover>
    );
  }
);

ColorInput.displayName = "ColorInput";

import { CalendarIcon } from "lucide-react";
import type { SelectRangeEventHandler } from "react-day-picker";
import { format } from "date-fns";

import { cx } from "../functions/classnames";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";

interface Props {
  onSelect?: SelectRangeEventHandler;
  selected?: {
    from: Date;
    to: Date;
  };
}

export const CalendarPicker = ({ onSelect, selected }: Props) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id="date"
          variant={"outline"}
          className={cx(
            "w-full justify-start text-left font-normal",
            !selected && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selected?.from ? (
            selected?.to ? (
              <>
                {format(selected!.from, "LLL dd, y")} -{" "}
                {format(selected!.to, "LLL dd, y")}
              </>
            ) : (
              format(selected!.from, "LLL dd, y")
            )
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          selected={selected}
          onSelect={onSelect}
          disabled={date => date > new Date() || date < new Date("1900-01-01")}
          initialFocus
          captionLayout="dropdown-buttons"
          mode="range"
        />
      </PopoverContent>
    </Popover>
  );
};

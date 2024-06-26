import { CalendarIcon } from 'lucide-react';
import { SelectRangeEventHandler } from 'react-day-picker';
import { format } from 'date-fns';
import { cn } from 'vitnode-frontend/helpers/classnames';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from 'vitnode-frontend/components/ui/popover';
import { Button } from 'vitnode-frontend/components/ui/button';

// import { Calendar } from "./ui/calendar";

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
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal',
            !selected && 'text-muted-foreground',
          )}
        >
          <CalendarIcon className="mr-2 size-4" />
          {selected?.from ? (
            selected?.to ? (
              <>
                {format(selected.from, 'LLL dd, y')} -{' '}
                {format(selected.to, 'LLL dd, y')}
              </>
            ) : (
              format(selected.from, 'LLL dd, y')
            )
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        {/* <Calendar
          selected={selected}
          onSelect={onSelect}
          disabled={date => date > new Date() || date < new Date("1900-01-01")}
          initialFocus
          captionLayout="dropdown-buttons"
          mode="range"
        /> */}
      </PopoverContent>
    </Popover>
  );
};

import { useState } from 'react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import dynamic from 'next/dynamic';

import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from './ui/command';

type Status = {
  label: string;
  value: string;
};

type Test = keyof typeof dynamicIconImports;
const arrayTest = Object.keys(dynamicIconImports) as Test[];
const statuses: Status[] = arrayTest.map(key => ({
  value: key,
  label: key
}));

export const IconPickerInput = () => {
  const [open, setOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<Status | null>(null);

  const LucideIcon = dynamic(dynamicIconImports['zoom-out']);

  return (
    <Popover modal open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="w-[150px] justify-start">
          {selectedStatus ? (
            <>
              {/* <selectedStatus.icon className="mr-2 h-4 w-4 shrink-0" /> */}
              {selectedStatus.label}
            </>
          ) : (
            <>+ Set status</>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Change status..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {statuses.slice(0, 5).map(status => (
                <CommandItem
                  key={status.value}
                  value={status.value}
                  onSelect={value => {
                    setSelectedStatus(statuses.find(priority => priority.value === value) || null);
                    setOpen(false);
                  }}
                >
                  {/* <status.icon
                    className={cx(
                      'mr-2 h-7 w-7',
                      status.value === selectedStatus?.value ? 'opacity-100' : 'opacity-40'
                    )}
                  /> */}
                  <LucideIcon />
                  <span>{status.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

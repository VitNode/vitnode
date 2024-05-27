"use client";

import * as React from "react";
import { DialogProps } from "@radix-ui/react-dialog";
import { Command as CommandPrimitive } from "cmdk";
import { Search } from "lucide-react";

import { cn } from "@/functions/classnames";
import { Dialog, DialogContent } from "@/components/ui/dialog";
const Command = (
  props: React.ComponentPropsWithoutRef<typeof CommandPrimitive>
) => (
  <CommandPrimitive
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      props.className
    )}
    {...props}
  />
);

interface CommandDialogProps extends DialogProps {}

const CommandDialog = ({ children, ...props }: CommandDialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0 shadow-lg">
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
};

export const commandInputClassName = cn(
  "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
);

const CommandInput = (
  props: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
) => (
  <div className="flex items-center border-b px-3">
    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <CommandPrimitive.Input
      className={cn(commandInputClassName, props.className)}
      {...props}
    />
  </div>
);

const CommandList = (
  props: React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
) => (
  <CommandPrimitive.List
    className={cn(
      "max-h-[300px] overflow-y-auto overflow-x-hidden",
      props.className
    )}
    {...props}
  />
);

const CommandEmpty = (
  props: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
) => <CommandPrimitive.Empty className="py-6 text-center text-sm" {...props} />;

const CommandGroup = (
  props: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
) => (
  <CommandPrimitive.Group
    className={cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      props.className
    )}
    {...props}
  />
);

const CommandSeparator = (
  props: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
) => (
  <CommandPrimitive.Separator
    className={cn("-mx-1 h-px bg-border", props.className)}
    {...props}
  />
);

const CommandItem = (
  props: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
) => (
  <CommandPrimitive.Item
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
      props.className
    )}
    {...props}
  />
);

const CommandShortcut = (props: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={cn(
      "ml-auto text-xs tracking-widest text-muted-foreground",
      props.className
    )}
    {...props}
  />
);

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator
};

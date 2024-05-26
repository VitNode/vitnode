import { useTranslations } from "next-intl";
import { useState } from "react";
import * as localeDate from "date-fns/locale";
import { Check } from "lucide-react";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { cn } from "@/functions/classnames";

interface Props<T extends FieldValues, TName extends Path<T>> {
  field: ControllerRenderProps<T, TName>;
}

export function LocaleFieldCreateEditLangAdmin<
  T extends FieldValues,
  TName extends Path<T>
>({ field }: Props<T, TName>) {
  const t = useTranslations("admin.core.langs.actions");
  const tCore = useTranslations("core");
  const [open, setOpen] = useState(false);

  return (
    <FormItem>
      <FormLabel>{t("create.locale.label")}</FormLabel>

      <Popover open={open} onOpenChange={setOpen} modal>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              role="combobox"
              className={cn(
                "w-full justify-between",
                !field.value && "text-muted-foreground"
              )}
            >
              {field.value}
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Command>
            <CommandInput placeholder={tCore("search")} />

            <CommandList>
              <CommandEmpty>{tCore("no_results")}</CommandEmpty>
              <CommandGroup>
                {Object.keys(localeDate).map(item => (
                  <CommandItem
                    value={item}
                    key={item}
                    className="flex gap-2"
                    onSelect={value => {
                      field.onChange(value);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "size-4",
                        field.value === item ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <span>{item}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger
                      className={cn({
                        "text-muted-foreground": !field.value
                      })}
                    >
                      {field.value}
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    <Virtuoso
                      style={{ height: "200px" }}
                      data={Object.keys(localeDate)}
                      itemContent={(index, zone) => (
                        <SelectItem value={zone}>{zone}</SelectItem>
                      )}
                    />
                  </SelectContent>
                </Select> */}
      <FormMessage />
    </FormItem>
  );
}

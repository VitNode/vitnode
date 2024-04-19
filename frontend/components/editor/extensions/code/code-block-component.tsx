"use client";

import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import { useState } from "react";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { CheckIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import { cn } from "@/functions/classnames";

import { classNameCodeBlock } from "../../read-only/code-block";

export const CodeBlockComponent = ({
  extension,
  node: {
    attrs: { language: defaultLanguage }
  },
  updateAttributes
}: {
  extension: {
    options: {
      lowlight: {
        listLanguages: () => string[];
      };
    };
  };
  node: { attrs: { language: string } };
  updateAttributes: (attrs: { language: string }) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultLanguage);
  const t = useTranslations("core.editor.code_block");
  const tCore = useTranslations("core");

  return (
    <NodeViewWrapper className="relative">
      {/* <select
        contentEditable={false}
        defaultValue={defaultLanguage}
        onChange={event => updateAttributes({ language: event.target.value })}
      >
        <option value="null">auto</option>
        <option disabled>—</option>
        {extension.options.lowlight.listLanguages().map((lang, index) => (
          <option key={index} value={lang}>
            {lang}
          </option>
        ))}
      </select> */}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[10rem] justify-between absolute top-3 sm:right-3 sm:left-auto left-3"
          >
            {value ?? t("auto")}
            <CaretSortIcon className="ml-2 size-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[10rem] p-0">
          <Command>
            <CommandInput placeholder={tCore("search")} className="h-9" />

            <CommandList>
              <CommandEmpty>{tCore("no_results")}</CommandEmpty>
              <CommandGroup>
                {extension.options.lowlight.listLanguages().map(lang => (
                  <CommandItem
                    key={lang}
                    value={lang}
                    onSelect={currentValue => {
                      const val = currentValue === value ? "" : currentValue;
                      updateAttributes({ language: val });
                      setValue(val);
                      setOpen(false);
                    }}
                  >
                    {lang}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        value === lang ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <pre>
        <NodeViewContent
          as="code"
          className={cn(classNameCodeBlock, "sm:pr-[12rem] sm:pt-5 pt-[4rem]")}
          style={{ whiteSpace: "wrap" }}
        />
      </pre>
    </NodeViewWrapper>
  );
};

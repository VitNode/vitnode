import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { ComponentType } from "react";
import { useDebouncedCallback } from "use-debounce";

import { Input } from "@/components/ui/input";
import { cn } from "@/functions/classnames";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  commandInputClassName
} from "@/components/ui/command";
import { ListContentFilterToolbarDataTable } from "./list";
import { usePathname, useRouter } from "@/utils/i18n";
import { useFilterToolbarDataTable } from "../hooks/use-filter-toolbar-data-table";

export interface ContentFilterToolbarDataTableProps {
  options: {
    label: string;
    value: string;
    icon?: ComponentType<{ className?: string }>;
  }[];
  isFetching?: boolean;
  searchOnChange?: (value: string) => void;
}

export const ContentFilterToolbarDataTable = ({
  searchOnChange,
  ...props
}: ContentFilterToolbarDataTableProps) => {
  const t = useTranslations("core");
  const { id, title } = useFilterToolbarDataTable();
  const searchParams = useSearchParams();
  const selectedValues = searchParams.getAll(id);
  const { push } = useRouter();
  const pathname = usePathname();

  const handleSearchInput = useDebouncedCallback((value: string) => {
    if (!searchOnChange) return;

    searchOnChange(value);
  }, 500);

  return (
    <Command>
      {searchOnChange ? (
        <div className="flex items-center border-b px-3">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <Input
            onChange={e => handleSearchInput(e.target.value)}
            className={cn(
              commandInputClassName,
              "border-0 px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            )}
            placeholder={title}
          />
        </div>
      ) : (
        <CommandInput placeholder={title} />
      )}

      <CommandList>
        {!searchOnChange && <CommandEmpty>{t("no_results")}</CommandEmpty>}

        <CommandGroup>
          <ListContentFilterToolbarDataTable {...props} />
        </CommandGroup>

        {selectedValues.length > 0 && (
          <>
            <CommandSeparator />
            <CommandGroup>
              <CommandItem
                onSelect={() => push(pathname, { scroll: false })}
                className="justify-center text-center"
              >
                {t("clear")}
              </CommandItem>
            </CommandGroup>
          </>
        )}
      </CommandList>
    </Command>
  );
};

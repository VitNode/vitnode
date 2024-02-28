import { Search } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";
import { useTranslations } from "next-intl";

import {
  Command,
  CommandList,
  commandInputClassName
} from "@/components/ui/command";
import { useSearchForums } from "./hooks/use-search-forums";
import { Input } from "@/components/ui/input";
import { cn } from "@/functions/classnames";
import { Loader } from "@/components/loader";
import { ListContentForumsSelect } from "./list";
import type { ForumSelectItem } from "./forums-select";

export interface ContentForumsSelectProps {
  onSelect: (value: ForumSelectItem) => void;
  values: ForumSelectItem[];
}

export const ContentForumsSelect = (props: ContentForumsSelectProps) => {
  const t = useTranslations("forum.select");
  const { data, isLoading, setSearch } = useSearchForums();

  const handleSearchInput = useDebouncedCallback((value: string) => {
    setSearch(value);
  }, 500);

  return (
    <Command>
      <div className="flex items-center border-b px-3">
        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
        <Input
          className={cn(
            "border-0 px-0 focus-visible:ring-0 focus-visible:ring-offset-0",
            commandInputClassName
          )}
          onChange={e => handleSearchInput(e.target.value)}
          placeholder={t("search")}
        />
      </div>

      <CommandList>
        {isLoading ? (
          <Loader className="p-2" />
        ) : (
          <ListContentForumsSelect edges={data} {...props} />
        )}
      </CommandList>
    </Command>
  );
};

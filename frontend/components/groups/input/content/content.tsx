import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";

import { cn } from "@/functions/classnames";
import { Loader } from "@/components/loader";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandList,
  commandInputClassName
} from "@/components/ui/command";
import { GroupInputItem } from "../group-input";
import { GroupInputContentList } from "./list";
import { queryApi } from "./query-api";

interface Props {
  onSelect: (value: GroupInputItem) => void;
  values: GroupInputItem[];
}

export const GroupInputContent = ({ onSelect, values }: Props) => {
  const t = useTranslations("core");
  const [search, setSearch] = React.useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["Admin__Core_Groups__Show_Short", { search }],
    queryFn: async () => queryApi({ first: 10, search })
  });

  const handleSearchInput = useDebouncedCallback((value: string) => {
    setSearch(value);
  }, 500);

  return (
    <Command>
      <div className="flex items-center border-b px-3">
        <Search className="mr-2 size-4 shrink-0 opacity-50" />
        <Input
          className={cn(
            "border-0 px-0 focus-visible:ring-0 focus-visible:ring-offset-0",
            commandInputClassName
          )}
          onChange={e => handleSearchInput(e.target.value)}
          placeholder={t("group_input.search")}
        />
      </div>

      <CommandList>
        {isLoading ? (
          <Loader className="p-2" />
        ) : (
          <GroupInputContentList
            edges={data?.admin__core_groups__show.edges ?? []}
            onSelect={onSelect}
            values={values}
          />
        )}
      </CommandList>
    </Command>
  );
};

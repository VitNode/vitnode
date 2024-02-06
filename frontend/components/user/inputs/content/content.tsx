import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { cn } from "@/functions/classnames";
import { fetcher } from "@/graphql/fetcher";
import {
  Core_Members__Show__Search,
  type Core_Members__Show__SearchQuery,
  type Core_Members__Show__SearchQueryVariables
} from "@/graphql/hooks";
import { UserInputContentList } from "./list";
import type { UserInputItem } from "../user-input";
import { Loader } from "@/components/loader/loader";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandList,
  commandInputClassName
} from "@/components/ui/command";

interface Props {
  onSelect: (value: UserInputItem) => void;
  values: UserInputItem[];
}

export const UserInputContent = ({ onSelect, values }: Props) => {
  const t = useTranslations("core");
  const [search, setSearch] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["Core_Members__Show__Search", { search }],
    queryFn: async () => {
      const { data } = await fetcher<
        Core_Members__Show__SearchQuery,
        Core_Members__Show__SearchQueryVariables
      >({
        query: Core_Members__Show__Search,
        variables: {
          first: 10,
          search
        }
      });

      return data;
    }
  });

  return (
    <Command>
      <div className="flex items-center border-b px-3">
        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
        <Input
          className={cn(
            "border-0 px-0 focus-visible:ring-0 focus-visible:ring-offset-0",
            commandInputClassName
          )}
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder={t("user_input.search")}
        />
      </div>

      <CommandList>
        {isLoading ? (
          <Loader className="p-2" />
        ) : (
          <UserInputContentList
            edges={data?.core_members__show.edges ?? []}
            onSelect={onSelect}
            values={values}
          />
        )}
      </CommandList>
    </Command>
  );
};

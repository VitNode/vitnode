import { useTranslations } from "next-intl";
import { CheckIcon } from "lucide-react";

import type { ShowAdminGroups } from "@/graphql/hooks";
import { cn } from "@/functions/classnames";
import { CommandGroup, CommandItem } from "@/components/ui/command";
import type { GroupInputItem } from "../group-input";

import { GroupFormat } from "../../../groups/group-format";

interface Props {
  edges: Pick<ShowAdminGroups, "id" | "name" | "guest">[];
  onSelect: (value: GroupInputItem) => void;
  values: GroupInputItem[];
  multiple?: boolean;
}

export const GroupInputContentList = ({ edges, onSelect, values }: Props) => {
  const t = useTranslations("core");

  if (edges.length === 0) {
    return <div className="py-6 text-center text-sm">{t("no_results")}</div>;
  }

  return (
    <CommandGroup>
      {edges
        .filter(item => !item.guest)
        .map(item => (
          <CommandItem
            className="gap-2"
            key={item.id}
            onSelect={() =>
              onSelect({
                id: item.id,
                name: item.name
              })
            }
          >
            <div
              className={cn(
                "mr-2 flex size-4 items-center justify-center rounded-sm border border-primary",
                values.find(value => item.id === value.id)
                  ? "bg-primary text-primary-foreground"
                  : "opacity-50 [&_svg]:invisible"
              )}
            >
              <CheckIcon />
            </div>
            <GroupFormat group={item} />
          </CommandItem>
        ))}
    </CommandGroup>
  );
};

import { useTranslations } from "next-intl";
import { CheckIcon } from "lucide-react";
import { cn } from "@vitnode/frontend/helpers";

import { ShowAdminGroups } from "@/graphql/hooks";
import { CommandGroup, CommandItem } from "@/components/ui/command";
import { GroupInputItem } from "../group-input";

import { GroupFormat } from "../../../groups/group-format";

interface Props {
  edges: Pick<ShowAdminGroups, "guest" | "id" | "name">[];
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
                "border-primary mr-2 flex size-4 items-center justify-center rounded-sm border",
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

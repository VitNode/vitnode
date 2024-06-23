import { useTranslations } from "next-intl";
import { CheckIcon } from "lucide-react";
import { cn } from "vitnode-frontend/helpers";

import { ShowCoreMembers } from "@/graphql/hooks";
import { UserInputItem } from "../user-input";
import { CommandGroup, CommandItem } from "@/components/ui/command";

import { AvatarUser } from "../../avatar/avatar-user";
import { GroupFormat } from "../../../groups/group-format";

interface Props {
  edges: Pick<
    ShowCoreMembers,
    "avatar_color" | "avatar" | "group" | "id" | "name_seo" | "name"
  >[];
  onSelect: (value: UserInputItem) => void;
  values: UserInputItem[];
}

export const UserInputContentList = ({ edges, onSelect, values }: Props) => {
  const t = useTranslations("core");

  if (edges.length === 0) {
    return <div className="py-6 text-center text-sm">{t("no_results")}</div>;
  }

  return (
    <CommandGroup>
      {edges.map(item => (
        <CommandItem
          className="gap-2"
          key={item.id}
          onSelect={() =>
            onSelect({
              id: item.id,
              name: item.name,
            })
          }
        >
          <div
            className={cn(
              "border-primary mr-2 flex size-4 items-center justify-center rounded-sm border",
              values.find(value => item.id === value.id)
                ? "bg-primary text-primary-foreground"
                : "opacity-50 [&_svg]:invisible",
            )}
          >
            <CheckIcon />
          </div>
          <AvatarUser sizeInRem={1.75} user={item} />
          <div className="flex flex-col">
            <span>{item.name}</span>
            <GroupFormat className="text-xs" group={item.group} />
          </div>
        </CommandItem>
      ))}
    </CommandGroup>
  );
};

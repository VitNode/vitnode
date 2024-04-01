import { CheckIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import type { ShowForumForumsAdmin } from "@/graphql/hooks";
import type { ContentForumsSelectProps } from "./content";
import { CommandGroup, CommandItem } from "@/components/ui/command";
import { cn } from "@/functions/classnames";
import { useTextLang } from "@/hooks/core/use-text-lang";

interface Props extends ContentForumsSelectProps {
  edges: Pick<ShowForumForumsAdmin, "id" | "name">[];
}

export const ListContentForumsSelect = ({ edges, onSelect, values }: Props) => {
  const { convertText } = useTextLang();
  const t = useTranslations("core");

  if (edges.length === 0) {
    return <div className="py-6 text-center text-sm">{t("no_results")}</div>;
  }

  return (
    <CommandGroup>
      {edges.map((item) => (
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
              values.find((value) => item.id === value.id)
                ? "bg-primary text-primary-foreground"
                : "opacity-50 [&_svg]:invisible"
            )}
          >
            <CheckIcon />
          </div>
          <span>{convertText(item.name)}</span>
        </CommandItem>
      ))}
    </CommandGroup>
  );
};

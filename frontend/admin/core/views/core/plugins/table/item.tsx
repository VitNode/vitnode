import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";

import type { ShowAdminPlugins } from "@/graphql/hooks";
import { cn } from "@/functions/classnames";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ActionsItemPluginsAdmin } from "./actions/actions";

interface Props {
  data: ShowAdminPlugins;
}

export const ItemContentTablePluginsAdmin = ({ data }: Props) => {
  const t = useTranslations("core");
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({
    id: data.id,
    animateLayoutChanges: ({ isSorting, wasDragging }) =>
      isSorting || wasDragging ? false : true
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Translate.toString(transform),
        transition
      }}
      className={cn(
        "p-4 flex gap-4 bg-card items-center transition-[background-color,opacity] relative border",
        {
          "opacity-50": isDragging
        }
      )}
    >
      <Button
        className="sm:flex hidden flex-shrink-0 focus:outline-none text-muted-foreground hover:text-foreground cursor-grab"
        variant="ghost"
        size="icon"
        tooltip=""
        {...attributes}
        {...listeners}
      >
        <Menu />
      </Button>

      <div className="flex flex-col flex-1">
        <div className="flex gap-2 items-center">
          <span className="font-semibold">{data.name}</span>
          {data.version && (
            <span className="text-muted-foreground text-sm">
              {data.version}
            </span>
          )}
          {data.default && <Badge variant="outline">{t("default")}</Badge>}
        </div>
        {data.description && (
          <span className="text-muted-foreground text-sm line-clamp-2">
            {data.description}
          </span>
        )}
        <span className="text-muted-foreground text-sm">
          <a href={data.author_url} rel="noopener noreferrer" target="_blank">
            {data.author}
          </a>
        </span>
      </div>

      <ActionsItemPluginsAdmin {...data} />
    </div>
  );
};

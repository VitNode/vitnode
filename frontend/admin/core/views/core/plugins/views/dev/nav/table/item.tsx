import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";

import { Icon } from "@/components/icon/icon";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { cn } from "@/functions/classnames";
import type { ShowAdminNavPluginsObj } from "@/graphql/hooks";
import type { FlatTree } from "@/hooks/core/drag&drop/use-functions";
import { ActionsTableNavDevPluginAdmin } from "./actions/actions";

interface Props extends FlatTree<ShowAdminNavPluginsObj> {
  active?: boolean;
  isDropHere?: boolean;
}

export const ItemContentTableNavDevPluginAdmin = ({
  active,
  code,
  icon,
  id,
  isDropHere,
  ...props
}: Props) => {
  const tCore = useTranslations("core");
  const {
    attributes,
    isDragging,
    listeners,
    setDraggableNodeRef,
    setDroppableNodeRef,
    transform,
    transition
  } = useSortable({
    id,
    animateLayoutChanges: ({ isSorting, wasDragging }) =>
      isSorting || wasDragging ? false : true
  });

  return (
    <div ref={setDroppableNodeRef}>
      <div
        className={cn(
          "p-4 flex gap-2 bg-card items-center transition-[background-color,opacity] relative border flex-wrap",
          {
            "animate-pulse bg-primary/20": isDropHere,
            "z-10": isDragging,
            "opacity-50": active
          }
        )}
        style={{
          transform: CSS.Transform.toString(transform),
          transition
        }}
        ref={setDraggableNodeRef}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="sm:flex hidden flex-shrink-0 focus:outline-none text-muted-foreground hover:text-foreground cursor-grab"
                variant="ghost"
                size="icon"
                ariaLabel=""
                {...attributes}
                {...listeners}
              >
                {icon ? <Icon className="text-2xl" name={icon} /> : <Menu />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>{tCore("drag_to_change_position")}</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="flex flex-col flex-1">
          <span className="font-semibold">{code}</span>
        </div>

        <ActionsTableNavDevPluginAdmin
          id={id}
          code={code}
          icon={icon}
          {...props}
        />
      </div>
    </div>
  );
};

import { ChevronRight, Menu } from "lucide-react";
import type { CSSProperties } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { UniqueIdentifier } from "@dnd-kit/core";

import { Button } from "@/components/ui/button";
import { useTextLang } from "@/hooks/core/use-text-lang";
import { cn } from "@/functions/classnames";
import { useChildrenForumForumsAdminAPI } from "./hooks/use-children-forum-forums-admin-api";
import type { Admin__Forum_Forums__ShowFlattenedItem } from "../types";

interface Props extends Admin__Forum_Forums__ShowFlattenedItem {
  indentationWidth: number;
  isOpenChildren: boolean;
  isDropHere?: boolean;
  onCollapse?: (id: UniqueIdentifier) => void;
}

export const ItemTableForumsForumAdmin = ({
  children,
  depth,
  id,
  indentationWidth,
  isDropHere = false,
  isOpenChildren,
  name,
  onCollapse
}: Props) => {
  const { convertText } = useTextLang();
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
  const childrenCount = children?.length ?? 0;
  const allowOpenChildren = childrenCount > 0;

  useChildrenForumForumsAdminAPI({
    parentId: id,
    enabled: allowOpenChildren && isOpenChildren
  });

  return (
    <div
      ref={setDroppableNodeRef}
      className="pl-[var(--spacing)]"
      style={
        {
          "--spacing": `${indentationWidth * depth}px`
        } as CSSProperties
      }
      onClick={() => {
        if (allowOpenChildren) onCollapse?.(id);
      }}
      role={allowOpenChildren ? "button" : undefined}
      tabIndex={allowOpenChildren ? 0 : -1}
      onKeyDown={e => {
        if (e.key === "Enter" && allowOpenChildren) onCollapse?.(id);
      }}
    >
      <div
        className={cn(
          "p-4 flex gap-4 bg-card items-center transition-[background-color,opacity] relative border",
          {
            "animate-pulse bg-primary/20": isDropHere,
            "z-10": isDragging
          }
        )}
        style={{
          transform: CSS.Transform.toString(transform),
          transition
        }}
        ref={setDraggableNodeRef}
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

        {childrenCount > 0 && (
          <ChevronRight
            className={cn("transition-transform text-muted-foreground", {
              "rotate-90": isOpenChildren
            })}
          />
        )}

        <div className="flex-grow flex flex-col">
          <span>{convertText(name)}</span>
        </div>
      </div>
    </div>
  );
};

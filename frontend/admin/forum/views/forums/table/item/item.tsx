import { ChevronRight, Menu } from "lucide-react";
import type { CSSProperties } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { UniqueIdentifier } from "@dnd-kit/core";

import { Button } from "@/components/ui/button";
import { useTextLang } from "@/hooks/core/use-text-lang";
import { cn } from "@/functions/classnames";
import { useChildrenForumForumsAdminAPI } from "./hooks/use-children-forum-forums-admin-api";
import { ActionsForumAdmin } from "./actions/actions";
import type { ShowForumForumsAdminWithChildren } from "../hooks/use-forum-forums-admin-api";
import type { FlatTree } from "../use-functions";

interface Props extends FlatTree<ShowForumForumsAdminWithChildren> {
  indentationWidth: number;
  isOpenChildren: boolean;
  active?: boolean;
  isDropHere?: boolean;
  onCollapse?: (id: UniqueIdentifier) => void;
}

export const ItemTableForumsForumAdmin = ({
  active,
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
    >
      <div
        className={cn(
          "p-4 flex gap-2 bg-card items-center transition-[background-color,opacity] relative border",
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
          <Button
            onClick={() => {
              if (allowOpenChildren) onCollapse?.(id);
            }}
            variant="ghost"
            size="icon"
            tooltip=""
          >
            <ChevronRight
              className={cn("transition-transform text-muted-foreground", {
                "rotate-90": isOpenChildren
              })}
            />
          </Button>
        )}

        <div className="flex-grow flex flex-col">
          <span>
            {convertText(name)} - {id}
          </span>
        </div>

        <ActionsForumAdmin />
      </div>
    </div>
  );
};

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Menu } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/functions/classnames";
import { Button } from "@/components/ui/button";

interface Props {
  active: boolean;
  children: ReactNode;
  id: number;
  isDropHere: boolean;
  depth?: number;
  indentationWidth?: number;
  overlay?: boolean;
}

export const ItemDragAndDrop = ({
  active,
  children,
  depth = 0,
  id,
  indentationWidth = 0,
  isDropHere,
  overlay
}: Props) => {
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
      !(isSorting || wasDragging)
  });

  return (
    <div
      ref={setDroppableNodeRef}
      className={cn({
        "pl-[var(--spacing)]": !overlay
      })}
      style={
        {
          "--spacing": `${indentationWidth * depth}px`
        } as CSSProperties
      }
    >
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
        <Button
          className="sm:flex hidden flex-shrink-0 focus:outline-none text-muted-foreground hover:text-foreground cursor-grab"
          variant="ghost"
          size="icon"
          ariaLabel=""
          {...attributes}
          {...listeners}
        >
          <Menu />
        </Button>

        {children}
      </div>
    </div>
  );
};

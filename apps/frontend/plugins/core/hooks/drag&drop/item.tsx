import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ChevronRight, Grip } from "lucide-react";
import * as React from "react";
import { cn } from "@vitnode/frontend/helpers";

import { Button } from "@/components/ui/button";

interface Props {
  active: boolean;
  children: React.ReactNode;
  id: number | string;
  isDropHere: boolean;
  onCollapse: () => void;
  childrenLength?: number;
  depth?: number;
  draggableButtonClassName?: string;
  draggableChildren?: React.ReactNode;
  draggableStyle?: React.CSSProperties;
  indentationWidth?: number;
  isOpenChildren?: boolean;
}

export const ItemDragAndDrop = ({
  active,
  children,
  childrenLength,
  depth = 0,
  draggableButtonClassName,
  draggableChildren,
  draggableStyle,
  id,
  indentationWidth = 0,
  isDropHere,
  isOpenChildren,
  onCollapse,
}: Props) => {
  const {
    attributes,
    isDragging,
    listeners,
    setDraggableNodeRef,
    setDroppableNodeRef,
    transform,
    transition,
  } = useSortable({
    id,
    animateLayoutChanges: ({ isSorting, wasDragging }) =>
      !(isSorting || wasDragging),
  });

  const allowOpenChildren = !!(childrenLength && onCollapse);

  return (
    <div
      ref={setDroppableNodeRef}
      className="border-t-0 pl-[var(--spacing)]"
      style={
        {
          "--spacing": `${indentationWidth * depth}px`,
        } as React.CSSProperties
      }
    >
      <div
        className={cn(
          "bg-card relative flex flex-wrap items-center gap-2 border p-4 transition-[background-color,opacity] sm:gap-4",
          {
            "bg-primary/20 animate-pulse": isDropHere,
            "z-10": isDragging,
            "opacity-50": active,
          },
        )}
        style={{
          transform: CSS.Transform.toString(transform),
          transition,
        }}
        ref={setDraggableNodeRef}
      >
        <div className="flex shrink-0 gap-2">
          <Button
            className={cn(
              "hover:text-foreground bg-primary/20 text-primary hidden flex-shrink-0 cursor-grab focus:outline-none sm:flex",
              draggableButtonClassName,
            )}
            style={draggableStyle}
            variant="ghost"
            size="icon"
            ariaLabel=""
            {...attributes}
            {...listeners}
          >
            {draggableChildren ? draggableChildren : <Grip />}
          </Button>

          {allowOpenChildren && (
            <Button
              onClick={onCollapse}
              variant="ghost"
              size="icon"
              ariaLabel=""
            >
              <ChevronRight
                className={cn("text-muted-foreground transition-transform", {
                  "rotate-90": isOpenChildren,
                })}
              />
            </Button>
          )}
        </div>

        {children}
      </div>
    </div>
  );
};

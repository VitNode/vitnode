import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ChevronRight, Grip } from "lucide-react";
import * as React from "react";

import { cn } from "@/functions/classnames";
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
  onCollapse
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

  const allowOpenChildren = !!(childrenLength && onCollapse);

  return (
    <div
      ref={setDroppableNodeRef}
      className="pl-[var(--spacing)] [&:not(:first-child)>div]:border-t-0"
      style={
        {
          "--spacing": `${indentationWidth * depth}px`
        } as React.CSSProperties
      }
    >
      <div
        className={cn(
          "p-4 flex sm:gap-4 gap-2 bg-card items-center transition-[background-color,opacity] relative flex-wrap border",
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
        <div className="flex flex-shrink-0 gap-2">
          <Button
            className={cn(
              "sm:flex hidden flex-shrink-0 focus:outline-none hover:text-foreground cursor-grab bg-primary/20 text-primary",
              draggableButtonClassName
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
                className={cn("transition-transform text-muted-foreground", {
                  "rotate-90": isOpenChildren
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
